import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import RightSidebar from "../components/Right-sidebar";
import Logo from "../assets/logo.png";
import LogoM from "../assets/LOGO MASTER.png";
import Sidebar from "../components/Left-sidebar";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.pathname.includes("profile")) navigate("/home/chatbot");
  }, [location]);

  return (
    <div className="flex h-screen">
      <Sidebar className="w-auto bg-accent p-4 shadow h-full fixed left-0 top-0 bottom-0" />
      <div className="flex flex-col flex-1">
        <header className="bg-primary shadow relative flex items-center justify-center">
          <div className="flex gap-2 items-center ">
            <img src={Logo} className="h-20 cursor-pointer" alt="Logo" />
            <h1 className="text-2xl text-secondary font-bold">FSTT ChaTboT</h1>
            <img
              src={LogoM}
              className="h-20 cursor-pointer"
              alt="Logo Master AI and Data Science"
            />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto flex w-full">
          <Outlet />
        </main>
      </div>
      <RightSidebar className="w-auto bg-base-200 p-4 shadow h-full fixed top-0 bottom-0 right-0" />
    </div>
  );
}
export default Home;
