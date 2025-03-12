import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay with proper error handling
const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
};

interface RazorpayOrderOptions {
  amount: number;
  currency: string;
  receipt: string;
  payment_capture?: 0 | 1;
  notes?: Record<string, any>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const razorpay = getRazorpayInstance();
      
      // Validate amount
      const { amount } = req.body;
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ 
          error: 'Invalid amount',
          details: 'Amount must be a positive number' 
        });
      }

      // Create order with proper typing
      const orderOptions: RazorpayOrderOptions = {
        amount: Math.round(amount),
        currency: 'INR',
        receipt: `order_${Date.now()}`,
        payment_capture: 1,
        notes: {
          orderType: 'product_purchase'
        }
      };

      const order = await razorpay.orders.create(orderOptions);

      if (!order.id) {
        throw new Error('Failed to create Razorpay order');
      }

      // Return required order details with additional handlers
      return res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        notes: order.notes,
        modal: {
          ondismiss: "handlePaymentDismissal",
          oncancel: "handlePaymentCancellation"
        }
      });

    } catch (error: any) {
      console.error('Razorpay Error:', error);
      return res.status(500).json({
        error: 'Payment initialization failed',
        details: error.message,
        code: error.code
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature 
      } = req.body;

      // Generate signature for verification
      const text = `${razorpay_order_id}|${razorpay_payment_id}`;
      const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(text)
        .digest('hex');

      // Verify the signature
      if (generated_signature === razorpay_signature) {
        return res.status(200).json({ verified: true });
      }

      return res.status(400).json({ 
        verified: false,
        message: 'Invalid signature' 
      });

    } catch (error: any) {
      console.error('Verification Error:', error);
      return res.status(500).json({ 
        error: error.message,
        message: 'Signature verification failed' 
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
