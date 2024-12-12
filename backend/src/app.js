import express from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

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
    startupOwnerRouter,
    startupRegistrationApplicationRouter,
    userRouter,
    Chatrouter,
    Messagerouter,
    documentRouter,
    queryRouter,
} from './routes/index.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/owners', startupOwnerRouter);
app.use('/api/v1/startups', startupRouter);
app.use('/api/v1/investments', investmentRouter);
app.use('/api/v1/gov-officials', govOfficialrouter);
app.use('/api/v1/applications', startupRegistrationApplicationRouter);
app.use('/api/v1/chat', Chatrouter);
app.use('/api/v1/message', Messagerouter);
app.use('/api/v1/documents', documentRouter);
app.use('/api/v1/queries', queryRouter);

const httpServer = http.createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    },
});

// Socket.IO Logic
io.on('connection', (socket) => {
    console.log('Connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log(`User Joined Room: ${room}`);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageRecieved) => {
        const chat = newMessageRecieved.chat;

        if (!chat.users) return console.log('chat.users not defined');

        chat.users.forEach((user) => {
            if (user._id === newMessageRecieved.sender._id) return;

            socket.in(user._id).emit('message received', newMessageRecieved);
        });
    });

    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED');
    });
});

//RazorPay
import paymentRouter from './routes/paymentRouter.js';
app.use('/api/v1/users', userRouter);
app.use('/api/v1/queries', queryRouter);
app.use('/api/v1/payments', paymentRouter); // Add Razorpay payment routes

// Razorpay Integration
app.post('/api/v1/payments/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export App
export default httpServer;
