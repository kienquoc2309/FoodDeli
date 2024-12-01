import mongoose from 'mongoose';
import validator from 'validator';

const { isEmail } = validator;
const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: value => isEmail(value),
				message: 'Email is incorrect format',
			},
		},
		password: { type: String, required: true },
		cartData: { type: Object, default: {} },
	},
	{ minimize: false }
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
