import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

//app config
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('API Working');
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
