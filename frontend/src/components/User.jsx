import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../api/api";
import moment from "moment";

export default function User() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(["|", "/", "-", "\\"]);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const { username } = useParams();

  useEffect(() => {
    getUserData(username)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [username]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingIndex((prevIndex) => (prevIndex + 1) % loading.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, [loading]);

  return (
    <div className="w-full flex flex-col text-xl bg-base-300 gap-3 p-10">
      <div className="text-primary font-semibold my-5 py-1">
        Here is a better way to display your data using{" "}
        <span className="p-2 bg-secondary text-primary">JSON</span>
      </div>
      <div className="text-primary font-semibold py-1">
        We encourage our users to familiarize with{" "}
        <span className="p-2 bg-secondary text-primary">Terminal</span> usage!
      </div>
      <div
        className="coding inverse-toggle p-5 my-10 shadow-lg text-gray-100 text-sm subpixel-antialiased 
              bg-primary pb-6 pt-4 rounded-lg leading-normal overflow-hidden"
      >
        <div className="top mb-2 flex">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="mt-4 flex">
          <span className="text-green-400">{username}'s-computer:~$</span>
          <p className="flex-1 typing items-center pl-2">
            getent passwd | grep &lt;{username}&gt;
            <br />
          </p>
        </div>
        <div>fetching user data {loading[loadingIndex]}</div>
        <div>user found: {username}</div>
        <div className="px-2">{"["}</div>
        <div className="px-6">{"{"}</div>
        <div className="px-8">
          <div className="text-md">"username": "{userData.username}",</div>
          <div className="text-md"
          >"email": "{userData.email}",</div>
          <div className="text-md">"gender": "{userData.gender}",</div>
  
          <div>
            "joined": "
            {moment(userData.created).format("MMMM Do YYYY, h:mm:ss a")}"
          </div>
        </div>
        <div className="px-6">{"}"}</div>
        <div className="px-2">{"]"}</div>
      </div>
    </div>
  );
}
