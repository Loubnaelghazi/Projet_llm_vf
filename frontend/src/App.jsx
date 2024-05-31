import React from "react";
import Navbar from './components/Navbar'
import backgroundVid from "./assets/backgroundVid.mp4"
import "tailwindcss/tailwind.css";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <video
        src={backgroundVid}
        loop
        autoPlay
        muted
        className="w-full h-screen object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div>
            <span className="text-white text-6xl font-semibold">
              Unleash The True Power of
            </span>
            <span className="bg-white text-black mx-2 px-4 text-6xl font-semibold">
              AI.
            </span>
          </div>

        </div>
      </div>
     
    </div>
  );
}



export default App;
