import express from 'express';
import Razorpay from 'razorpay';
import { BAD_REQUEST, OK, SERVER_ERROR } from '../constants/statusCodes.js';

export const paymentRouter = express.Router();

// Configure Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
paymentRouter.post('/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;

        // Validate input
        if (!amount) {
            return res
                .status(BAD_REQUEST)
                .json({ error: 'Amount is required' });
        }

        // Create order
        const options = {
            amount: amount * 100, // Convert to the smallest unit (paise for INR)
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return res.status(OK).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return res
            .status(SERVER_ERROR)
            .json({ error: 'Internal Server Error' });
    }
});

// Payment Verification (Optional but Recommended)
paymentRouter.post('/verify-payment', async (req, res) => {
    const crypto = await import('crypto');

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;

        // Create a signature using the order ID and payment ID
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        // Compare signatures to verify payment
        if (expectedSignature === razorpay_signature) {
            res.status(OK).json({
                success: true,
                message: 'Payment verified successfully!',
            });
        } else {
            return res.status(BAD_REQUEST).json({
                success: false,
                message: 'Invalid payment signature',
            });
        }
    } catch (error) {
        console.error('Error verifying Razorpay payment:', error);
        return res
            .status(SERVER_ERROR)
            .json({ error: 'Internal Server Error' });
    }
});
