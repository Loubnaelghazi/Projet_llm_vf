import React, { useState } from 'react'
import { useRef  } from 'react';
import { login } from '../api/api';


export default function Login() {

const [isError,setIsError]=useState(false)
const [error,setError]=useState(null); 
const email_ref=useRef();
const password_ref=useRef(); 

async function handleLogin(e){
e.preventDefault()  
const email_value= email_ref.current.value 
const password_value= password_ref.current.value
const login_credentials={
  email :email_value,
  password: password_value 
}



try {
    await login(login_credentials)
    setIsError(false)

} catch (error) {
  console.log(error.response.data.detail)
  setIsError(true)
  setError(error.response.data.detail)
}
}




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-transparent via-sky-900 to-transparent">
      <div className="w-full max-w-sm p-8 space-y-6 bg-base-100 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
        <h1 className="text-3xl font-bold text-center text-primary">Login</h1>
        <p className=" text-sm font-medium ">
          Welcome back, enter your credentials to continue.
        </p>
        <form className="space-y-2" onSubmit={(e) => handleLogin(e)}>
          <div className="form-control">
            <input
              type="email"
              name="email"
              ref={email_ref}
              placeholder="Enter your Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              name="password"
              ref={password_ref}
              placeholder=" Enter your Password"
              className="input input-bordered w-full"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              type='submit'
              className="btn btn-primary w-full transform hover:scale-105 transition duration-300"
            >
              Login
            </button>
            {isError ? (
              <div className="mt-2 text-md text-center  text-red-600">{error}</div>
            ) : null}
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="link link-primary hover:text-blue-900">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
