import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async (req, res) => {
  if (req.method === 'POST') {
    const { amount, currency } = req.body;

    try {
      const payment = await razorpay.orders.create({
        amount,
        currency,
      });

      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Payment failed', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
