import axios from 'axios';

let authToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getShipRocketToken() {
  try {
    // Check if token exists and is not expired
    if (authToken && tokenExpiry && Date.now() < tokenExpiry) {
      return authToken;
    }

    const response = await axios.post(`${process.env.SHIPROCKET_API_URL}/auth/login`, {
      email: "Purchase@renote.ai",
      password: "Renote@2024"
    });

    authToken = response.data.token;
    tokenExpiry = Date.now() + (24 * 60 * 60 * 1000); // Token valid for 24 hours
    return authToken;
  } catch (error) {
    console.error('ShipRocket authentication failed:', error);
    throw error;
  }
}

export const shiprocketClient = axios.create({
  baseURL: process.env.SHIPROCKET_API_URL,
});

shiprocketClient.interceptors.request.use(async (config) => {
  const token = await getShipRocketToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const trackOrder = async (orderId: string) => {
  try {
    const response = await shiprocketClient.get(`/orders/show/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to track order:', error);
    throw error;
  }
};
