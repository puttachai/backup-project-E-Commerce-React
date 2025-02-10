import React, { useState } from "react";
import { Link } from "react-router-dom";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details Submitted:", { paymentMethod, cardDetails });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 mt-2 mb-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
        <div className="flex flex-col gap-4 mb-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            Credit Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="bankTransfer"
              checked={paymentMethod === "bankTransfer"}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            Bank Transfer
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            PayPal
          </label>
        </div>

        {paymentMethod === "creditCard" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Card Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label className="block mb-2">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="123"
                />
              </div>
              <div>
                <label className="block mb-2">Name on Card</label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={cardDetails.nameOnCard}
                  onChange={handleCardInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="John Doe"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md w-full hover:bg-blue-600"
        >
          Confirm Payment
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/cart" className="text-blue-500 hover:underline">
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;
