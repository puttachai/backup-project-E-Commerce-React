import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PromptPayCheckout = () => {
  const [qrCode, setQrCode] = useState("");

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/create-promptpay`, {
        amount: 2000, // 100 บาท (Omise ใช้หน่วยสตางค์)
        currency: "THB",
      });

      setQrCode(response.data.qr_code);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div>
      <h2>ชำระเงินด้วย PromptPay</h2>
      <button onClick={handlePayment}>สร้าง QR Code</button>
      {qrCode && (
        <img 
          src={qrCode} 
          alt="PromptPay QR Code" 
          style={{
            width: 'auto',
            maxWidth: '300px',  // ขนาดสูงสุดของ QR Code
            height: 'auto',
            marginTop: '20px'
          }} 
        />
      )}
    </div>
  );
};

export default PromptPayCheckout;
