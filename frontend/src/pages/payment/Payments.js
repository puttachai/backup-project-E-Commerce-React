// import React from "react";
//import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; //useSelector
import emptyCart from "../../assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)
import { Link, useNavigate } from "react-router-dom"; // Import Link for routing , useNavigate
import { motion } from "framer-motion"; // Import motion for animation
import axios from "axios";

import qrcode from 'qrcode';
import generatePayload from 'promptpay-qr'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Payments = () => {
  //const location = useLocation();

  const navigate = useNavigate();

  // ดึงข้อมูลจาก localStorage
  const selectedItemslocalStorage = JSON.parse(localStorage.getItem('selectedItems')) || [];
  console.log("Selected items from localStorage:", selectedItemslocalStorage);

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [transactionID, setTransactionID] = useState(''); // เก็บ Transaction ID สำหรับ Webhook

  // const specificItem = selectedItemslocalStorage.find(item => item.id);
  const allIds = selectedItemslocalStorage.map(item => ({
    id: item.id,
    // is_selected: item.is_selected,
    productName: item.productName,
    price: item.price,
    quantity: item.quantity,
    // image: item.image,
    // addedAt: item.addedAt
    }));
  console.log("Specific item with allIds:", allIds);

  // const selectedItems = location.state?.selectedItemss || []; // ดึงข้อมูลสินค้าที่เลือกจาก Cart
  // console.log("selectedItems: ",selectedItems);

  const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login
  const userId = localStorage.getItem("user_id"); // หรือจากที่ไหนก็ได้ที่เก็บ user_id

  const [platformData, setPlatformData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  //const [quantity_idItems, setQuantity_idItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMethod, setSelectedMethod] = useState(""); // Default payment method
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState(""); // เก็บค่าที่เลือกใน Radio Button


  
  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const responsee = await fetch(`${BASE_URL}/api/platform`, {
          headers: {
          'Cache-Control': 'no-cache',// ห้ามแคช
          },
        });

        console.log("Show Respones:", responsee);
        if (responsee.ok) {
          const data = await responsee.json();
          setPlatformData(data.platforms); // Ensure platforms is an array
          console.log("Show is data Platform: ",data.platform);
          console.log("Show is data: ",data);
        } else {
          console.error("Failed to fetch platform data");
        }
      } catch (error) {
        console.error("Error fetching platform data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatformData();
  }, []);


  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/selected-cart-items`, {
          headers: {
            'Cache-Control': 'no-cache',// ห้ามแคช
            },
        });
        setSelectedItems(response.data);
        console.log("แสดงข้อมูล selected-cart-items:", response);
        console.log("แสดงข้อมูลใน response.data:", response.data);

        console.log("Show Respones selected-cart-items:", response);
        if (response.status === 200) {
          //const data = await response.json();
          setSelectedItems(response.data);
          console.log("Show Respones selected-cart-items:", response);
          console.log("Show is response.data: ", response.data);
          //console.log("Show is data: ", data);
        } else {
          console.error("Failed to fetch selected-cart-items data");
        }

      } catch (error) {
        console.error('Error fetching selected items:', error);
      }
    };

    fetchSelectedItems();
  }, []);


  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/selected-productt_quantity_id`, {
          params: { userId },
          headers: {
            'Cache-Control': 'no-cache',// ห้ามแคช
            },
        });

        // ดึงข้อมูลเฉพาะ products จาก response
        const products = response.data;

        // ตรวจสอบว่า products เป็น array หรือไม่
        // if (Array.isArray(products)) {
        //   setQuantity_idItems(products);
        // } else {
        //   console.error('Products is not an array:', products);
        //   setQuantity_idItems([]); // กำหนดเป็น array ว่างเพื่อป้องกัน error
        // }

        console.log("แสดงข้อมูล products:", products);

      } catch (error) {
        console.error('Error fetching selected items:', error);
      }
    };

    fetchSelectedItems();
  }, [userId]);

  // const handleConfirmAndPay = () => {

  //   localStorage.setItem('totalSummarys', totalSummary.totalPrice);
  //   //const allIdsObject = { id1: 'value1', id2: 'value2' }; // ตัวอย่างข้อมูล
  //   localStorage.setItem('allIds', JSON.stringify(allIds)); // แปลงและเก็บข้อมูลใน localStorage

  //   //localStorage.setItem('allIds', allIds);

  //   console.log("Selected items saved in localStorage:", totalSummary.totalPrice);
    
  //   if (selectedPaymentMethod === "QR PromptPay") {
  //     navigate("/paymentInfo", { state: { method: "QR PromptPay", totalPrice: totalSummary.totalPrice } }); // ส่งค่า totalPrice ไป
  //   }
  // };

  const updateProductStock = async (items) => {
    console.log("Updating stock for items:", items); // ตรวจสอบค่าก่อนอัปเดต
    try {
      const response = await axios.post(`${BASE_URL}/api/update-stock`, {
        items,
        headers: {
          'Cache-Control': 'no-cache',
          //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }   
      });
      // console.log("Stock updated successfully:", response.data.updatedStocks);
      console.log("Stock updated successfully:", response);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };
  

  const handleConfirmAndPay = async() => {

    const userId = localStorage.getItem("user_id"); // ดึง userId จาก localStorage หรือจาก state
    console.log("userId: ", userId);
    
    // const allIds = JSON.parse(localStorage.getItem("allIds")); // แปลง allIds จาก string เป็น array
    // console.log("allIds: ", allIds);
    const generateReferenceNumber = () => {
      const timestamp = new Date().getTime(); // เวลาปัจจุบันใน milliseconds
      return `GEK${timestamp.toString(36).toUpperCase()}`; // แปลง timestamp เป็น base36 และ uppercase
    };

    const referenceNumber = generateReferenceNumber(); // สร้าง referenceNumber
    console.log("Generated Reference Number:", referenceNumber);

    const generateQrCodeUrl = () => {

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
          console.log("url: ", url);
          console.log("newTransaction: ", newTransaction);
          setTransactionID(newTransaction.data.transactionID);

          localStorage.setItem('qrCodeUrl', qrCodeUrl);
          localStorage.setItem('transactionID', transactionID);

          // setQrCodeUrl(response.data.qrCodeUrl); // ใช้ QR Code เดิม
        } else {
          console.error("QR Code generation error:", err);
        }
      });

      console.log("transaction referenceNumber: ", referenceNumber);
    }

    
    const allIds = selectedItemslocalStorage.map(item => ({
      id: item.id,
      // is_selected: item.is_selected,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      // image: item.image,
      // addedAt: item.addedAt
      }));
    console.log("Specific item with allIds:", allIds);

    try {
      //const allIds = localStorage.getItem('allIds'); // ดึงข้อมูลจาก localStorage

      const response = await axios.post(`${BASE_URL}/api/neworder`, {//neworder
        //  data: { userId, allIds } 
          // userId, // 
          // allIds,
          // product_id, // ส่งค่า productId
          // quantity,
          // product_id,
          userId,  // รหัสผู้ใช้
          referenceNumber,
          items: allIds,  // ส่งอาร์เรย์ของสินค้า
          headers: {
            'Cache-Control': 'no-cache',// ห้ามแคช
          }     
        });

      console.log("response: ", response);
  
      if (response.status === 200) {
        alert("Order has been successfully canceled.");
        
          // localStorage.setItem('totalSummarys', totalSummary.totalPrice);
          localStorage.setItem('totalSummarys', getTotal());
          //const allIdsObject = { id1: 'value1', id2: 'value2' }; // ตัวอย่างข้อมูล
          localStorage.setItem('allIds', JSON.stringify(allIds)); // แปลงและเก็บข้อมูลใน localStorage
          localStorage.setItem('orderId', response.data.orderId);
          //localStorage.setItem('allIds', allIds);
          console.log("localStorage allIds: ",localStorage.getItem("allIds"));

          // console.log("Selected items saved in localStorage:", totalSummary.totalPrice);  
          console.log("Selected items saved in localStorage:", getTotal);  

          generateQrCodeUrl();

          // 📌 เรียก API อัปเดตสต็อกสินค้า
          updateProductStock(allIds);

        if (selectedPaymentMethod === "QR PromptPay") {
          navigate(`/paymentInfo/${referenceNumber}`, { state: { method: "QR PromptPay", totalPrice: totalSummary.totalPrice } }); // ส่งค่า totalPrice ไป
          // "/paymentInfo"
        }
        // รีเฟรชหน้าหรือเปลี่ยนเส้นทางกลับไปยังหน้าหลัก
        //window.location.reload();
        // navigate('/cart');
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };


  const handleRemoveSelectCart = async () => {
    try {
      const userId = localStorage.getItem("user_id"); // ดึง userId จาก localStorage หรือจาก state
      console.log("userId: ", userId);
      
      const allIds = JSON.parse(localStorage.getItem("allIds")); // แปลง allIds จาก string เป็น array
      console.log("allIds: ", allIds);

      //const allIds = localStorage.getItem('allIds'); // ดึงข้อมูลจาก localStorage

      // const response = await axios.post(`${BASE_URL}/api/remove-cart`, { data: { userId, allIds } });
      const response = await axios.post(`${BASE_URL}/api/remove-cart`, { userId, allIds });

      console.log("response: ", response);
  
      if (response.status === 200) {
        alert("Remove items product in cart successfully!");
        // รีเฟรชหน้าหรือเปลี่ยนเส้นทางกลับไปยังหน้าหลัก
        //window.location.reload();
        // navigate('/cart');
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };  


  const totalSummary = selectedItemslocalStorage.reduce(
    (acc, item) => {
      acc.totalQuantity += item.quantity; // รวมจำนวนสินค้า
      acc.totalPrice += item.price * item.quantity; // รวมราคาสินค้า
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 } // ค่าเริ่มต้น
  );
  
  const getTotal = () => {
    const subtotal = Number(totalSummary.totalPrice);
    console.log("subtotal: ",subtotal);
    const tax = subtotal * 0.07; // สมมติว่า VAT 7%
    console.log("tax: ",tax);
    return subtotal + tax;
  };

  console.log("getTotal:",getTotal());


  // quantity_idItems
  //if (quantity_idItems.length) return <p>No cart items found.</p>;

  if (!selectedItems.length) return <p>No cart items found.</p>;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 font-medium">Loading platforms...</p>
      </div>
    );
  }

  return(

      <div className="bg-gray-100">
            <div className="container mx-auto py-8 px-4">
              {isLoggedIn ? (
                platformData.map((platform) => (
                  <div key={platform.id}>
                    {/* Header */}
                    <header className="mb-2">
                      <div className="flex items-center justify-between">
                        <img
                          src={platform.logo ? `${BASE_URL}/images/platform/${platform.logo}` : "/default-logo.png"}
                          alt="Platform Logo"
                          className="w-24"
                        />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#092fc4] via-[#216ad9] to-[#38a4ee] text-transparent bg-clip-text">Payment</h1>
                      </div>
                    </header>
        
                    {/* Delivery Address Section */}
                    <section className="mb-6 bg-white p-4 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold text-red-500">Delivery Address</h2>
                      <p className="mt-2 text-gray-700">
                        <strong>{platform.deliveryName}</strong> (+66) {platform.deliveryPhone}
                      </p>
                      <p className="text-gray-600">{platform.deliveryAddress}</p>
                      <button className="text-blue-500 font-medium hover:underline mt-2">Change</button>
                    </section>
        
                    {/* Products Ordered Section */}
                    <section className="mb-6 bg-white p-4 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold">Products Ordered</h2>
                      {/* {platform.products.map((product) => ( */}
                      {selectedItemslocalStorage.map((productt) => (
                        <div key={productt.cart_id} className="flex items-center gap-4 mt-4 border-b pb-4">
                          <img
                            src={`${BASE_URL}/images/product/${productt.image}`}
                            alt={productt.productName}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-gray-800 font-semibold">{productt.productName}</p>
                            {/* <p className="text-sm text-gray-600">Variation: {product.variation}</p> */}
                            <p className="text-sm text-red-500 font-medium mt-1">฿{(productt.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                          </div>
                          <div className="ml-auto">
                            <p>
                              Amount: <strong>{productt.quantity}</strong>
                            </p>
                            <p className="font-semibold">฿{(productt.price * productt.quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                          </div>
                        </div>
                      ))}
                      {/* {selectedItems.map((productt) => (
                        <div key={productt.cart_id} className="flex items-center gap-4 mt-4 border-b pb-4">
                          <img
                            src={`${BASE_URL}/images/product/${productt.image}`}
                            alt={productt.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-gray-800 font-semibold">{productt.name}</p>
                            {/* <p className="text-sm text-gray-600">Variation: {product.variation}</p> 
                            <p className="text-sm text-red-500 font-medium mt-1">฿{productt.price}</p>
                          </div>
                          <div className="ml-auto">
                            <p>
                              Amount: <strong>{productt.quantity_id}</strong>
                            </p>
                            <p className="font-semibold">฿{productt.price * productt.quantity_id}</p>
                          </div>
                        </div>
                      ))} */}
                      <>
                            {platformData.map((platform) => (
                              <div key={platform.id}>
                                 {/* แสดงข้อมูลสรุป */}
                                  <div className="flex justify-between mt-6">
                                    <h2 className="text-lg font-semibold">
                                      Order Total ({totalSummary.totalQuantity} Items):
                                    </h2>
                                    <p className="text-lg font-semibold"> {/* className="text-red-500 text-xl font-bold" */}
                                      ฿{(totalSummary.totalPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </p>
                                  </div>
                                  <h2 className="flex text-lg font-semibold justify-between">
                                   VAT (7%):
                                   <p className="text-red-500 text-xl font-bold">
                                      ฿{(getTotal()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      </p>
                                    </h2>
                                    {/* <p className="flex text-red-500 text-xl font-bold justify-between">
                                      ฿{(totalSummary.totalPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      <p className="text-red-500 text-xl font-bold ">
                                      ฿{(getTotal()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      </p>
                                    </p> */}
                                    
                              </div>
                            ))}
                            
                      </>
                      {/* <>
                        {platformData.map((platform) => (
                          <div key={platform.id}>
                            {selectedItems.map((productr) => (
                              <div key={productr.cart_id} className="flex justify-between mt-6">
                                <h2 className="text-lg font-semibold">
                                  Order Total ({productr.quantity_id} Items):
                                </h2>
                                <p className="text-red-500 text-xl font-bold">
                                  ฿{productr.price * productr.quantity_id}
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </> */}
                    </section>
                  </div>
                ))
              ) : (
                // When user is not logged in
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
                >
                  <div>
                    <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="emptyCart" />
                  </div>
                  <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                    <h1 className="font-titleFont text-xl font-bold uppercase">
                      You need to log in to access your cart.
                    </h1>
                    <Link to="/signin">
                      <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                        Log In
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}

              {isLoggedIn ? (
                    <div className="">
                    <section className="mt-6 bg-white p-4 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold">Payment Method</h2>
                      <div className="mt-4">
                        {/* Payment Method Tabs */}
                        <div className="flex border-b">
                          {["GekkoPay", "QR PromptPay", "Cash on Delivery", "Credit / Debit Card"].map((method, index) => (
                            <button
                              key={index}
                              className={`px-4 py-2 text-sm font-medium ${
                                selectedMethod === method ? "border-red-500 text-red-500" : "border-transparent text-gray-500"
                              } border-b-2 focus:outline-none`}
                              onClick={() => setSelectedMethod(method)}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
              
                        {/* Payment Method Content */}
                        <div className="mt-4">
                          {selectedMethod === "GekkoPay" && (
                            <div>
                              <label className="flex items-center gap-4">
                                <input
                                  type="radio"
                                  name="GekkoPay"
                                  className="form-radio"
                                  value="ShopeePay Balance"
                                  checked={selectedPaymentMethod === "GekkoPay Balance"}
                                  onChange={(e) => setselectedPaymentMethod(e.target.value)}
                                />
                                <span>GekkoPay Balance (฿0.00)</span>
                              </label>
                              <label className="flex items-center gap-4 mt-2">
                                <input
                                  type="radio"
                                  name="GekkoPay"
                                  className="form-radio"
                                  value="Krungthai Bank"
                                  checked={selectedPaymentMethod === "Krungthai Bank"}
                                  onChange={(e) => setselectedPaymentMethod(e.target.value)}
                                />
                                <span>Krungthai Bank</span> {/*(฿84,423)*/}
                              </label>
                            </div>
                          )}
                          {selectedMethod === "QR PromptPay" && (
                            <div>
                              <label className="flex items-center gap-4 mt-2">
                                <input
                                  type="radio"
                                  name="QR PromptPay"
                                  className="form-radio"
                                  value="QR PromptPay"
                                  checked={selectedPaymentMethod === "QR PromptPay"}
                                  onChange={(e) => setselectedPaymentMethod(e.target.value)}
                                />
                                <span>QR PromptPay</span>
                              </label>
                            </div>
                          )}
                          {selectedMethod === "Cash on Delivery" && (
                            <p className="text-gray-600">You will pay upon receiving the order.</p>
                          )}
                          {selectedMethod === "Credit / Debit Card" && (
                            <p className="text-gray-600">Please add your card details to proceed.</p>
                          )}
                        </div>
                      </div>
                    </section>
              
                    {/* Submit Button */}
                    <div className="text-right">
                      <button
                        className="bg-red-500 text-white px-6 mt-2 py-3 rounded-lg font-semibold hover:bg-red-600"
                        // onClick={() => {handleConfirmAndPay()} } //console.log("Selected Radio:", selectedPaymentMethod)
                        onClick={() => {
                          handleConfirmAndPay();
                          handleRemoveSelectCart();
                        }}
                      >
                        Confirm and Pay
                      </button>
                    </div>
                  </div>

              ) : null} {/* หรือสามารถใช้ null แทนส่วนนี้ได้ */}

            </div>
          </div>
  );


};

export default Payments;

  // return (
  //   <div className="p-6">
  //     <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
  //     <div>
  //       {selectedItems.length > 0 ? (
  //         selectedItems.map((item) => (
  //           <div key={item.id} className="flex items-center justify-between p-4 border-b-2">
  //             <img src={item.image} alt={item.productName} className="w-20 h-20" />
  //             <div>
  //               <h3>{item.productName}</h3>
  //               <p>Price: ${item.price}</p>
  //               <p>Quantity: {item.quantity}</p>
  //               <p>Total: ${item.price * item.quantity}</p>
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <p>No items selected.</p>
  //       )}
  //     </div>
  //   </div>
  // );


//////////////// laster 06/01/2568 /////////////////
// {platformData.map((platform) => (
//   <div key={platform.id}>
//     {/* Header */}
//     <header className="mb-2">
//       <div className="flex items-center justify-between">
//         <img
//           src={platform.logo ? `${BASE_URL}/images/platform/${platform.logo}` : "/default-logo.png"}
//           alt="Platform Logo"
//           className="w-24"
//         />
//         <h1 className="text-2xl font-bold bg-gradient-to-r from-[#092fc4] via-[#216ad9] to-[#38a4ee] text-transparent bg-clip-text">Payment</h1> {/* {platform.name || "Payment"} */}
//       </div>
//     </header>

//     {/* Delivery Address Section */}
//     <section className="mb-6 bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-lg font-semibold text-red-500">Delivery Address</h2>
//       <p className="mt-2 text-gray-700">
//         <strong>{platform.deliveryName}</strong> (+66) {platform.deliveryPhone}
//       </p>
//       <p className="text-gray-600">{platform.deliveryAddress}</p>
//       <button className="text-blue-500 font-medium hover:underline mt-2">Change</button>
//     </section>

//     {/* Products Ordered Section */}
//     <section className="mb-6 bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-lg font-semibold">Products Ordered</h2>
//       {platform.products.map((product) => (
//         <div key={product.id} className="flex items-center gap-4 mt-4 border-b pb-4">
//           <img
//             src={`${BASE_URL}/images/product/${product.image}`}
//             alt={product.name}
//             className="w-20 h-20 object-cover rounded-lg"
//           />
//           <div>
//             <p className="text-gray-800 font-semibold">{product.name}</p>
//             <p className="text-sm text-gray-600">Variation: {product.variation}</p>
//             <p className="text-sm text-red-500 font-medium mt-1">฿{product.price}</p>
//           </div>
//           <div className="ml-auto">
//             <p>
//               Amount: <strong>{product.quantity}</strong>
//             </p>
//             <p className="font-semibold">฿{product.price * product.quantity}</p>
//           </div>
//         </div>
//       ))}
//     {/* </section> */}

//     {/* Order Summary Section */}
//     {/* <section className="mb-6 bg-white p-4 rounded-lg shadow-md"> */}
//       <div className="flex justify-between mt-6">
//         <h2 className="text-lg font-semibold">
//           Order Total ({platform.totalItems} Items):
//         </h2>
//         <p className="text-red-500 text-xl font-bold">฿{platform.totalPrice}</p>
//       </div>
//     </section>
//   </div>
// ))}

// {/* Payment Method Section */}
//   <section className="mt-6 bg-white p-4 rounded-lg shadow-md">
//     <h2 className="text-lg font-semibold">Payment Method</h2>
//     <div className="mt-4">
//       {/* Payment Method Tabs */}
//       <div className="flex border-b">
//         {["ShopeePay", "QR PromptPay", "Cash on Delivery", "Credit / Debit Card"].map((method, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 text-sm font-medium ${
//               selectedMethod === method ? "border-red-500 text-red-500" : "border-transparent text-gray-500"
//             } border-b-2 focus:outline-none`}
//             onClick={() => setSelectedMethod(method)}
//           >
//             {method}
//           </button>
//         ))}
//       </div>

//       {/* Payment Method Content */}
//       <div className="mt-4">
//         {selectedMethod === "ShopeePay" && (
//           <div>
//             <label className="flex items-center gap-4">
//               <input type="radio" name="shopeePay" className="form-radio" value="ShopeePay Balance" />
//               <span>ShopeePay Balance (฿80.00)</span>
//             </label>
//             <label className="flex items-center gap-4 mt-2">
//               <input type="radio" name="Krungthai Bank" className="form-radio" value="Krungthai Bank" />
//               <span>Krungthai Bank (฿84,423)</span>
//             </label>
//           </div>
//         )}
//         {selectedMethod === "QR PromptPay" && ( 
//         // <p className="text-gray-600">QR PromptPay will be available for payment.</p>
//         <div>
//           <label className="flex items-center gap-4 mt-2">
//             <input type="radio" name="QR PromptPay" className="form-radio" value="QR PromptPay" />
//             <span>QR PromptPay</span>
//           </label>
//         </div>
//         )}
//         {selectedMethod === "Cash on Delivery" && (
//           <p className="text-gray-600">You will pay upon receiving the order.</p>
//         )}
//         {selectedMethod === "Credit / Debit Card" && (
//           <p className="text-gray-600">Please add your card details to proceed.</p>
//         )}
//       </div>
//     </div>
//   </section>


// {/* Submit Button */}
// <div className="text-right">
//   <button className="bg-red-500 text-white px-6 mt-2 py-3 rounded-lg font-semibold hover:bg-red-600">
//     Confirm and Pay
//   </button>
// </div>









// import React, { useState, useEffect } from "react";
// //import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// function PlatformPage() {
//   //const [platformData, setPlatformData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

//   const [platformData, setPlatformData] = useState([]);
//   //const isLoggedIn = useSelector((state) => state.loginStatus);

//   useEffect(() => {
//     const fetchPlatformData = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/platform`);
//         if (response.ok) {
//           const data = await response.json();
//           setPlatformData(data.platforms);
//           //setLoading(false);
//         } else {
//           console.error("Failed to fetch platform data");
//         }
//       } catch (error) {
//         console.error("Error fetching platform data:", error);
//         // setError("Failed to load platform data.");
//         // setLoading(false);
//       }
//     };

//     fetchPlatformData();
//   }, []);

//   // กรณีที่กำลังโหลดหรือเกิดข้อผิดพลาด
// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>{error}</p>;

//   if (platformData.length) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600 font-medium">Loading platforms...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100">
//       <div className="container mx-auto py-8 px-4">
//         {/* Header */}
        
//         <header className="mb-8">
//         {platformData.map((platform, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <img
//               src={platform.logo || "/default-logo.png"}
//               alt="Platform Logo"
//               className="w-24"
//             />
//             <img className="h-full w-full object-cover" src={`${BASE_URL}/images/platform/${platform.logo}`}/>
//             <h1 className="text-2xl font-bold">{platform.name || "Checkout"}</h1>
//           </div>
//         ))}
//         </header>

//         {/* Delivery Address Section */}
//         <section className="mb-6 bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold text-red-500">Delivery Address</h2>
//           <p className="mt-2 text-gray-700">
//             <strong>{platformData.deliveryName}</strong> (+66) {platformData.deliveryPhone}
//           </p>
//           <p className="text-gray-600">{platformData.deliveryAddress}</p>
//           <button className="text-blue-500 font-medium hover:underline mt-2">Change</button>
//         </section>

//         {/* Products Ordered Section */}
//         <section className="mb-6 bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">Products Ordered</h2>

//           {platformData.map((product, index) => (
//             <div key={index} className="flex items-center gap-4 mt-4 border-b pb-4">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-20 h-20 object-cover rounded-lg"
//               />
//               <div>
//                 <p className="text-gray-800 font-semibold">{product.name}</p>
//                 <p className="text-sm text-gray-600">Variation: {product.variation}</p>
//                 <p className="text-sm text-red-500 font-medium mt-1">฿{product.price}</p>
//               </div>
//               <div className="ml-auto">
//                 <p>
//                   Amount: <strong>{product.quantity}</strong>
//                 </p>
//                 <p className="font-semibold">฿{product.price * product.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* Order Summary Section */}
//         <section className="mb-6 bg-white p-4 rounded-lg shadow-md">
//           <div className="flex justify-between">
//             <h2 className="text-lg font-semibold">
//               Order Total ({platformData.totalItems} Items):
//             </h2>
//             <p className="text-red-500 text-xl font-bold">฿{platformData.totalPrice}</p>
//           </div>
//         </section>

//         {/* Submit Button */}
//         <div className="text-right">
//           <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600">
//             Confirm and Pay
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PlatformPage;
