import React, { useState } from 'react';
import axios from 'axios';
import "./bottomsection.css";

const BottomBar = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('http://localhost:5001/subscribe', { email });
      setMessage(response.data.message);
      setEmail(''); // Clear the email field after successful subscription
    } catch (error) {
      setMessage('There was an error subscribing. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="Btm_bar">
      <p>Sign Up for Daily Insider</p>
      <input
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubscribe}>Subscribe</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BottomBar;
