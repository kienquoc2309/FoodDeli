import express from 'express';
import {
	addFood,
	listFood,
	removeFood,
} from '../controllers/foodController.js';
import { uploads } from '../config/cloudinary.js';

const foodRouter = express.Router();

//Image storage engine

foodRouter.post(
	'/add',
	uploads.single('image'),
	async (req, res, next) => {
		try {
			if (!req.file) {
				return res
					.status(400)
					.json({ success: false, message: 'Image upload failed' });
			}
			next();
		} catch (err) {
			console.error(err);
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: err.message,
			});
		}
	},
	addFood
);

foodRouter.get('/list', listFood);

foodRouter.post('/remove', removeFood);

export default foodRouter;
