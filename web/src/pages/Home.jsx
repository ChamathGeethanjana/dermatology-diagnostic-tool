import React, { useRef, useState } from "react";
import image_1 from "../../public/homeImage_1.png";

export default function Home() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPredict, setloadingPredict] = useState(false);

  const handleImageChange = (e) => {
    setLoading(true);

    const file = e.target.files[0];

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      alert("Invalid file type. Please select an image (JPEG or PNG.");
      setLoading(false);
      return;
    }
    setSelectedImage(file);
    setLoading(false);
  };

  const handlePredict = async () => {
    setloadingPredict(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    // console.log(formData);
    try {
      const res = await fetch("http://localhost:8080/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      setResult(data.class);
      setloadingPredict(false);
    } catch (error) {
      console.log(error);
      setloadingPredict(false);
      setError(error.message);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const closeImage = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
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
          disabled={loading || selectedImage}
          onClick={handleImageUpload}
          className="mx-5 mt-6 sm:mt-10 sm:text-xl sm:font-medium bg-sky-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg shadow-cyan-900/40 hover:opacity-95 disabled:opacity-80 "
        >
          {loading ? "Loading..." : "Upload Skin Image"}
        </button>
        <div className="flex flex-col w-3/5 mx-auto bg-sky-200 mt-3.5 mb-32 rounded-xl ">
          {selectedImage && (
            <div className="p-10 flex flex-col gap-2 relative">
              <button
                onClick={closeImage}
                className="m-3 absolute top-0 right-0 color-slate-700 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded Image"
                className="mt-3"
              />

              {result ? (
                <p className=" text-slate-700 text-lg text-center">
                  Disease : {result}
                </p>
              ) : error ? (
                <span className="text-red-600 text-center">{error}</span>
              ) : (
                ""
              )}

              {selectedImage ? (
                <button
                  disabled={loadingPredict}
                  onClick={handlePredict}
                  className=" mt-6 sm:mt-6 sm:text-sm sm:font-medium bg-sky-800  text-white px-2 sm:px-4 py-1 sm:py-3 rounded-lg shadow-lg shadow-cyan-900/40 self-center hover:opacity-95 disabled:opacity-80  "
                >
                  {loadingPredict ? "Loading..." : "Predict"}
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
