const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        console.log('file: ', file);
        const allowedFormats = ["jpg", "jpeg", "png", "pdf"];
        const fileExtension = file.mimetype.split("/")[1];
        if (!allowedFormats.includes(fileExtension)) {
            throw new Error("Unsupported file format. Use JPG, PNG, or PDF.");
        }
        return {
            folder: "Jalvardaan",
            format: fileExtension,
            public_id: Date.now(),
        };
    },
});

const upload = multer({ storage });

module.exports = upload;
