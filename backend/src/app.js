// import express from 'express';
// export const app = express();
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import http from 'http';
// import { server } from 'socket.io';

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static('../public'));

// const whitelist = process.env.WHITELIST ? process.env.WHITELIST.split(',') : [];
// app.use(
//     cors()
//     //     {
//     //     origin: function (origin, callback) {
//     //         if (!origin || whitelist.includes(origin)) {
//     //             callback(null, true);
//     //         } else {
//     //             callback(new Error('Not allowed by CORS'));
//     //         }
//     //     },
//     //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     //     credentials: true,
//     //     optionsSuccessStatus: 200,
//     //     allowedHeaders: ['Content-Type', 'Authorization'],
//     // }
// );

// import {
//     startupRouter,
//     investmentRouter,
//     govOfficialrouter,
//     startupOwnerRouter,
//     startupRegistrationApplicationRouter,
//     userRouter,
//     Chatrouter,
//     Messagerouter
//     // documentrouter,
// } from './routes/index.js';
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/owners', startupOwnerRouter);
// app.use('/api/v1/startups', startupRouter);
// app.use('/api/v1/investments', investmentRouter);
// app.use('/api/v1/gov-officials', govOfficialrouter);
// app.use('/api/v1/gov-officials', govOfficialrouter);
// app.use('/api/v1/applications', startupRegistrationApplicationRouter);
// // app.use('/api/documents', documentrouter);

// app.use('/api/v1/chat', Chatrouter);
// app.use('/api/v1/message', Messagerouter);

// // SOCKET

// const server = http.createServer(app);

// const io = new Server(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: 'http://localhost:3000',
//         // credentials: true,
//     },
// });

// io.on('connection', (socket) => {
//     console.log('Connected to socket.io');

//     socket.on('setup', (userData) => {
//         socket.join(userData._id);
//         socket.emit('connected');
//     });

//     socket.on('join chat', (room) => {
//         socket.join(room);
//         console.log('User Joined Room: ' + room);
//     });

//     socket.on('typing', (room) => socket.in(room).emit('typing'));
//     socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

//     socket.on('new message', (newMessageRecieved) => {
//         const chat = newMessageRecieved.chat;

//         if (!chat.users) return console.log('chat.users not defined');

//         chat.users.forEach((user) => {
//             if (user._id === newMessageRecieved.sender._id) return;

//             socket.in(user._id).emit('message recieved', newMessageRecieved);
//         });
//     });

//     socket.off('setup', (userData) => {
//         console.log('USER DISCONNECTED');
//         socket.leave(userData._id);
//     });
// });

// export default app;

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express App
export const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static('../public'));

// CORS Setup
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

// Import Routes
import {
    startupRouter,
    investmentRouter,
    govOfficialrouter,
    startupOwnerRouter,
    startupRegistrationApplicationRouter,
    userRouter,
    Chatrouter,
    Messagerouter,
} from './routes/index.js';

// API Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/owners', startupOwnerRouter);
app.use('/api/v1/startups', startupRouter);
app.use('/api/v1/investments', investmentRouter);
app.use('/api/v1/gov-officials', govOfficialrouter);
app.use('/api/v1/applications', startupRegistrationApplicationRouter);
app.use('/api/v1/chat', Chatrouter);
app.use('/api/v1/message', Messagerouter);

// Initialize HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
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

// Export App
export default server;
