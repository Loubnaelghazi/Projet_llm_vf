import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", 
});

export const login = async (credentials)=>{
    return api.post("/api/v1/auth/login",credentials);
}

export const getUserData=(username)=>{
    return api.get(`/api/v1/auth/${username}`)
}
