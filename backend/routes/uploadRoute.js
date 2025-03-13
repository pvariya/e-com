const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const uploadRouter = express.Router();

cloudinary.config({
  cloud_name: "deyyxj4xf",
  api_key: "699616665931218",
  api_secret: "3rJnkXv-qOlHpOUHlthwVCe9o3s",
});
const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post("/", upload.single("images"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result =await streamUpload(req.file.buffer);
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = uploadRouter;
