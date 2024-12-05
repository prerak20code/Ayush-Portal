import { Docmetadata } from '../models/Documentmodel.js'; // Ensure the path and file extension are correct
import { uploadFile } from '../utils/s3utils.js'; // Ensure the path and file extension are correct
import { User } from '../models/user.Model.js';
import { deleteFile } from '../utils/s3utils.js';
import mongoose from 'mongoose';
import sharp from 'sharp';
import crypto from 'crypto';
import express from 'express';
const uploadDocument = async (req, res) => {
    const { userId, caption, Documentname } = req.body;
    // console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(userId, Documentname);
    const fileBuffer = await sharp(req.file.buffer)
        .resize({ width: 800, height: 800, fit: 'contain' })
        .toBuffer();
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // console.log(user);
    const FileName = userId.toString();
    await uploadFile(fileBuffer, FileName, req.file.mimetype);

    const document = new Docmetadata({ name: Documentname, id: userId });
    // console.log(document)
    await document.save();

    res.status(201).json(document);
};

const deleteFileController = async (req, res) => {
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).json({ message: 'File name is required' });
    }

    try {
        // Check if the file belongs to the authenticated user
        const document = await Docmetadata.findOne({
            id: req.userId,
            name: fileName,
        });

        if (!document) {
            return res.status(404).json({
                message: 'File not found or not authorized to delete',
            });
        }

        // Delete file from S3
        await deleteFile(fileName);

        // Remove file metadata from the database
        await Docmetadata.deleteOne({ id: req.userId, name: fileName });

        res.status(200).json({
            message: `File ${fileName} deleted successfully`,
        });
    } catch (error) {
        console.error('Error in deleteFileController:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { uploadDocument, deleteFileController };
