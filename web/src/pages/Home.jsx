import React from "react";
import image_1 from "../../public/homeImage_1.png";

export default function Home() {
  const handleImageUpload = () => {
    console.log("Image Upload");
  };
  return (
    <div className="relative ... max-w-6xl mx-auto bg-white">
      <img
        className="mt-5 opacity-90 absolute sm:h-[400px] drop-shadow-2xl  top-0 right-0"
        src={image_1}
        alt="home"
      />
      <div className="absolute top-3 sm:top-40 w-full h-full ">
        <h1 className="mx-5 text-xl sm:text-4xl font-semibold text-sky-900">
          AI Powered Dermatology
        </h1>
        <h1 className="mx-5 text-xl sm:text-4xl mt-2 font-semibold text-sky-950">
          Diagnostic Tool
        </h1>
        <button
          onClick={handleImageUpload}
          className="mx-5 mt-6 sm:mt-10 sm:text-xl sm:font-medium bg-sky-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg shadow-cyan-900/40"
        >
          Upload Skin Image
        </button>
      </div>
    </div>
  );
}
