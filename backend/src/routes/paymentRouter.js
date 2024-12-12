import express from 'express';
import Razorpay from 'razorpay';

const router = express.Router();

// Configure Razorpay instance
const razorpay = new Razorpay({
    key_id: 'rzp_live_fHs6A3kVflK9Ul',
    key_secret: 'V88RLkx9DIVqMs2MmMpxgmAB',
});

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;

        // Validate input
        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        // Create order
        const options = {
            amount: amount * 100, // Convert to the smallest unit (paise for INR)
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

// Payment Verification (Optional but Recommended)
router.post('/verify-payment', async (req, res) => {
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
            res.status(200).json({
                success: true,
                message: 'Payment verified successfully!',
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid payment signature',
            });
        }
    } catch (error) {
        console.error('Error verifying Razorpay payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
