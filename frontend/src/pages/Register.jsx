import React from 'react'
export default function Register() {
  return (
    <div className=" relative min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-sm p-8 space-y-8 bg-base-100 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
        <h1 className="text-3xl font-bold text-center text-primary">Sign Up</h1>
        <p className="text-md font-medium text-center ">
          Welcome, create a new account.
        </p>
        <form className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              name="username"
              placeholder=" Enter your Username"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <input
              type="email"
              name="email"
              placeholder=" Enter your Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mt-4 flex items-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                className="form-radio h-4 w-4 text-accent"
              />
              <span className="ml-2 text-md ">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="gender"
                className="form-radio h-4 w-4 text-accent"
              />
              <span className="ml-2  text-md">Female</span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary w-full transform hover:scale-105 transition duration-300"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="">
          <p className="mb-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="link link-primary hover:text-blue-900">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
