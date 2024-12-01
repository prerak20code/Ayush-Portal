import './config/envLoader.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import './db/db.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const whitelist = process.env.WHITELIST ? process.env.WHITELIST.split(',') : [];
app.use(
    cors()
    //     {
    //     origin: function (origin, callback) {
    //         if (!origin || whitelist.includes(origin)) {
    //             callback(null, true);
    //         } else {
    //             callback(new Error('Not allowed by CORS'));
    //         }
    //     },
    //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    //     credentials: true,
    //     optionsSuccessStatus: 200,
    //     allowedHeaders: ['Content-Type', 'Authorization'],
    // }
);

import UserRouter from './api/user.js';
import startupRoute from './routes/startup.js';
import investmentRoute from './routes/investment.js';
import { GovOfficial } from './models/govOfficial.js';

// api
app.use('/user', UserRouter);
app.use('/api/v1/startup', startupRoute);
app.use('/api/v1/investment', investmentRoute);
app.use('/api/v1/investment', GovOfficial);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
