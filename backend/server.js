import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/database.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//DB connection
connectDB();

//api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.get('/', (req, res) => {
	res.send('API Working');
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
