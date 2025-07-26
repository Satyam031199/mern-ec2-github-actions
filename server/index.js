import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/get', (req, res) => {
    res.status(200).json({ message: 'GET request successful' });
});
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', Message: 'Server is running' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});