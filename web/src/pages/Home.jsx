import React, { useRef, useState } from "react";
import image_1 from "../../public/homeImage_1.png";

export default function Home() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      alert("Invalid file type. Please select an image (JPEG or PNG.");
      return;
    }

    setSelectedImage(file);
  };

  const handlePredict = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    // console.log(formData);
    try {
      const res = await fetch("api/model/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      setResult(data.class);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
        <button
          onClick={handleImageUpload}
          className="mx-5 mt-6 sm:mt-10 sm:text-xl sm:font-medium bg-sky-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg shadow-cyan-900/40"
        >
          Upload Skin Image
        </button>
        <div className="flex flex-col w-3/5 mx-auto bg-sky-200 mt-3.5 mb-32 rounded-xl ">
          {selectedImage && (
            <div className="p-10 mx-auto ">
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded Image"
                />
              )}
              {selectedImage && result && (
                <p className="text-center mt-2 text-slate-700 text-lg">
                  {result}
                </p>
              )}
              {selectedImage ? (
                <button
                  onClick={handlePredict}
                  className=" mt-6 sm:mt-6 sm:text-sm sm:font-medium bg-sky-500  text-white px-2 sm:px-4 py-1 sm:py-3 rounded-lg shadow-lg shadow-cyan-900/40 self-center"
                >
                  Get Prediction
                </button>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
