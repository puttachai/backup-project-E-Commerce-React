import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom'; //useLocation
//import { QRCodeCanvas } from "qrcode.react";
import qrcode from 'qrcode';
// import promptpay from 'promptpay-qr';
import generatePayload from 'promptpay-qr'
import PropTypes from "prop-types";  // Import PropTypes for validation
import axios from 'axios';
import { toast } from 'react-toastify';


const PaymentInformation = ({ selectedPaymentMethod }) => { //totalSummary

  const navigate = useNavigate();  // ใช้ useNavigate hook
  const location = useLocation();

  const [orderStatus, setOrderStatus] = useState(null); // ใช้เก็บสถานะของคำสั่งซื้อ
  console.log("orderStatus: ",orderStatus);

  const [countdown, setCountdown] = useState(86400); // ตั้งเวลาเริ่มต้น 24 ชั่วโมง (ในวินาที)
  const [currentDate, setCurrentDate] = useState(new Date()); // Store current date and time
  const { referenceNumber } = useParams();  // ดึง referenceNumber จาก URL path
  // const [referenceNumber, setReferenceNumber] = useState(""); // Store the reference number
  
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [isPaid, setIsPaid] = useState(false);
  // const [cancelledOrder, setCancelledOrder] = useState(false); // เพิ่ม state สำหรับตรวจสอบการยกเลิกคำสั่งซื้อ
  const [isCancelling, setIsCancelling] = useState(false);
  //const promptpay = generatePayload();

  // ดึงข้อมูลจาก localStorages
  const totalSummarys = localStorage.getItem('totalSummarys');
  // const userId = localStorage.getItem('user_id');
  const allIds = localStorage.getItem('allIds');
  const orderId = localStorage.getItem('orderId');
  //const totalSummarys = (localStorage.getItem('totalSummary')) || [];
  console.log("Selected items from localStorage:", totalSummarys);
  console.log("Selected items from localStorage allIds:", allIds);
  console.log("Selected items from localStorage orderId:", orderId);

  const [transactionID, setTransactionID] = useState(''); // เก็บ Transaction ID สำหรับ Webhook

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {

        const totalSummarys = parseFloat(localStorage.getItem("totalSummarys"));
          const promptPayID = '0952517869';
  
          const qrData = generatePayload(promptPayID, { amount: totalSummarys });
           
  
          qrcode.toDataURL(qrData, async (err, url) => {

            if (!err) {
              setQrCodeUrl(url);
              const newTransaction = await axios.post(`${BASE_URL}/api/insert-qrCodeUrl`, { 
                // promptPayID, 
                // amount: totalSummarys, 
                referenceNumber, 
                qrCodeUrl: url, // ตรวจสอบให้แน่ใจว่าส่งไป
                headers: {
                  'Cache-Control': 'no-cache',
                  //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
              });
              console.log("newTransaction: ", newTransaction);
              setTransactionID(newTransaction.data.transactionID);
              // setQrCodeUrl(response.data.qrCodeUrl); // ใช้ QR Code เดิม
            } else {
              console.error("QR Code generation error:", err);
            }
          });

          console.log("transaction referenceNumber: ", referenceNumber);

        const response = await axios.get(`${BASE_URL}/api/transaction/${referenceNumber}`,{ //referenceNumber ${transactionID} ${referenceNumber}
          // params: { referenceNumber }, 
          // referenceNumber,
          // params:{
          //   transactionID
          // },
          headers: {
            'Cache-Control': 'no-cache',
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        });
        console.log("response transaction: ",response);

        if (response.data.referenceNumber) { //referenceNumber
          setTransactionID(response.data.transactionID);  // ใช้ transactionID เดิม referenceNumber
        // if (response.data.transactionID) {
        //   setTransactionID(response.data.transactionID);  // ใช้ transactionID เดิม 
          setQrCodeUrl(response.data.qrCodeUrl); // ใช้ QR Code เดิม
        } else {
          // ถ้าไม่มี transactionID เดิม ให้สร้างใหม่
          const totalSummarys = parseFloat(localStorage.getItem("totalSummarys"));
          const promptPayID = '0952517869';
  
           const qrData = generatePayload(promptPayID, { amount: totalSummarys });
  
          qrcode.toDataURL(qrData, async (err, url) => {

            if (!err) {
              setQrCodeUrl(url);
              const newTransaction = await axios.post(`${BASE_URL}/api/webhook`, { 
                promptPayID, 
                amount: totalSummarys, 
                referenceNumber, 
                qrCodeUrl: url // ตรวจสอบให้แน่ใจว่าส่งไป
              });
              console.log("newTransaction: ", newTransaction);
              setTransactionID(newTransaction.data.transactionID);
              setQrCodeUrl(response.data.qrCodeUrl); // ใช้ QR Code เดิม
            } else {
              console.error("QR Code generation error:", err);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };
  
    fetchTransactionData();
  }, [BASE_URL, referenceNumber]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5001");
  
    ws.onopen = () => console.log("WebSocket connected");
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);
      if (data.status === "paid") {
        setIsPaid(true);
        toast.success("🎉 Payment successful!");
      }
    };
  
    return () => {
      ws.close();
      console.log("WebSocket disconnected");
    };
  }, []);
  
  

  // Generate a unique reference number (for example, based on the current timestamp)
  // useEffect(() => {
  //   const generateReferenceNumber = () => {
  //     const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
  //     return `GEK${timestamp.toString(36).toUpperCase()}`; // Generate reference based on timestamp
  //   };
  //   setReferenceNumber(generateReferenceNumber());
  // }, []);

  // Update current date and time every minute (or you can adjust as per your requirement)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute (60000 ms)
    return () => clearInterval(interval);
  }, []);

  // Format the current date (Due date can be modified accordingly)
  const formatDueDate = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // แปลงวินาทีให้เป็น ชั่วโมง:นาที:วินาที
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    // ตรวจสอบสถานะคำสั่งซื้อจากฐานข้อมูล
    const checkOrderStatus = async () => {
      console.log("Checking order status for:", referenceNumber);
      try {
        console.log("Checking order status for:", referenceNumber);
        const response = await axios.get(`${BASE_URL}/api/order/status/${referenceNumber}`, {
          // referenceNumber
          headers: {
            'Cache-Control': 'no-cache',
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        }); // API สำหรับเช็คสถานะคำสั่งซื้อ
        console.log("response status: ",response);
        if (response.data.status === 'Cancelled') {
          // ถ้าคำสั่งซื้อถูกยกเลิก ให้แสดง popup และเปลี่ยนหน้าไปที่ /cart
          alert('คุณได้ดำเนินรายการแล้ว');
          navigate('/cart');
        } else {
          setOrderStatus(response.data.status); // ถ้าสถานะไม่ใช่ Cancelled ให้บันทึกสถานะ
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
        alert('เกิดข้อผิดพลาดในการตรวจสอบสถานะคำสั่งซื้อ');
      }
    };

    checkOrderStatus();
  }, [BASE_URL, referenceNumber, navigate]);

  const handleCancelOrder = async () => {
    setIsCancelling(true); // Set to true when canceling the order

    try {
      const userId = localStorage.getItem("user_id"); // ดึง userId จาก localStorage หรือจาก state
      console.log("userId: ", userId);
      
      const allIds = JSON.parse(localStorage.getItem("allIds")); // แปลง allIds จาก string เป็น array
      console.log("allIds: ", allIds);
      const orderId = JSON.parse(localStorage.getItem("orderId")); // แปลง allIds จาก string เป็น array
      console.log("orderId: ", orderId);

      //const allIds = localStorage.getItem('allIds'); // ดึงข้อมูลจาก localStorage

      const response = await axios.delete(`${BASE_URL}/api/order`, { data: { userId, allIds, orderId, referenceNumber} });

      console.log("response: ", response);
  
      if (response.status === 200) {
        // setCancelledOrder(true); // ตั้งค่า cancelledOrder เป็น true เมื่อกด Cancel
        alert("Order has been successfully canceled.");
        // รีเฟรชหน้าหรือเปลี่ยนเส้นทางกลับไปยังหน้าหลัก
        //window.location.reload();
        navigate('/cart');
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel the order. Please try again.");
    }finally {
      setIsCancelling(false); // รีเซ็ตค่าเมื่อเสร็จสิ้น
    }
  };  


useEffect(() => {
  let warningToastId = null;

  // ถ้าไม่มีการ cancel และยังไม่จ่าย ให้แสดงเตือน
  if (!isCancelling && !isPaid) {
    warningToastId = toast.warn("คุณยังไม่ได้ชำระเงินใช่ไหม?", {
      position: "top-right",
      autoClose: 300000, // 5 นาที
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClick: () => navigate(`/paymentInfo/${referenceNumber}`),
    });
  }

  // Cleanup function เพื่อลบ toast เดิมเมื่อ isCancelling เปลี่ยนเป็น true
  return () => {
    if (isCancelling) {
      toast.dismiss(warningToastId); // ลบ toast.warn ที่แสดงอยู่ก่อนหน้านี้
      toast.success("ยกเลิกรายการเรียบร้อย", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
}, [location.pathname, navigate, isPaid, isCancelling, referenceNumber]); // ตรวจจับค่า location, isPaid, isCancelling


  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10 mb-10">
      <h2 className="text-xl font-semibold text-gray-800">Payment Information</h2>

      <div className="mt-4">

        <div className="flex justify-between items-center">
          <p className="text-gray-600">Payment Method</p>
          <p className="text-gray-800 font-bold">{selectedPaymentMethod}</p> {/* เพิ่มส่วนนี้ */}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-600">Total Payment</p>
          {/* <p className="text-red-500 text-lg font-bold">฿{(totalSummarys)}</p> */}
          ฿{(parseFloat(totalSummarys) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-600">Payment Within</p>
          <p className="text-red-500 text-lg font-bold">
            {formatTime(countdown)} <span className="text-sm text-gray-500">Due on {formatDueDate(currentDate)}</span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <div className="bg-blue-500 text-white py-2 px-4 rounded-t-lg">THAI QR PAYMENT</div>
          <div className="border p-4 flex justify-center">
          {qrCodeUrl ? (
            <div>
              <img className="justify-self-center" src={qrCodeUrl} alt="PromptPay QR Code" />
              {transactionID && <p>Transaction ID: {transactionID}</p>}
            </div>
            
          ) : (
            <p>Loading QR Code...</p>
          )}
          </div>
        </div>
        {/* <div className="mt-6 text-center">
          <div className="bg-blue-500 text-white py-2 px-4 rounded-t-lg">THAI QR PAYMENT</div>
          <div className="border p-4 flex justify-center">
            <QRCodeCanvas value="https://example-payment-link.com" size={180} />
          </div>
        </div> */}

        <div className="mt-6 text-center">
          {/* <p className="text-gray-800 font-semibold">฿{totalSummarys}</p> */}
          ฿{(parseFloat(totalSummarys) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <p className="text-gray-600">บริษัท เก็กโคเพย์ (ประเทศไทย) จำกัด</p>
          <p className="text-gray-600">GEKKOPAY (THAILAND) CO., LTD</p>
          {/* Display the generated reference number */}
          <p className="text-gray-600">Reference no. {referenceNumber}</p>
          {/* <p className="text-gray-600">Reference no. GEK7PGQDDW54</p> */}
        </div>

        <div className="mt-6 text-center">
          {/* Cancel Order Button */}
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </button>
        </div>

      </div>
    </div>
  );
};

// Add PropTypes validation for the props
PaymentInformation.propTypes = {
    selectedPaymentMethod: PropTypes.string.isRequired,
    // totalPrice: PropTypes.number.isRequired
    totalSummary: PropTypes.shape({
        totalPrice: PropTypes.number.isRequired
    }).isRequired
  };

export default PaymentInformation;




 /////// ใช้ได้
  // useEffect(() => {
  //   const fetchTransaction = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}/api/transaction/${transactionID}`);
  //       console.log("fetchTransaction response: ",response);
  //       if (response.data.transactionID) {
  //         // ถ้ามีข้อมูลอยู่แล้ว ใช้ค่าที่มีอยู่
  //         setTransactionID(response.data.transactionID);
  //         setQrCodeUrl(response.data.qrCodeUrl);
  //         console.log("ใช้ Transaction ID เดิม:", response.data.transactionID);
  //       } else {
  //         // ถ้าไม่มี ให้สร้างใหม่
  //         generateNewQRCode();
  //       }
  //     } catch (error) {
  //       console.error("Error fetching transaction data:", error);
  //       generateNewQRCode(); // fallback กรณี API มีปัญหา
  //     }
  //   };
  
  //   const generateNewQRCode = async () => {
  //     const totalSummarys = parseFloat(localStorage.getItem("totalSummarys"));
  //     const promptPayID = "0952517869";
  
  //     try {
  //       // 🔹 สร้าง QR Code PromptPay
  //       const qrData = generatePayload(promptPayID, { amount: totalSummarys });
  
  //       qrcode.toDataURL(qrData, async (err, url) => {
  //         if (!err) {
  //           setQrCodeUrl(url);
  
  //           // 🔹 ส่งข้อมูลไปบันทึกที่ backend
  //           const newTransaction = await axios.post(`${BASE_URL}/api/webhook`, {
  //             promptPayID,
  //             amount: totalSummarys,
  //             referenceNumber,
  //             qrCodeUrl: url, // 🔹 เพิ่มการส่ง URL QR Code ไปเก็บ
  //           });
  
  //           setTransactionID(newTransaction.data.transactionID);
  //           console.log("สร้าง Transaction ID ใหม่:", newTransaction.data.transactionID);
  //         } else {
  //           console.error("Error generating QR code:", err);
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error creating transaction:", error);
  //     }
  //   };
  
  //   fetchTransaction();
  // }, [BASE_URL, transactionID, referenceNumber]);
  
  

  // useEffect(() => {
  //   // const totalSummarys = localStorage.getItem('totalSummarys');
  //   const totalSummarys = parseFloat(localStorage.getItem("totalSummarys")); // แปลงค่าเป็น float
  //   const promptPayID = '0952517869'; // หมายเลขพร้อมเพย์
  //   // const amount = totalSummarys; // จำนวนเงิaน

  //   // สร้างข้อมูล PromptPay QR Code
  //   const qrData = generatePayload(promptPayID, { amount: totalSummarys });
  //   console.log("qrData: ",qrData);

  //   // สร้าง QR Code URL
  //   qrcode.toDataURL(qrData, (err, url) => {
  //     if (!err) {
  //       setQrCodeUrl(url);
  //       // แจ้ง backend เพื่อสร้าง Transaction ID
  //       axios.post(`${BASE_URL}/api/webhook`, { promptPayID, amount: totalSummarys, referenceNumber })
  //         .then(response => {
  //           setTransactionID(response.data.transactionID);
  //           console.log('response.data.transactionID: ', response.data.transactionID);
  //         })
  //         .catch(error => {
  //           console.error('Error creating transaction:', error);
  //         });
  //     }
  //   });
  // }, [BASE_URL, referenceNumber]);


  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:5000"); // เปลี่ยนเป็น URL ของ Backend จริง

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.status === "paid") {
  //       setIsPaid(true);
  //       toast.success("🎉 Payment successful!");
  //     }
  //   };

  //   return () => ws.close();
  // }, []);




    // ดึงค่า transactionID จาก Local Storage
    // const savedTransactionID = localStorage.getItem("transactionID");

    // if (savedTransactionID) {
    //   setTransactionID(savedTransactionID); // ใช้ค่าเดิมที่มีอยู่
    //   console.log("ใช้ transactionID เดิม:", savedTransactionID);
    // } else {
    //   // ถ้าไม่มี transactionID ให้สร้างใหม่
    //   const qrData = generatePayload(promptPayID, { amount: totalSummarys });
  
    //   qrcode.toDataURL(qrData, (err, url) => { 
    //     if (!err) {
    //       setQrCodeUrl(url);

    //       axios.post(`${BASE_URL}/api/webhook`, { promptPayID, amount: totalSummarys })
    //         .then(response => {
    //           console.log("Webhook response:", response.data); // ตรวจสอบค่าที่ API ส่งกลับ
    //           const newTransactionID = response.data.transactionID;
    //           if (newTransactionID) {
    //             setTransactionID(newTransactionID);
    //             localStorage.setItem("transactionID", newTransactionID);
    //             console.log("สร้าง transactionID ใหม่:", newTransactionID);
    //           } else {
    //             console.error("Transaction ID ไม่ถูกต้อง:", response.data);
    //           }
    //         })
    //         .catch(error => {
    //           console.error('Error creating transaction:', error);
    //         });
          
    //       // แจ้ง backend เพื่อสร้าง Transaction ID
    //       // axios.post(`${BASE_URL}/api/webhook`, { promptPayID, amount: totalSummarys })
    //       //   .then(response => {
    //       //     const newTransactionID = response.data.transactionID;
    //       //     setTransactionID(newTransactionID);
    //       //     localStorage.setItem("transactionID", newTransactionID); // บันทึกค่าไว้
    //       //     console.log("สร้าง transactionID ใหม่:", newTransactionID);
    //       //   })
    //       //   .catch(error => {
    //       //     console.error('Error creating transaction:', error);
    //       //   });
    //     }
    //   });
    // }



    //   useEffect(() => {

//     const handleBeforeUnload = (event) => {
//       if (!isPaid) {
//         event.preventDefault();
//         event.returnValue = "";
//       }
//     };

//   const handlePopState = () => {
//     console.log("🔄 Back button pressed!");

//     if (!isPaid) {
//       toast.warn("Has the payment not been made yet?", {
//         position: "top-right",
//         autoClose: 5000,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         onClick: () => navigate("/payment"),
//       });

//       navigate("/payment");
//     }
//   };

//   window.addEventListener("beforeunload", handleBeforeUnload);
//   window.addEventListener("popstate", handlePopState);


//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//     window.removeEventListener("popstate", handlePopState);
    
//   };

// }, [isPaid, navigate]);




 // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (!isPaid) {
  //       event.preventDefault();
  //       event.returnValue = "";
  //     }
  //   };

   
  //   const handleNavigation = (event) => {
  //     if (!isPaid) {
  //       event.preventDefault();
  //       toast.success("Has the payment not been made yet?", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         onClick: () => navigate("/payment"),
  //       });
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("popstate", handleNavigation);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("popstate", handleNavigation);
  //   };
  // }, [isPaid, navigate]);