import { v2 as cloudinary } from 'cloudinary'

const uploadOnCloudinary = async(file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
    try {
        const result = await cloudinary.uploader.upload(file)
        FileSystem.unlinkSync(file)
        return result.secure_url;

    } catch (error) {
        FileSystem.unlinkSync(file)
        console.error("Cloudinary upload failed:", error);
        throw error;
    }
}

export default uploadOnCloudinary;