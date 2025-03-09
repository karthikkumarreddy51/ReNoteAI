import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { orderId, shippingDetails } = req.body;

    try {
      const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
        order_id: orderId,
        ...shippingDetails,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SHIPROCKET_API_TOKEN}`,
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Shipment creation failed', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
