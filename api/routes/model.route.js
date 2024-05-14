import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { predict } from "../controllers/model.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "api/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/predict", verifyToken, upload.single("file"), predict);

export default router;
