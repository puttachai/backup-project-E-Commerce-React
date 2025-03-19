import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux"; //useSelector
import { Link } from "react-router-dom"; // Import Link for routing
import { motion } from "framer-motion"; // Import motion for animation
import emptyCart from "../../src/assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Purchases = () => {

  const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login


  const [orders, setOrders] = useState([]);
  console.log("orders: ",orders);


  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const userId = localStorage.getItem("user_id");
        console.log("localStorage ID: ",userId);  

        const response = await axios.get(`${BASE_URL}/api/history-orders`,{
            // userId,
            params: { userId },
            headers:{
              'Cache-Control': 'no-cache',
            }
        }); // Adjust API endpoint
        setOrders(response.data);
        console.log("respone.data: ",response.data);
        // ตรวจสอบว่าข้อมูลเป็น array
        // console.log("Response data:", response.data);
    //   if (Array.isArray(response.data)) {
    //     setOrders(response.data); // เก็บข้อมูลใน state
    //   } else {
    //     console.error("Unexpected data format:", response.data);
    //   }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <section className="bg-slate-100 my-4 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
          <div className="items-center mb-6">
            <h1 className="text-2xl font-bold mb-5">การสั่งซื้อของฉัน</h1>
            {orders.length > 0 ? (
              <div className="space-y-5">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-lg shadow p-5"
                  >
                    <h2 className="text-lg font-bold mb-3">
                      คำสั่งซื้อที่ #{order.orderId} - สถานะ: {order.status}
                    </h2>
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center border-b pb-3 mb-3 last:border-none last:pb-0 last:mb-0"
                      >
                        <img
                        //   src={item.image}
                          src={`${BASE_URL}/images/product/${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600 text-sm">
                            ราคา: ฿{item.unitPrice} x {item.quantity}
                          </p>
                          <p className="text-gray-600 text-sm">
                            ราคารวม: ฿{item.totalPrice}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-semibold">ยอดรวมการสั่งซื้อ:</p>
                      <p className="text-red-500 font-bold">
                        ฿{order.finalAmount}
                      </p>
                    </div>
                    {/* <div className="mt-3 flex space-x-3">
                      <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
                        ให้คะแนน
                      </button>
                      <button className="bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300">
                        ติดต่อผู้ขาย
                      </button>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                        ซื้ออีกครั้ง
                      </button>
                    </div> */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 mt-5">
                <p>ยังไม่มีคำสั่งซื้อ</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center mt-4 gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              คุณต้องเข้าสู่ระบบเพื่อเข้าถึงข้อมูลการสั่งซื้อของคุณ
            </h1>
            <Link to="/signin">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                เข้าสู่ระบบ
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
  
};

export default Purchases;


// {/* <>
// {isLoggedIn ? (
// <section className="bg-slate-100 my-4 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
//   <div className=" items-center mb-6">
  
// {/* <div className="bg-gray-100 min-h-screen p-5"> */}
//   <h1 className="text-2xl font-bold mb-5">การสั่งซื้อของฉัน</h1>
//   <div className="space-y-5">
//     {orders.map((order, index) => (
//       <div key={index} className="bg-white rounded-lg shadow p-5">
//         <h2 className="text-lg font-bold mb-3">ร้านแนะนำ: {order.shop}</h2>
//         {order.items.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center border-b pb-3 mb-3 last:border-none last:pb-0 last:mb-0"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-16 h-16 rounded-lg mr-4"
//             />
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.name}</h3>
//               <p className="text-gray-600 text-sm">{item.variant}</p>
//               <p className="text-gray-600 text-sm">จำนวน: {item.quantity}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-red-500 font-bold">฿{item.price}</p>
//             </div>
//           </div>
//         ))}
//         <div className="flex justify-between items-center mt-3">
//           <p className="font-semibold">รวมการสั่งซื้อ:</p>
//           <p className="text-red-500 font-bold">฿{order.total}</p>
//         </div>
//         <div className="mt-3 flex space-x-3">
//           <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
//             ให้คะแนน
//           </button>
//           <button className="bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300">
//             ติดต่อผู้ขาย
//           </button>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
//             ซื้ออีกครั้ง
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// {/* </div>  */}

// </div>
// </section>
// ) : (
//     <motion.div
//     initial={{ y: 30, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ duration: 0.4 }}
//     className="flex flex-col mdl:flex-row justify-center items-center mt-4 gap-4 pb-20 pb-20" //pb-20 ไม่มี พึ่งเพิ่ม
//     >
//     <div>
//         <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="emptyCart" />
//     </div>
//     <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
//         <h1 className="font-titleFont text-xl font-bold uppercase">
//         You need to log in to access your profile.
//         </h1>
//         <Link to="/signin">
//         <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
//             Log In
//         </button>
//         </Link>
//     </div>
//     </motion.div>
// )}
// </> */}