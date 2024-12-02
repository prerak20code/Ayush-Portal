import express from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../public'));

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

import {
    startupRouter,
    investmentRouter,
    govOfficialrouter,
    userRouter,
} from './routes/index.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/startups', startupRouter);
app.use('/api/v1/investments', investmentRouter);
app.use('/api/v1/gov-officials/', govOfficialrouter);
