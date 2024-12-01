import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Mongo URI:', process.env.mongoURI);
mongoose
    .connect(process.env.mongoURI)
    .then(() => {
        console.log('DB CONNECTED');
    })
    .catch((err) => {
        console.error('Database connection error:', err.message);
    });
