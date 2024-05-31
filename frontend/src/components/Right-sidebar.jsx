import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUser, FaHome, FaCopyright } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export default function RightSidebar() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const collapseValue = localStorage.getItem("collapse-right");
    if (collapseValue !== null) {
      setCollapsed(JSON.parse(collapseValue));
    } else {
      localStorage.setItem("collapse-right", true);
      setCollapsed(true);
    }
  }, []);

  const toggleCollapse = (e) => {
    e.preventDefault();
    localStorage.setItem("collapse-right", !collapsed);
    setCollapsed(!collapsed);
  };


  return (
    
    <div
      className={`relative  flex flex-col h-screen bg-primary text-secondary text-bold  p-10  py-28 ${
        collapsed ? "w-64" : "w-20 items-center p-7"
      } transition-all duration-200`}
    >
      

      <div
        onClick={toggleCollapse}
        className="flex flex-row items-center gap-4 cursor-pointer my-5 p-4 bg-primary rounded-md hover:opacity-80 transition-opacity duration-200"
      >
        <IoMdArrowRoundBack
          className={`${
            collapsed ? "rotate-180" : "rotate-0"
          } mt-1 transition-transform duration-200`}
        />
        {collapsed ? <div>Collapse</div> : null}
      </div>
      <div
        onClick={() => navigate(`/home/`)}
        className="flex flex-row items-center gap-4 cursor-pointer my-5 p-4 bg-primary rounded-md hover:opacity-80 transition-opacity duration-200"
      >
        <FaHome className="mt-1" />
        {collapsed ? <div>Home</div> : null}
      </div>

      <div
        onClick={() => navigate(`/home/profile/${username}/`)}
        className="flex flex-row items-center gap-4 cursor-pointer my-5 p-4 bg-primary rounded-md hover:opacity-80 transition-opacity duration-200"
      >
        <FaUser className="mt-1" />
        {collapsed ? <div>User</div> : null}
      </div>

      <div
        onClick={() => navigate(`/`)}
        className="flex flex-row items-center gap-4 cursor-pointer my-5 p-4 bg-primary rounded-md hover:opacity-80 transition-opacity duration-200"
      >
        <MdLogout className="mt-1" />
        {collapsed ? <div>Log out</div> : null}
      </div>
      <div className="flex flex-row items-center text-primary text-sm gap-2 my-5 p-4 fixed bottom-0">
        <FaCopyright className="mt-1" />
        <div>{collapsed ? <span>version</span> : <span>v</span>} 1.0</div>
      </div>
    </div>
  );
}
