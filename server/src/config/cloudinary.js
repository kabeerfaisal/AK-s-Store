import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = async (fileBuffer, folder = "aks-store/products") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder},
            (error, result) => {
                if (error) reject(error)
                else resolve({url: result.secure_url, public_id: result.public_id})    
            }
        )
        stream.end(fileBuffer)
    })
}

export const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log("Cloudinary Delete Error:", error.message)
    }
}

export default cloudinary