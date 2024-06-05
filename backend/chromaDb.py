import os
import gc
import fitz  
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.docstore.document import Document

# Chemin vers votre fichier PDF
pdf_path = "/assets/DataFst.pdf"

# Dossier pour stocker les embeddings (ChromaDB)
output_folder = "chroma_db_single_pdf_final12"
os.makedirs(output_folder, exist_ok=True)

# Fonction pour extraire et diviser le texte d'un fichier PDF en morceaux
def split_pdf_into_fixed_chunks(pdf_path, num_chunks_per_page=45):
    document = fitz.open(pdf_path)
    chunks = []
    for page_num in range(len(document)):
        page = document.load_page(page_num)
        text = page.get_text()
        chunk_size = max(1, len(text) // num_chunks_per_page)  # Calculer la taille de chaque chunk
        # Diviser le texte de la page en morceaux de taille chunk_size
        for i in range(num_chunks_per_page):
            start_idx = i * chunk_size
            end_idx = start_idx + chunk_size
            chunk = text[start_idx:end_idx]
            chunks.append((page_num, i, chunk))
    return chunks

# Diviser le PDF en morceaux
chunks = split_pdf_into_fixed_chunks(pdf_path, num_chunks_per_page=45)

# Créer des documents à partir des morceaux
all_docs = []
for page_num, chunk_num, chunk_text in chunks:
    doc = Document(page_content=chunk_text, metadata={"source": pdf_path, "page": page_num, "chunk": chunk_num})
    all_docs.append(doc)

# Clear large variables and force garbage collection
gc.collect()

# Initialiser la fonction d'incorporation
embedding_function = SentenceTransformerEmbeddings(model_name="multi-qa-mpnet-base-dot-v1")

# Nom de la collection
collection_name = "text_embeddings"

# Créer la base de données Chroma à partir des documents divisés avec le nom de la collection
db = Chroma.from_documents(all_docs, embedding_function, persist_directory=output_folder, collection_name=collection_name)

# Vérification de la création de la base de données
print("Embeddings have been successfully stored in ChromaDB.")

# Afficher le nombre total de documents créés
print(f"Total number of documents created: {len(all_docs)}")
