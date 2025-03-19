import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom"; //useLocation
import PropTypes from "prop-types"; // Import PropTypes for validation
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import jsQR from "jsqr";

const PaymentInformation = ({ selectedPaymentMethod }) => {
  //totalSummary

  const navigate = useNavigate(); // ใช้ useNavigate hook
  const location = useLocation();

  const [orderStatus, setOrderStatus] = useState(null); // ใช้เก็บสถานะของคำสั่งซื้อ
  console.log("orderStatus: ", orderStatus);
  console.log("Swal: ", Swal);
  console.log("orderStatus: ", orderStatus);

  const [countdown, setCountdown] = useState(86400); // ตั้งเวลาเริ่มต้น 24 ชั่วโมง (ในวินาที)
  const [currentDate, setCurrentDate] = useState(new Date()); // Store current date and time
  const { referenceNumber } = useParams(); // ดึง referenceNumber จาก URL path
  // const [referenceNumber, setReferenceNumber] = useState(""); // Store the reference number

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [imagePosition, setImagePosition] = useState(0);

  const [isPaid, setIsPaid] = useState(false);
  console.log("isPaid: ", isPaid);
  // const [cancelledOrder, setCancelledOrder] = useState(false); // เพิ่ม state สำหรับตรวจสอบการยกเลิกคำสั่งซื้อ
  const [isCancelling, setIsCancelling] = useState(false);
  //const promptpay = generatePayload();

  // ดึงข้อมูลจาก localStorages
  const totalSummarys = localStorage.getItem("totalSummarys");
  // const userId = localStorage.getItem('user_id');
  const allIds = localStorage.getItem("allIds");
  const orderId = localStorage.getItem("orderId");
  //const totalSummarys = (localStorage.getItem('totalSummary')) || [];
  console.log("Selected items from localStorage:", totalSummarys);
  console.log("Selected items from localStorage allIds:", allIds);
  console.log("Selected items from localStorage orderId:", orderId);

  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [transactionID, setTransactionID] = useState(""); // เก็บ Transaction ID สำหรับ Webhook
  const [finalAmount, setFinalAmount] = useState(""); // เก็บ Transaction ID สำหรับ Webhook

  const qrCodeUrls = localStorage.getItem("qrCodeUrl");
  const transactionIDs = localStorage.getItem("transactionID");

  console.log("qrCodeUrls localStorage:", qrCodeUrls);
  console.log("transactionIDs localStorage:", transactionIDs);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/transaction/${referenceNumber}`,
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        console.log("response transaction: ", response);

        if (response.data.referenceNumber) {
          //referenceNumber
          setTransactionID(response.data.transactionID); // ใช้ transactionID เดิม referenceNumber
          setFinalAmount(response.data.finalAmount);
          setQrCodeUrl(response.data.qrCodeUrl); // ใช้ QR Code จาก API
          console.log("ใช้ QR Code จาก Database:", response.data.qrCodeUrl);
          console.log("response.Data.finalAmount:", response.data.finalAmount);
          console.log(
            "response.data.qrCodeUrl.length:",
            response.data.qrCodeUrl.length
          );

          console.log(
            "response.data.referenceNumber: ",
            response.data.referenceNumber
          );
        } else {
          // ถ้าไม่มี transactionID เดิม ให้สร้างใหม่
          // console.error("QR Code generation error:", err);
          console.error("Error: referenceNumber is missing or invalid.");
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, [BASE_URL, referenceNumber]);

  // useEffect(() => {
  //   console.log("🔌 Connecting to WebSocket...");
  //   console.log("Reference Number from URL in Connecting:", referenceNumber);

  //   const ws = new WebSocket("ws://localhost:5001");

  //   ws.onopen = () => {
  //     console.log("Reference Number from URL in onopen:", referenceNumber);

  //     console.log("✅ WebSocket connected");

  //   };

  //   ws.onsmessage = (event) => {
  //     console.log("📢 WebSocket message received:", event.data);

  //     try {
  //       const data = JSON.parse(event.data);
  //       console.log("🛠️ Data from WebSocket:", data);
  //       console.log("Received status:", data.status);

  //       if (data.referenceNumber === referenceNumber && data.status === "paid") {
  //         setIsPaid(true);
  //         Swal.fire({
  //           title: "🎉 การชำระเงินสำเร็จ!",
  //           text: "คุณได้ทำการชำระเงินเรียบร้อยแล้ว",
  //           icon: "success",
  //           confirmButtonText: "ตกลง"
  //         }).then(() => {
  //           navigate("/order-summary");
  //         });
  //       }
  //     } catch (error) {
  //       console.error("❌ Error parsing WebSocket message:", error);
  //     }
  //   };

  // })

  // // ระบบการตรวจสอบการชำระเงิน สำเร็จ
  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:5001");

  //   ws.onopen = () => console.log("WebSocket connected");
  //   ws.onerror = (error) => console.error("WebSocket error:", error);
  //   ws.onmessage = (event) => {
  //     console.log("WebSocket message received:", event.data);
  //     const data = JSON.parse(event.data);
  //     if (data.referenceNumber === referenceNumber && data.status === "paid") {
  //       setIsPaid(true);

  //       // ✅ ใช้ SweetAlert2 แทน toast.success()
  //       Swal.fire({
  //         title: "🎉 การชำระเงินสำเร็จ!",
  //         text: "คุณได้ทำการชำระเงินเรียบร้อยแล้ว",
  //         icon: "success",
  //         confirmButtonText: "ตกลง"
  //       }).then(() => {
  //         navigate("/order-summary"); // เปลี่ยนเส้นทางไปหน้าอื่นถ้าต้องการ
  //       });
  //     }
  //   };

  //   return () => {
  //     ws.close();
  //     console.log("WebSocket disconnected");
  //   };
  // }, [referenceNumber, navigate]);

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

  useEffect(() => {
    console.log("Updated QR Code URL:", qrCodeUrl);
    console.log("Updated QR Code Length?:", qrCodeUrl?.length);
    // console.log("Updated QR Code Length:", qrCodeUrl.length);
    // console.log("Updated QR Code Length:",response.data.qrCodeUrl.length);
  }, [qrCodeUrl]);

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
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    // ตรวจสอบสถานะคำสั่งซื้อจากฐานข้อมูล
    const checkOrderStatus = async () => {
      console.log("Checking order status for:", referenceNumber);
      try {
        console.log("Checking order status for:", referenceNumber);
        const response = await axios.get(
          `${BASE_URL}/api/order/status/${referenceNumber}`,
          {
            // referenceNumber
            headers: {
              "Cache-Control": "no-cache",
              //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            },
          }
        ); // API สำหรับเช็คสถานะคำสั่งซื้อ
        console.log("response status: ", response);
        if (response.data.status === "Cancelled") {
          // ถ้าคำสั่งซื้อถูกยกเลิก ให้แสดง popup และเปลี่ยนหน้าไปที่ /cart
          alert("คุณได้ดำเนินรายการแล้ว");
          navigate("/cart");
        } else {
          setOrderStatus(response.data.status); // ถ้าสถานะไม่ใช่ Cancelled ให้บันทึกสถานะ
        }

        if (response.data.status === "Completed") {
          // ถ้าคำสั่งซื้อถูกยกเลิก ให้แสดง popup และเปลี่ยนหน้าไปที่ /cart
          
          alert("คุณได้ดำเนินรายการแล้ว");
          navigate("/cart");
          setIsPaid(true);
        } else {
          setOrderStatus(response.data.status); // ถ้าสถานะไม่ใช่ Cancelled ให้บันทึกสถานะ
        }

        if (response.data.status === "Pendings") {
          // ถ้าคำสั่งซื้อถูกยกเลิก ให้แสดง popup และเปลี่ยนหน้าไปที่ /cart
          alert("คุณได้ดำเนินรายการแล้ว");
          // navigate("/cart");
          navigate("/profile/purchases");
        } else {
          setOrderStatus(response.data.status); // ถ้าสถานะไม่ใช่ Cancelled ให้บันทึกสถานะ
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
        alert("เกิดข้อผิดพลาดในการตรวจสอบสถานะคำสั่งซื้อ");
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

      const response = await axios.post(`${BASE_URL}/api/cancel-order`, {
        // data: { 
        userId, allIds, orderId, referenceNumber
      // },
      });

      console.log("response: ", response);

      if (response.status === 200) {
        // setCancelledOrder(true); // ตั้งค่า cancelledOrder เป็น true เมื่อกด Cancel
        alert("Order has been successfully canceled.");
        // รีเฟรชหน้าหรือเปลี่ยนเส้นทางกลับไปยังหน้าหลัก
        //window.location.reload();
        navigate("/cart");
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel the order. Please try again.");
    } finally {
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
    
  // ถ้าสถานะเป็น Paid แล้วให้ลบ toast เตือน และแสดง toast สำเร็จ
  if (isPaid) {
    if (warningToastId !== null) {
      toast.dismiss(warningToastId);
    }
    toast.success("ท่านได้ดำเนินรายการเรียบร้อยแล้ว", {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedSlip(file);
    }
  };

//   // ตรวจจับการเปลี่ยนแปลงของ response.data.status
// useEffect(() => {
//   if (response.data.status === "Completed") {
//     setIsPaid(true);
//   }
// }, [response.data.status]); // ตรวจจับเฉพาะค่า status ที่เปลี่ยนแปลง

  // const handleUpload = () => {
  //   // Handle the image upload logic here
  //   console.log("Uploading slip:", selectedSlip);
  //   setIsModalOpen(false);
  // };

// ประกาศฟังก์ชัน checkOrderStatus ไว้ข้างบน
const checkOrderStatus = async (referenceNumber) => {
  console.log("Checking order status for:", referenceNumber);
  try {
    const response = await axios.get(
      `${BASE_URL}/api/order/status/${referenceNumber}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    console.log("response status: ", response);
    console.log("response.data.status : ", response.data.status);

    if (response.data.status === "Completed") {
      alert("คุณได้ดำเนินรายการแล้ว");
      navigate("/cart");
    } else {
      setOrderStatus(response.data.status);
    }
  } catch (error) {
    console.error("Error fetching order status:", error);
    alert("เกิดข้อผิดพลาดในการตรวจสอบสถานะคำสั่งซื้อ");
  }
};


  const handleUpload = async (event) => {
    event.preventDefault();

      try {
        const userId = localStorage.getItem("user_id"); // ดึง userId จาก localStorage หรือจาก state
        console.log("userId: ", userId);
  
        const allIds = JSON.parse(localStorage.getItem("allIds")); // แปลง allIds จาก string เป็น array
        console.log("allIds: ", allIds);
        const orderId = JSON.parse(localStorage.getItem("orderId")); // แปลง allIds จาก string เป็น array
        console.log("orderId: ", orderId);
  
        //const allIds = localStorage.getItem('allIds'); // ดึงข้อมูลจาก localStorage

        const payload = {
          userId: userId,
          allIds: JSON.parse(localStorage.getItem("allIds") || "[]"),
          orderId: orderId,
          referenceNumber: referenceNumber, // ต้องแน่ใจว่าไม่ใช่ `undefined`
        };
        
        console.log("Payload to be sent:", payload); // ตรวจสอบก่อนส่ง
  
        const response = await axios.post(`${BASE_URL}/api/order-uploadslip`, payload ,{
          // data: { userId, allIds, orderId, referenceNumber },

        });
  
        console.log("response: ", response);
  
        if (response.status === 200) {
          // setCancelledOrder(true); // ตั้งค่า cancelledOrder เป็น true เมื่อกด Cancel
          alert("Order has been successfully Minus qty.");
          checkOrderStatus(referenceNumber);

          // ตรวจสอบสถานะคำสั่งซื้อจากฐานข้อมูล


          // รีเฟรชหน้าหรือเปลี่ยนเส้นทางกลับไปยังหน้าหลัก
          //window.location.reload();
          // navigate("/cart");
        }
      } catch (error) {
        console.error("Failed to cancel order:", error);
        alert("Failed to cancel the order. Please try again.");
      } finally {
        setIsCancelling(false); // รีเซ็ตค่าเมื่อเสร็จสิ้น
      }
  
    // Show SweetAlert confirmation that the process has started
    Swal.fire({
      title: 'กำลังดำเนินการตรวจสอบ',
      text: 'กรุณารอสักครู่ ขณะนี้กำลังบันทึกรูปภาพ...',
      icon: 'info',
      allowOutsideClick: false,  // Prevent closing until the action is complete
      showConfirmButton: false,  // No confirm button
      didOpen: () => {
        Swal.showLoading();
        // ดีเลย์ 5 วินาที (5000 มิลลิวินาที)
        setTimeout(() => {
          Swal.fire({
            title: 'สำเร็จ!',
            text: 'บันทึกรูปภาพเรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          });
        }, 5000);
      }
    });

    const userId = localStorage.getItem("user_id");
    console.log("userId: ", userId);
    const orderId = localStorage.getItem("orderId");
    console.log("orderId: ", orderId);
  
    const formData = new FormData();
    formData.append('image', selectedSlip); // Add the selected file to the form data
    formData.append('userId', userId); // Add the selected file to the form data
    formData.append('orderId', orderId); // Add the selected file to the form data

    console.log("formData handleUpload: ", formData);

    // ถ้ามีไฟล์ให้แนบ
    // const fileInput = document.querySelector('input[type="file"]');
    // if (fileInput && fileInput.files[0]) {
    //   formData.append("image_profile", fileInput.files[0]);
    // }

  
    try {
      // Send the image to the server for processing
      const response = await axios.post(`${BASE_URL}/api/order/uploadImagess`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("response uploadImagess: ",response);
  
      if (response.status === 200) {
        // Successfully uploaded the image, process the order here
        Swal.fire({
          title: 'อัปโหลดรูปภาพสำเร็จ!',
          text: 'โปรดรอการตรวจสอบทางเราสักครู่',
          icon: 'success',
          showConfirmButton: true,

          didOpen: () => {
            Swal.showLoading();
        
            // หน่วงเวลา 5 วินาที (5000 มิลลิวินาที)
            setTimeout(() => {
              Swal.fire({
                title: 'อัปโหลดรูปภาพสำเร็จ!',
                text: 'โปรดรอการตรวจสอบทางเราสักครู่',
                icon: 'success',
                showConfirmButton: true
              });
            }, 5000);
          }
        });

        console.log("response success: ",response);

        navigate("/profile/purchases"); // เปลี่ยนเส้นทางไปหน้าอื่นถ้าต้องการ
        
      }
    } catch (error) {
      // If there's an error, show an error message
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถบันทึกรูปภาพได้ กรุณาลองใหม่อีกครั้ง',
        icon: 'error',
        showConfirmButton: true
      });
      console.error('Image upload error:', error);
    }
  };
  
  

  // const verifyPayment = async (qrData, orderReference) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/verify-payment`, {
  //       qrData,
  //       referenceNumber: orderReference,
  //     });
  
  //     if (response.data.success) {
  //       toast.success("🎉 Payment verified successfully!");
  //       setIsPaid(true);
  //     } else {
  //       toast.error("❌ Payment verification failed!");
  //     }
  //   } catch (error) {
  //     console.error("Error verifying payment:", error);
  //     toast.error("เกิดข้อผิดพลาดในการตรวจสอบการชำระเงิน");
  //   }
  // };
  

  useEffect(() => {
    const handleScroll = () => {
      setImagePosition(window.scrollY); // ปรับค่าตำแหน่งตามการ scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10 mb-10">
      <h2 className="text-xl font-semibold text-gray-800">
        Payment Information
      </h2>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Payment Method</p>
          <p className="text-gray-800 font-bold">{selectedPaymentMethod}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-600">Total Payment</p>฿
          {(parseFloat(finalAmount) || 0)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-600">Payment Within</p>
          <p className="text-red-500 text-lg font-bold">
            {formatTime(countdown)}{" "}
            <span className="text-sm text-gray-500">
              Due on {formatDueDate(currentDate)}
            </span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <div className="bg-blue-500 text-white py-2 px-4 rounded-t-lg">
            THAI QR PAYMENT
          </div>
          <div className="border p-4 flex justify-center">
            {qrCodeUrl || qrCodeUrls ? (
              <div>
                <img
                  className="justify-self-center"
                  src={qrCodeUrl || qrCodeUrls}
                  alt="PromptPay QR Code"
                />
                {transactionID && <p>Transaction ID: {transactionID}</p>}
              </div>
            ) : (
              <p>Loading QR Code...</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          ฿
          {(parseFloat(finalAmount) || 0)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <p className="text-gray-600">บริษัท เก็กโคเพย์ (ประเทศไทย) จำกัด</p>
          <p className="text-gray-600">GEKKOPAY (THAILAND) CO., LTD</p>
          <p className="text-gray-600">Reference no. {referenceNumber}</p>
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

        {/* Upload Slip Section */}
        <div className="mt-4 text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fas fa-upload"></i> Upload Slip
          </button>
        </div>

        {/* Popup Modal for Uploading Slip */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div>
              {/* <h3 className="text-xl text-gray-600/100 dark:text-gray-400/100 font-semibold mb-4">Upload Payment Slip</h3> */}
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div
                  className="imagescroll relative bg-gray-100 text-white p-6 rounded-2xl shadow-lg w-96 relative"
                  style={{
                    transform: `translateY(${imagePosition}px)`,
                    marginBottom: "650px",
                  }}
                >
                  <h3 className="text-lg text-gray-600/100 dark:text-gray-400/100 font-semibold text-center mb-4">
                    อัปโหลดสลิป
                  </h3>
                  <label className="border-2 border-dashed border-gray-500 p-6 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-blue-500 transition">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16V4m0 0L8 8m4-4l4 4m-6 4h8a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2h2"
                        />
                      </svg>
                      <p className="text-sm  text-gray-600/100 dark:text-gray-400/100 mt-2">
                        ลากไฟล์ของคุณที่นี่ หรือคลิกเลือก
                      </p>
                    </div>
                  </label>

                  {selectedSlip && (
                    <p className="text-sm text-gray-400 mt-2 text-center">
                      ไฟล์ที่เลือก: {selectedSlip.name}
                    </p>
                  )}

                  <div className="flex justify-between mt-6">
                    <button
                      className={`px-4 py-2 rounded-lg w-1/2 ${
                        selectedSlip
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-600 cursor-not-allowed"
                      }`}
                      onClick={handleUpload}
                      disabled={!selectedSlip}
                    >
                      ยืนยัน
                    </button>
                    <button
                      className="bg-gray-700 px-4 py-2 rounded-lg w-1/2 ml-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add PropTypes validation for the props
PaymentInformation.propTypes = {
  selectedPaymentMethod: PropTypes.string.isRequired,
  // totalPrice: PropTypes.number.isRequired
  totalSummary: PropTypes.shape({
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default PaymentInformation;






// const handleUpload = async (event) => {
//   event.preventDefault();

//   if (!selectedSlip) {
//     Swal.fire("กรุณาเลือกไฟล์!", "คุณต้องแนบ QR Code ก่อนกดอัปโหลด", "warning");
//     return;
//   }

  // const reader = new FileReader();
  // reader.readAsArrayBuffer(selectedSlip);
  // reader.onload = async () => {
  //   const image = new Image();
  //   image.src = URL.createObjectURL(selectedSlip);

  //   image.onload = async () => {
  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");
  //     canvas.width = image.width;
  //     canvas.height = image.height;
  //     ctx.drawImage(image, 0, 0, image.width, image.height);

  //     const qrImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //     console.log("QR Image Data:", qrImageData);

  //     const qrCodeResult = jsQR(qrImageData.data, canvas.width, canvas.height);
  //     console.log("QR Image Data:", qrCodeResult);

  //     if (qrCodeResult) {
  //       console.log("QR Code detected:", qrCodeResult.data);

  //       try {

  //         const qrData = JSON.parse(qrCodeResult.data);
  //         console.log("Decoded QR Data:", qrData);

  //         // ตรวจสอบราคาตรงกันไหม
  //         if (qrData.amount !== parseFloat(finalAmount)) {
  //           Swal.fire("❌ ราคาผิดพลาด!", "QR Code ที่แนบมาไม่ตรงกับราคาของคุณ", "error");
  //           return;
  //         }

  //         // ตรวจสอบวันเวลา
  //         const qrDate = new Date(qrData.timestamp);
  //         const currentTime = new Date();
  //         const timeDiff = Math.abs(currentTime - qrDate) / 1000; // คำนวณเวลาห่างเป็นวินาที

  //         if (timeDiff > 86400) {
  //           Swal.fire("⏳ QR Code หมดอายุ!", "QR Code ที่แนบมาหมดอายุแล้ว", "warning");
  //           return;
  //         }

  //         // ถ้าข้อมูลถูกต้อง
  //         Swal.fire("✅ การชำระเงินสำเร็จ!", "QR Code ถูกต้อง ระบบจะบันทึกการชำระเงิน", "success");

  //         // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่ออัปเดตสถานะ
  //         await axios.post(`${BASE_URL}/api/confirm-payment`, { referenceNumber });

  //         setIsPaid(true);
  //         navigate("/order-summary");
  //       } catch (error) {
  //         Swal.fire("❌ QR Code ไม่ถูกต้อง!", "ไม่สามารถอ่าน QR Code นี้ได้", "error");
  //       }
  //     } else {
  //       Swal.fire("❌ ไม่พบ QR Code!", "กรุณาอัปโหลดภาพที่มี QR Code ที่ถูกต้อง", "error");
  //     }
  //   };
  // };
// };



// return (
//   <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10 mb-10">
//     <h2 className="text-xl font-semibold text-gray-800">Payment Information</h2>

//     <div className="mt-4">

//       <div className="flex justify-between items-center">
//         <p className="text-gray-600">Payment Method</p>
//         <p className="text-gray-800 font-bold">{selectedPaymentMethod}</p> {/* เพิ่มส่วนนี้ */}
//       </div>

//       <div className="flex justify-between items-center">
//         <p className="text-gray-600">Total Payment</p>
//         {/* <p className="text-red-500 text-lg font-bold">฿{(totalSummarys)}</p> */}
//         ฿{(parseFloat(finalAmount) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//         {/* ฿{(parseFloat(totalSummarys) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
//       </div>

//       <div className="flex justify-between items-center mt-2">
//         <p className="text-gray-600">Payment Within</p>
//         <p className="text-red-500 text-lg font-bold">
//           {formatTime(countdown)} <span className="text-sm text-gray-500">Due on {formatDueDate(currentDate)}</span>
//         </p>
//       </div>

//       <div className="mt-6 text-center">
//         <div className="bg-blue-500 text-white py-2 px-4 rounded-t-lg">THAI QR PAYMENT</div>
//         <div className="border p-4 flex justify-center">
//         {qrCodeUrl || qrCodeUrls ? (
//         // {qrCodeUrl ? (
//           <div>
//             <img className="justify-self-center" src={qrCodeUrl || qrCodeUrls} alt="PromptPay QR Code" /> {/* qrCodeUrl */}
//             {transactionID && <p>Transaction ID: {transactionID || transactionIDs}</p>}
//           </div>

//         ) : (
//           <p>Loading QR Code...</p>
//         )}
//         </div>
//       </div>

//       <div className="mt-6 text-center">
//         {/* <p className="text-gray-800 font-semibold">฿{totalSummarys}</p> */}
//         ฿{(parseFloat(finalAmount) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//         {/* ฿{(parseFloat(totalSummarys) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
//         <p className="text-gray-600">บริษัท เก็กโคเพย์ (ประเทศไทย) จำกัด</p>
//         <p className="text-gray-600">GEKKOPAY (THAILAND) CO., LTD</p>
//         {/* Display the generated reference number */}
//         <p className="text-gray-600">Reference no. {referenceNumber}</p>
//         {/* <p className="text-gray-600">Reference no. GEK7PGQDDW54</p> */}
//       </div>

//       <div className="mt-6 text-center">
//         {/* Cancel Order Button */}
//         <button
//           className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
//           onClick={handleCancelOrder}
//         >
//           Cancel Order
//         </button>
//       </div>

//     </div>
//   </div>
// );
