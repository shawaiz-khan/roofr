import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (imagePath: string) => {
    try {
        const res = await cloudinary.v2.uploader.upload(imagePath, {
            folder: 'roofr-app',
        });
        console.log('Cloudinary upload response:', res);
        return res.secure_url;
    } catch (error) {
        console.error('Cloudinary upload failed', error);
        throw error;
    }
};