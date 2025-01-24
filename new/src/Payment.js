import React, { useState } from 'react';
import axios from 'axios';
import './Payment.css';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to initiate payment process
  const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Request to backend to create payment order (change URL if needed)
      const response = await axios.post('http://localhost:3001/payment/create', {
        amount: 3500,  // Amount in paise (₹3500 = 350000 paise)
      });

      if (!response.data || !response.data.orderId) {
        throw new Error('Order ID missing in the response.');
      }

      // Call Razorpay Checkout with the order details received from the backend
      openRazorpayCheckout(response.data);

    } catch (error) {
      console.error('Error initiating payment:', error);
      setError(error.message || 'An error occurred while initiating payment.');
    } finally {
      setLoading(false);
    }
  };

  // Function to open Razorpay checkout
  const openRazorpayCheckout = (paymentData) => {
    const options = {
      key: 'rzp_test_m45f1fRZ3dhDMb', // Your Razorpay key ID
      amount: paymentData.amount, // The amount to be paid in paise (e.g., ₹3500 = 350000 paise)
      currency: 'INR',
      order_id: paymentData.orderId, // Razorpay order ID created from backend
      handler: function (response) {
        // Handle successful payment
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        // Optionally, you can send the payment details to the backend for verification
        verifyPayment(response.razorpay_payment_id, paymentData.orderId, response.razorpay_signature);
      },
      prefill: {
        name: 'Sravanthi', // User's name
        email: '23wh5a0511@bvrithyderabad.edu.in', // User's email
        contact: '6303573938', // User's phone number
      },
      notes: {
        address: 'Customer Address', // Optional, include customer's address
      },
    };

    // Initialize Razorpay Checkout
    const razorpay = new window.Razorpay(options);
    razorpay.open(); // Open the Razorpay payment modal
  };

  // Function to verify the payment signature with backend (if needed)
  const verifyPayment = async (paymentId, orderId, signature) => {
    try {
      // Call the backend to verify the payment
      const verificationResponse = await axios.post('http://localhost:3001/payment/verify', {
        paymentId,
        orderId,
        signature
      });

      if (verificationResponse.data.success) {
        alert('Payment verified successfully!');
      } else {
        alert('Payment verification failed!');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Error verifying payment.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2 className='xyz'>Payment</h2>
      {error && <div className="error-message">{error}</div>}
      <button onClick={initiatePayment} disabled={loading}>
        {loading ? 'Processing Payment...' : 'Pay ₹3500'}
      </button>
    </div>
  );
};

export default Payment;

