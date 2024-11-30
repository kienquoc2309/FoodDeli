import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const mongo_uri = process.env.MONGO_URI;

const connectDB = async function () {
	try {
		let connection = await mongoose.connect(mongo_uri);
		console.log('Connect MongoDB successfully');
		return connection;
	} catch (error) {
		const { code } = error;
		//console.log(code);
		debugger;
		if (error.code == 8000) {
			throw new Error(`Wrong database's username or password`);
		} else if (code == 'ENODATA') {
			throw new Error(`Wrong server name/connect string`);
		}
		throw new Error(`Cannot connect to MongoDB`);
	}
};

export default connectDB;
