// compress-images.js
const tinify = require("tinify");
const fs = require("fs");
const path = require("path");

tinify.key = "BGzycdRT86jR439jGsxtPX854CG04Kr6";

const images = [
  "Hotel.jpg",
  "Spare.jpg",
  "Traffic.jpg",
  "DPA.jpg",
  "Deep_learning_AI.png",
  "profile_pic.jpeg"
];

const publicDir = path.join(__dirname, "public");

(async () => {
  for (const img of images) {
    const imgPath = path.join(publicDir, img);
    if (fs.existsSync(imgPath)) {
      try {
        const source = tinify.fromFile(imgPath);
        await source.toFile(imgPath);
        console.log(`Compressed: ${img}`);
      } catch (err) {
        console.error(`Error compressing ${img}:`, err.message);
      }
    } else {
      console.warn(`File not found: ${img}`);
    }
  }
  console.log("Image compression complete.");
})(); 