import { NextApiRequest, NextApiResponse } from 'next';
import { shiprocketClient } from '@/utils/shiprocket';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Use a fallback base URL if NEXT_PUBLIC_BASE_URL is not defined
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    // Create an absolute URL for the Razorpay API endpoint
    const razorpayURL = new URL('/api/razorpay', baseURL).href;
    
    // Log baseURL for debugging
    console.log('Using baseURL:', baseURL, 'and razorpayURL:', razorpayURL);

    const { 
      paymentDetails, 
      orderDetails, 
      shippingDetails 
    } = req.body;

    // 1. Verify payment with Razorpay
    const verifyResponse = await fetch(razorpayURL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentDetails)
    });

    if (!verifyResponse.ok) {
      throw new Error('Payment verification failed');
    }

    // 2. Create shipping order
    const shippingOrder = await shiprocketClient.post('/orders/create/adhoc', {
      order_id: paymentDetails.razorpay_order_id,
      order_date: new Date().toISOString(),
      billing_customer_name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
      billing_address: shippingDetails.address,
      billing_city: shippingDetails.city,
      billing_pincode: shippingDetails.zip,
      billing_state: shippingDetails.state,
      billing_country: shippingDetails.country,
      billing_email: shippingDetails.email,
      billing_phone: shippingDetails.phone,
      shipping_is_billing: true,
      order_items: orderDetails.items,
      payment_method: "Prepaid",
      sub_total: orderDetails.amount,
      length: 10,
      breadth: 15,
      height: 20,
      weight: 0.5
    });

    return res.status(200).json({
      success: true,
      shipping: shippingOrder.data
    });

  } catch (error: any) {
    console.error('Payment success handling failed:', error);
    return res.status(500).json({
      message: 'Failed to process payment success',
      error: error.message
    });
  }
}
