import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

export default function Navbar() {
  const [navBackground, setNavBackground] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const login = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const register = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div
      className={`fixed w-full z-20 transition duration-300 ${
        navBackground ? "bg-primary shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between py-4 px-10">
        <div className="flex items-center">
          {

          //<img src={Logo} className="h-8 mr-24 cursor-pointer" alt="Logo" />
          }
      
        </div>
        <div className="flex gap-2 py-1">
          <button
            className="btn btn-ghost text-xl text-white font-bold"
            onClick={login}
          >
            Login
          </button>
          <button className="btn btn-white text-xl" onClick={register}>
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
