import { errorHandler } from "../utils/error.js";
import axios from "axios";
import fs from "fs";

// const deleteFile = fs.unlink(imagePath, (err) => {
//   if (err) {
//     console.error("Error deleting temporary image:", err);
//   } else {
//     console.log("Temporary image deleted successfully.");
//   }
// });

export const predict = async (req, res, next) => {
  console.log(req.file);
  const uploadedFile = fs.createReadStream(req.file.path);
  // console.log(uploadedFile);
  const newFormData = new FormData();
  newFormData.append("file", uploadedFile);

  console.log(newFormData);
  try {
    const modelRes = await fetch("http://localhost:8080/predict", {
      method: "POST",
      body: newFormData,
    });
    // const modelRes = await axios.post(
    //   "http://localhost:8080/predict",
    //   newFormData
    // );
    // console.log(modelRes);
    if (!modelRes.success) {
      return next(errorHandler(500, "Error in prediction"));
    }
    console.log(modelRes);
    res.status(200).json(modelRes);

    //deleting tempory file
  } catch (error) {
    next(error);
  }
};
