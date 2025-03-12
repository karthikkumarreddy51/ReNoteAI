import { NextApiRequest, NextApiResponse } from 'next';
import { shiprocketClient } from '@/utils/shiprocket';

interface OrderItem {
  name: string;
  id: string;
  quantity: number;
  price: number;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  state: string;
  country: string;
  email: string;
  phone: string;
}

interface OrderRequest {
  order: {
    razorpay_order_id: string;
    items: OrderItem[];
    amount: number;
  };
  shippingDetails: ShippingDetails;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { order, shippingDetails } = req.body as OrderRequest;

    const orderPayload = {
      order_id: order.razorpay_order_id,
      order_date: new Date().toISOString(),
      pickup_location: "ReNote AI Warehouse",
      billing_customer_name: shippingDetails.firstName + " " + shippingDetails.lastName,
      billing_address: shippingDetails.address,
      billing_city: shippingDetails.city,
      billing_pincode: shippingDetails.zip,
      billing_state: shippingDetails.state,
      billing_country: shippingDetails.country,
      billing_email: shippingDetails.email,
      billing_phone: shippingDetails.phone,
      shipping_is_billing: true,
      order_items: order.items.map((item: OrderItem) => ({
        name: item.name,
        sku: item.id,
        units: item.quantity,
        selling_price: item.price,
      })),
      payment_method: "Prepaid",
      sub_total: order.amount,
      length: 10,
      breadth: 15,
      height: 20,
      weight: 0.5
    };

    const response = await shiprocketClient.post('/orders/create/adhoc', orderPayload);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('ShipRocket order creation failed:', error);
    return res.status(500).json({ message: 'Failed to create shipping order' });
  }
}
