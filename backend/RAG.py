import os
import gc
import chromadb
from transformers import AutoTokenizer, AutoModelForCausalLM
from IPython.display import display, Markdown
import chromadb.utils.embedding_functions as embedding_functions
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.docstore.document import Document
from langchain.document_loaders import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import pandas as pd


os.environ['HUGGINGFACE_HUB_TOKEN'] = "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"


class AIAgent:
    """
    Gemma 2b-it assistant.
    It uses Gemma transformers 2b-it/2.
    """
    def __init__(self, model_name="google/gemma-2b-it", max_length=1000):
        self.max_length = max_length
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(model_name, token="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")
            self.gemma_llm = AutoModelForCausalLM.from_pretrained(model_name, token="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")
        except Exception as e:
            raise ValueError(f"Error loading model: {e}")

    # Do not include other information.
    def create_prompt(self, query, context):
        # Prompt template
        prompt = f"""
        Vous êtes un agent AI spécialisé pour répondre aux questions sur la FSTT (Faculté des Sciences et Techniques de Tanger).
        Expliquez le concept ou répondez à la question concernant la FSTT.
        Pour créer la réponse, veuillez utiliser uniquement les informations fournies dans le contexte (Context). 
        Répondez avec des mots simples.
        Si nécessaire, incluez également des explications.
        Il est important de répondre en français.
        Question: {query}
        Context: {context}
        Réponse:
        """
        return prompt

    def generate(self, query, retrieved_info):
        prompt = self.create_prompt(query, retrieved_info)
        input_ids = self.tokenizer(prompt, return_tensors="pt").input_ids
        
        # Answer generation
        answer_ids = self.gemma_llm.generate(input_ids, max_new_tokens=self.max_length)
        
        # Decode and return the answer
        answer = self.tokenizer.decode(answer_ids[0], skip_special_tokens=True)
        # Extract only the answer after "Réponse:"
        answer = answer.split("Réponse:")[1].strip()
        return prompt, answer


class RAGSystem:
    def __init__(self, ai_agent, collection, num_retrieved_docs=150):
        self.num_docs = num_retrieved_docs
        self.collection = collection
        self.ai_agent = ai_agent
        self.template = "\n\nAnswer:\n{answer}"
    
    def retrieve(self, query):
        # Retrieve top k similar documents to query
        results = self.collection.query(query_texts=[query], n_results=self.num_docs)
        docs = [result for result in results['documents']]
        return docs
    
    def query(self, query):
        # Generate the answer
        context_docs = self.retrieve(query)
        context_docs = context_docs[0]
        context = " | ".join(context_docs[:self.num_docs])
        
        # Add more context to the prompt
        prompt = f"""
        Vous êtes un agent AI spécialisé pour répondre aux questions sur la FSTT (Faculté des Sciences et Techniques de Tanger).
        Expliquez le concept ou répondez à la question concernant la FSTT.
        Pour créer la réponse, veuillez utiliser uniquement les informations fournies dans le contexte (Context). 
        Répondez avec des mots simples.
        Si nécessaire, incluez également des explications.
        Il est important de répondre en français.
        Question: {query}
        Context: {context}
        Réponse:
        """
        
        prompt, answer = self.ai_agent.generate(query, context)
        
        return self.template.format(answer=answer)


def colorize_text(text):
    for word, color in zip(["Answer"], ["blue"]):
        text = text.replace(f"\n\n{word}:", f"\n\n*<font color='{color}'>{word}:</font>*")
    return text


huggingface_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="multi-qa-mpnet-base-dot-v1"
)

# Configure the ChromaDB client with persistence
persist_directory = "C:\\Users\\LOUBNA\\Desktop\\project_llm\\backend\\chroma_db_single_pdf_final123"
client = chromadb.PersistentClient(path=persist_directory)
collection = client.get_collection(name="text_embeddings", embedding_function=huggingface_ef)

# Initialize the AI Agent
ai_agent = AIAgent()


