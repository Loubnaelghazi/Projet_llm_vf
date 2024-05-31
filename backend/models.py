import datetime
from pydantic import BaseModel
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    password = Column(String(50))


class Topic(Base):
    __tablename__="topics"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True)
    user = Column(String(50), ForeignKey("users.username"))
    created = Column(DateTime, default=datetime.datetime.now)
    
class Question(Base):
    __tablename__="questions"
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String(50),index=True)
    topic = Column(String(50), ForeignKey("topics.name"))
    user = Column(String(50), ForeignKey("topics.user"))
    answer = Column(String(100))
    created = Column(DateTime, default=datetime.datetime.now)

class UserRegister(BaseModel):
    username: str
    password: str
    confirmation: str
    email: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserLoginResponse(BaseModel):
    username: str
    email: str
    token: str

    
class UserRegisterResponse(BaseModel):
    username: str
    email: str

class TopicCreate(BaseModel):
    name: str

class QuestionRequest(BaseModel):
    content: str

class UserModel(BaseModel):
    username:str
    email:str
    