import { sendOrderDetails } from '../../utils/emailService';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { products, totalAmount, shippingAddress } = req.body;

    // Process order creation logic
    // ...existing code...

    // Send order details via email
    await sendOrderDetails(products, totalAmount, shippingAddress);

    res.status(200).json({ message: 'Order created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
