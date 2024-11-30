import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	allowedFormats: ['jpg', 'png', 'jpeg'],
	params: {
		folder: 'FoodDelivery',
		public_id: (req, file) => `${Date.now()}-${file.originalname}`,
	},
});

const uploads = multer({ storage: storage });

export { uploads, cloudinary };
