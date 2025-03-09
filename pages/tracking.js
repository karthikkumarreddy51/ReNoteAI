import { useState } from 'react';
import axios from 'axios';

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);

  const handleTrack = async () => {
    try {
      const response = await axios.get(`/api/track?trackingId=${trackingId}`);
      setTrackingInfo(response.data);
    } catch (error) {
      console.error('Tracking failed', error);
    }
  };

  return (
    <div>
      <h1>Track Your Order</h1>
      <input
        type="text"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Enter your tracking ID"
      />
      <button onClick={handleTrack}>Track</button>
      {trackingInfo && (
        <div>
          <h2>Tracking Information</h2>
          <pre>{JSON.stringify(trackingInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Tracking;
