import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", 
});

export const login = async (credentials)=>{
    return api.post("/api/v1/auth/login",credentials);
}

export const getUserData= async (username)=>{
    return api.get(`/api/v1/auth/${username}`)
}

export const register = async (credentials) => {
  return api.post("/api/v1/auth/register", credentials);
};

export const chatResponse= async (response)=>{
  return api.post("/api/v1/generate",response)
};

