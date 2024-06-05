from typing import List
from fastapi import HTTPException, status, APIRouter
from fastapi.responses import JSONResponse
from db import SessionLocal
from models import Question, QuestionRequest, Topic, User, UserLogin, UserLoginResponse, UserRegister, UserRegisterResponse,TopicCreate,UserModel,TextGenerationResponse,TextGenerationRequest
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from llm_model import model, tokenizer
from RAG import AIAgent, RAGSystem

router = APIRouter()

def get_user(username: str):
    db = SessionLocal()
    user = db.query(User).filter(User.username == username).first()
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail=f"user with this username {username} is not found!")

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

@router.post("/api/v1/generate",response_model=TextGenerationResponse)
async def generate_text(request: TextGenerationRequest):
    prompt_template = f"""
    You are an AI Agent specialized to answer questions about FSTT (faculty of science and technology in Tanger).
    Explain the concept or answer the question about FSTT.
    In order to create the answer, please only use the information from the Reponse and Contexte.
    Answer with simple words.
    If needed, include also explanations.
    It's important to answer in French.
    Question: {request.prompt}
    Answer:
    """
    inputs = tokenizer.encode(prompt_template, return_tensors="pt",padding=True)
    
    outputs = model.generate(inputs, max_length=500, num_return_sequences=1,pad_token_id=tokenizer.eos_token_id)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"generated_text": generated_text}

ai_agent = AIAgent()

rag_system = RAGSystem(ai_agent=ai_agent, collection=collection, num_retrieved_docs=150)

@router.post("/api/v1/auth/generate_rag", response_model=TextGenerationResponse)
async def query(request: TextGenerationRequest):
    response = rag_system.query(request.prompt)
    return TextGenerationResponse(generated_text=response)

#################################################################   
@router.get("/api/v1/auth/{username}",response_model=UserModel)  
def get_username(username:str):
    db=SessionLocal()
    try:
        user=get_user(username)
        return UserModel(username=user.username,email=user.email)
    finally:
        db.close()

@router.post("/api/v1/auth/register", response_model=UserRegisterResponse)
def create_user(user: UserRegister):
    db = SessionLocal()
    try:
        existing_user = db.query(User).filter(User.username == user.username).first()
        if existing_user:
            raise HTTPException(status_code=403, detail=f"this username {user.username} is already existing ! ")
        if user.password ==  user.confirmation:
            db_user = User(username=user.username, email=user.email, password=user.password)
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return UserRegisterResponse(username=db_user.username,email=db_user.email)
        else:
            raise HTTPException(status_code=403, detail="Passwords Dont match !")
    finally:
        db.close()

@router.post("/api/v1/auth/login", response_model=UserLoginResponse)
def login_user(user: UserLogin):
    db = SessionLocal()
    try:
        user_exists = db.query(User).filter(User.email == user.email, User.password == user.password).first()
        if not user_exists:
            raise HTTPException(status_code=400, detail=" Bad credentials !!! ")        
        return UserLoginResponse(username=user_exists.username, email=user_exists.email, token="jwttoken to generate soon")
    finally:
        db.close()

@router.post("/api/v1/app/create-topic/{username}")
def create_topic(username: str, topic: TopicCreate):
    db = SessionLocal()
    try:
        user_check = get_user(username)
        db_topic = Topic(name=topic.name,user=user_check.username)
        db.add(db_topic)
        db.commit()
        db.refresh(db_topic)
        return db_topic
    finally:
        db.close()

@router.delete("/api/v1/app/delete-topic/{username}/{topic}")
def delete_topic(username: str, topic: str):
    db = SessionLocal()
    try:
        user = get_user(username)
        topic_check = db.query(Topic).filter(Topic.name == topic, Topic.user == username).first()
        if not topic_check:
            raise HTTPException(status_code=404, detail="neither topic nor username can be found!")
        db.delete(topic_check)
        db.commit()
        db.refresh(topic_check)
        return f"{topic} has been removed!"
    finally:
        db.close()

@router.patch("/api/v1/app/edit-topic/{username}/{topic}")
def edit_topic(username: str, topic: str, new_topic: TopicCreate):
    db = SessionLocal()
    try:
        user = get_user(username)
        topic_check = db.query(Topic).filter(Topic.name == topic, Topic.user == username).first()
        if not topic_check:
            raise HTTPException(status_code=404, detail="neither topic nor username can be found!")
        topic_check.name = new_topic.name        
        db.commit()
        db.refresh(topic_check)
        return "topic name has been changed successfully !"
    finally:
        db.close()

@router.get("/api/v1/app/get-all-topic/{username}")
def get_all_topics(username: str):
    db = SessionLocal()
    try:
        topics = db.query(Topic).filter(Topic.user == username).all()
        if not topics:
            raise HTTPException(status_code=404, detail="topics not found!")
        topic_dict = {}
        for topic in topics:
            date_str = topic.created.date().isoformat()
            if date_str not in topic_dict:
                topic_dict[date_str] = []
            topic_dict[date_str].append({
                "name": topic.name,
            })
        return JSONResponse(content=topic_dict, media_type="application/json")
    finally:
        db.close()

@router.post("/api/v1/app/ask/{username}/{topic}")
def post_question(username: str,topic: str,question: QuestionRequest):
    db = SessionLocal()
    try:
        topic_check = db.query(Topic).filter(Topic.user == username,Topic.name == topic).first()
        if not topic_check:
            raise HTTPException(status_code=404, detail="neither topic nor username can be found !")
        # let the answer be a random string for now untill we have the model ^^
        prompt_res = " a random response "
        question_post = Question(question=question.content,topic=topic_check.name,user=topic_check.user,answer=prompt_res)
        db.add(question_post)
        db.commit()
        db.refresh(question_post)
        return "question posted !"
    finally:
        db.close()
    
@router.get("/api/v1/app/get-all-questions/{username}/{topic}")
def get_all_topics(username: str,topic: str):
    db = SessionLocal()
    try:
        messages = db.query(Question).filter(Question.user == username,Question.topic==topic).all()
        if not messages:
            raise HTTPException(status_code=404, detail="neither username nor topic can be found !")
        result = {}
        for idx, question in enumerate(messages, start=1):
            result[f"prompt number {idx}"] = {
                "question": question.question,
                "response": question.answer
            }
        return result
    finally:
        db.close()





    

