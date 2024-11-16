import React, { useState } from "react";
import axios from "axios";
import "./bottomsection.css";

const BottomBar = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubscribe = async () => {
    if (!email || !validateEmail(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post("http://localhost:5001/subscribe", {
        email,
      });
      setMessage("Subscription successful! Check your email.");
      setEmail(""); // Clear email input
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to subscribe. Please try again."
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
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
      <button onClick={handleSubscribe} disabled={isLoading}>
        {isLoading ? "Subscribing..." : "SUBSCRIBE"}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BottomBar;
