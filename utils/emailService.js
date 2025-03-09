import emailjs from 'emailjs-com';

export const sendOrderDetails = async (products, totalAmount, shippingAddress) => {
  const templateParams = {
    products: JSON.stringify(products),
    totalAmount,
    shippingAddress: JSON.stringify(shippingAddress),
  };

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.EMAILJS_USER_ID
    );
  } catch (error) {
    console.error('Failed to send order details', error);
  }
};
