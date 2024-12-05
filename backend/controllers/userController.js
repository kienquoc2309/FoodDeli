import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

//login user

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });

		if (!user) {
			throw new Error('Email/Password incorrect, please check your info');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Email/Password incorrect, please check your info');
		}

		const token = createToken(user._id);
		res.status(200).json({
			success: true,
			token,
			message: 'Login successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ sucess: false, message: error.message });
	}
};

const createToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '60d' });
};

//register user
const registerUser = async (req, res) => {
	const { name, password, email } = req.body;
	try {
		//check email
		const exists = await userModel.findOne({ email });
		if (exists) {
			throw new Error('User already exists');
		}

		//validate email and strong password
		if (!validator.isEmail(email)) {
			throw new Error('Please enter a valid email');
		}

		if (password.length < 8) {
			throw new Error('Please enter password >8 characters');
		}

		//hashing user password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const newUser = new userModel({ name, email, password: hashPassword });

		const user = await newUser.save();
		const token = createToken(user._id);
		console.log(token);
		res.json({
			success: true,
			token: token,
			message: 'Register successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ success: false, message: error.message });
	}
};

export { loginUser, registerUser };
