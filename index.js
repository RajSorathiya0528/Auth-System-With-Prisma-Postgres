import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import route from './Routes/User.route.js';

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors({
    origin : 'http://localhost:5173'
}));
app.use(cookieParser())
app.use('/api/v1/users', route)

app.get('/', (req, res) => {
    res.send("hello world!")
})

app.listen(port, () => {
    console.log(`server is running on port:${port}`)
})