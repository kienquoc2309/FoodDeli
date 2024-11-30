import foodModel from '../models/foodModel.js';
import { cloudinary } from '../config/cloudinary.js';
//add food item

const addFood = async (req, res) => {
	const image_url = `${req.file.path}`;
	const food = foodModel({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		image: image_url,
	});
	try {
		await food.save();
		res.json({ success: true, message: 'Food Add successfully' });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'Error' });
	}
};

//all food list
const listFood = async (req, res) => {
	try {
		const foods = await foodModel.find({});
		res.json({ success: true, data: foods });
	} catch (error) {
		console.log(error);
		res.json({ success: false, messager: 'Error' });
	}
};

//remove food item
const removeFood = async (req, res) => {
	try {
		const food = await foodModel.findById(req.body.id);

		const publicId = food.image.split('/').pop().split('.')[0];
		console.log(publicId);
		const result = await cloudinary.uploader.destroy(
			`FoodDelivery/${publicId}.png`
		);
		console.log(result);
		await foodModel.findByIdAndDelete(req.body.id);
		res.json({ success: true, message: 'Food deleted successfully' });
	} catch (error) {
		console.error('Error deleting food:', error);
		res.status(500).json({
			success: false,
			message: 'Server error',
			error: error.message,
		});
	}
};
export { addFood, listFood, removeFood };
