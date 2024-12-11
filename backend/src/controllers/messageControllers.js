import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';
import { User } from '../models/user.Model.js';
import Chat from '../models/Chat.Model.js';

//  Get all Messages
//  GET /api/Message/:chatId
const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate('sender', 'name email')
            .populate('chat');
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//  Create New Message
//  POST /api/Message/
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log('Invalid data passed into request');
        return res.sendStatus(400);
    }

    // Validate chat
    const chat = await Chat.findById(chatId).populate('users', 'name email');
    if (!chat) {
        res.status(404);
        throw new Error('Chat not found');
    }

    // Check if sender is part of the chat
    if (!chat.users.some(user => user._id.equals(req.user._id))) {
        res.status(403);
        throw new Error('Not authorized to send messages to this chat');
    }

    const newMessage = {
        sender: req.user._id,
        content,
        chat: chatId,
    };

    try {
        let message = await Message.create(newMessage);

        // Populate fields directly without `execPopulate()`
        message = await message.populate('sender', 'name');
        message = await message.populate('chat');
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name email',
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export { allMessages, sendMessage };
