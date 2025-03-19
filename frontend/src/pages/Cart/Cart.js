// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import { resetCart } from "../../redux/orebiSlice";
// import { emptyCart } from "../../assets/images/index";
// import ItemCard from "./ItemCard";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.orebiReducer.products);
//   const [totalAmt, setTotalAmt] = useState("");
//   const [shippingCharge, setShippingCharge] = useState("");
//   useEffect(() => {
//     let price = 0;
//     products.map((item) => {
//       price += item.price * item.quantity;
//       return price;
//     });
//     setTotalAmt(price);
//   }, [products]);
//   useEffect(() => {
//     if (totalAmt <= 200) {
//       setShippingCharge(30);
//     } else if (totalAmt <= 400) {
//       setShippingCharge(25);
//     } else if (totalAmt > 401) {
//       setShippingCharge(20);
//     }
//   }, [totalAmt]);
//   return (
//     <div className="max-w-container mx-auto px-4">
//       <Breadcrumbs title="Cart" />
//       {products.length > 0 ? (

//         <div className="pb-20">
//             {/*ตาราง*/}
//             <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
//               <h2 className="col-span-2">Product</h2>
//               <h2>Price</h2>
//               <h2>Quantity</h2>
//               <h2>Sub Total</h2>
//             </div>

//             <div className="mt-5">
//               {products.map((item) => (
//                 <div key={`${item._id}-${item.id}`}>{/*{item._id} */}
//                   <ItemCard item={item} />
//                 </div>.
//               ))}
//             </div>

//           {/*ปุ่ม Reset*/}

//             <button
//               onClick={() => dispatch(resetCart())}
//               className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300">
//               Reset cart
//             </button>

//               {/*Coupon*/}
//             <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
//               <div className="flex items-center gap-4">
//                 <input
//                   className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
//                   type="text"
//                   placeholder="Coupon Number"
//                 />
//                 <p className="text-sm mdl:text-base font-semibold">
//                   Apply Coupon
//                 </p>
//               </div>
//               <p className="text-lg font-semibold">Update Cart</p>
//             </div>

//             {/*Cart totals*/}
//             <div className="max-w-7xl gap-4 flex justify-end mt-4">
//               <div className="w-96 flex flex-col gap-4">
//                 <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
//                 <div>
//                   <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//                     Subtotal
//                     <span className="font-semibold tracking-wide font-titleFont">
//                       ${totalAmt}
//                     </span>
//                   </p>
//                   <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//                     Shipping Charge
//                     <span className="font-semibold tracking-wide font-titleFont">
//                       ${shippingCharge}
//                     </span>
//                   </p>
//                   <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
//                     Total
//                     <span className="font-bold tracking-wide text-lg font-titleFont">
//                       ${totalAmt + shippingCharge}
//                     </span>
//                   </p>
//                 </div>
//                 <div className="flex justify-end">
//                   <Link to="/paymentgateway">
//                     <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
//                       Proceed to Checkout
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//         </div>

//       ) : (
//         //แจ้งเตือนว่าไม่มีสินค้าในตะกร้า และให้กลับไปหน้า Shopping เพื่อเพิ่มสินค้า
//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.4 }}
//           className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
//         >
//           <div>
//             <img
//               className="w-80 rounded-lg p-4 mx-auto"
//               src={emptyCart}
//               alt="emptyCart"
//             />
//           </div>
//           <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
//             <h1 className="font-titleFont text-xl font-bold uppercase">
//               Your Cart feels lonely.
//             </h1>
//             <p className="text-sm text-center px-10 -mt-2">
//               Your Shopping cart lives to serve. Give it purpose - fill it with
//               books, electronics, videos, etc. and make it happy.
//             </p>
//             <Link to="/shop">
//               <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
//                 Continue Shopping
//               </button>
//             </Link>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"; //useSelector
import { motion } from "framer-motion"; // Import motion for animation
import emptyCart from "../../assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import Link for routing , useNavigate
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ItemCard from "./ItemCard";
//import { resetCart } from "../../redux/orebiSlice";
import { clearCart } from "../../redux/cartActions";
import { fetchCartItems } from "../../redux/cartActions"; // Action สำหรับดึงข้อมูล

//import ItemCart from "../../pages/Cart/ItemCard"; // Import ไฟล์ ItemCart

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [cart, setCart] = useState([]);
  // const [totalAmt, setTotalAmt] = useState(0);
  // const [shippingCharge, setShippingCharge] = useState(0);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log("local url: ",BASE_URL);

  // const cart = useSelector((state) => state.cart.items);  // ใช้ cart จาก Redux store
  const cart = useSelector((state) => state.cart.items);  // ใช้สำหรับข้อมูลจาก Redux store
  const [selectedItems, setSelectedItems] = useState([]);

  // ตั้งค่า cart เมื่อ reduxCart เปลี่ยนแปลง
// useEffect(() => {
//   setCart(reduxCart);
// }, [reduxCart]);

  // ฟังก์ชันจัดการการเลือกสินค้า

  // ใน Cart.js ก่อนที่คุณจะเปลี่ยนหน้าไปที่ Payments
const handleProceedToCheckout = () => {

  if (selectedItems.length === 0) {
    alert("กรุณาเลือกสินค้าก่อนที่จะทำการชำระเงิน!");
    return; // ไม่ให้ดำเนินการต่อ
  }
  // หากเลือกสินค้าแล้วสามารถไปที่ checkout ได้
  console.log("Proceeding to checkout...");
  // ที่นี่สามารถเขียนโค้ดที่ทำการ checkout ได้

  // เก็บข้อมูลใน sessionStorage
  // เก็บข้อมูลใน localStorage (ข้อมูลจะคงอยู่จนกว่าจะถูกลบ)
  localStorage.setItem('selectedItems', JSON.stringify(selectedCartItems));  // selectedCartItems คือข้อมูลที่คุณเลือก
  console.log("Selected items saved in localStorage:", selectedCartItems);

  // เปลี่ยนหน้าไปที่ Payments
  navigate('/payments');  // ถ้าใช้ useNavigate
};

  // const handleProceedToCheckout = () => {
  //   console.log("Selected items being sent to Payments:", selectedCartItems);
  //   navigate('/payments', { state: { selectedItems: selectedCartItems } });
  // };
  
  // ข้อมูล id Checkbox
  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      const updatedItems = selectedItems.filter((id) => id !== itemId);
      setSelectedItems(updatedItems);
      console.log("Updated selectedItems after removal: ", updatedItems);
    } else {
      const updatedItems = [...selectedItems, itemId];
      setSelectedItems(updatedItems);
      console.log("Updated selectedItems after addition: ", updatedItems);
    }
  };
  useEffect(() => {
    console.log("selectedItems has been updated: ", selectedItems);
  }, [selectedItems]);


  // คำนวณราคาสินค้าที่เลือก
  const getSubtotal = () => {
    return cart
      .filter((item) => selectedItems.includes(item.id)) // คัดกรองสินค้าที่เลือก
      .reduce((total, item) => total + item.price * item.quantity, 0); // คำนวณราคา
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const tax = subtotal * 0.07; // สมมติว่า VAT 7%
    return subtotal + tax;
  };


  // const handleSelectItem = (itemId) => {
  //   if (selectedItems.includes(itemId)) {
  //     setSelectedItems(selectedItems.filter((id) => id !== itemId));
  //     console.log("selectedItems.filter: ",selectedItems.filter);
  //     console.log("selectedItems: ",selectedItems);
  //   } else {
  //     setSelectedItems([...selectedItems, itemId]);
  //     console.log("...selectedItems, itemId: ",[...selectedItems, itemId]);
  //   }
  // };

  const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));

  console.log("selectedCartItems: ",selectedCartItems);

  //const socket = io(`${BASE_URL}`); // เปลี่ยนเป็น URL ของเซิร์ฟเวอร์คุณ.

  //const [cartItem, setCartItems] = useState([]);
  const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login
  const userId = localStorage.getItem("user_id"); // หรือจากที่ไหนก็ได้ที่เก็บ user_id

  // const [selectedItems, setSelectedItems] = useState([]);
  // const navigate = useNavigate();
  // const [selectedItems, setSelectedItems] = useState([]);
  // const navigate = useNavigate();

  // const handleSelectItem = (itemId) => {
  //   setSelectedItems((prevSelected) =>
  //     prevSelected.includes(itemId)
  //       ? prevSelected.filter((id) => id !== itemId)
  //       : [...prevSelected, itemId]
  //   );
  // };

  // const handleProceedToPayment = () => {
  //   const selectedProducts = cart.filter((item) => selectedItems.includes(item.id)); // สินค้าที่ถูกเลือก
  //   localStorage.setItem("selectedCartItems", JSON.stringify(selectedProducts)); // เก็บสินค้าใน LocalStorage
  //   setSelectedItems();
  //   navigate("/payments"); // ไปยังหน้าชำระเงิน
  // };
  
  

  // const handleProceedToPayment = () => {
  //   const selectedProducts = cart.filter((item) =>
  //     selectedItems.includes(item.id)
  //   );
  //   navigate("/payments", { state: { selectedProducts } });
  // };

  //const dispatch = useDispatch();
  //const cartItems = useSelector((state) => state.cart.items); // ดึงข้อมูลสินค้าจาก Redux

  useEffect(() => {
    // ดึงรายการสินค้าเมื่อโหลดคอมโพเนนต์
    dispatch(fetchCartItems());
  }, [dispatch]);

  // Fetch cart data
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const userId = localStorage.getItem("user_id");
  //     console.log("Show userID:", userId);
  //     try {
  //       const { data } = await axios.get(`${BASE_URL}/api/cart/${userId}`);
  //       console.log("data api Backend :",data);
  //       setCart(data); // เก็บข้อมูลใน state
  //     } catch (error) {
  //       console.error("Failed to fetch cart:", error);
  //     }
  //   };
  //   fetchCart();
  // }, [BASE_URL]);

    // ดึงข้อมูลตะกร้าเมื่อ component ถูก mount
    // useEffect(() => {
    //   const fetchCart = async () => {
    //     try {
    //       const response = await axios.get(`${BASE_URL}/api/cart`, { params: { userId } });
    //       //const response = await axios.get(`${BASE_URL}/api/cart/${userId}`);
    //       setCart(response.data); // อัปเดตข้อมูลตะกร้าใน state setCartItems

    //       console.log("api userid:", response.data);
    //     } catch (error) {
    //       console.error("Failed to fetch cart:", error);
    //     }
    //   };


      // ฟังก์ชันสำหรับดึงข้อมูลตะกร้า
   const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/cart`, { params: { userId },
        headers: {
        'Cache-Control': 'no-cache',// ห้ามแคช
      } });
      console.log("response fetchCart: ", response);
      //setCart(response.data); // อัปเดตข้อมูลใน state
      console.log("Fetched cart:", response.data);
      //console.log("Fetched cartUseCall:", setCart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }, [userId, BASE_URL]); // useCallback จะจำค่าของ userId และ BASE_URL เพื่อไม่ให้สร้างใหม่ทุกครั้ง

  useEffect(() => {
    fetchCart(); // เรียกใช้งานฟังก์ชัน fetchCart เมื่อ Component โหลดครั้งแรกหรือ userId เปลี่ยน
  }, [fetchCart]); // ผูกการทำงานกับ fetchCart
  
    // useEffect(() => {
    //   // ฟังก์ชันสำหรับดึงข้อมูลตะกร้า
    //   const fetchCart = async () => {
    //     try {
    //       const response = await axios.get(`${BASE_URL}/api/cart`, { params: { userId } });//get
    //       //const response = await fetch(`${BASE_URL}/api/cart`, { method: 'GET', params: { userId } });//get

    //       console.log("response fetchCart: ", response);

    //       //const data = await response.json();
    //       //console.log('Fetched data (fetch):', data); // ตรวจสอบข้อมูลที่ได้รับ
          
    //       setCart(response.data); // อัปเดตข้อมูลใน state
    //       console.log("Fetched cart:", response.data);
    //       // ตรวจสอบว่า data หรือ cart ไม่เป็น undefined ก่อนการใช้งาน
    //         // if (data && Array.isArray(data)) {
    //         //   setCart(data); // อัปเดตข้อมูลตะกร้า
    //         // } else {
    //         //   setCart([]); // ถ้าข้อมูลไม่ถูกต้องให้ใช้ array ว่าง
    //         // }
    //     } catch (error) {
    //       console.error("Failed to fetch cart:", error);
    //     }
    //   };

    //   // ดึงข้อมูลทุกๆ 5 วินาที
    //   //const interval = setInterval(fetchCart, 500);
    //   //console.log('interval: ',interval);

    //   fetchCart();

      

    //   //return () => clearInterval(interval);
    
    //   // // ดึงข้อมูลครั้งแรก
    //   // if (userId) {
    //   //   fetchCart();
    //   // }
    
    // }, [userId, BASE_URL]);
    
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     fetchCart(); // ทำการดึงข้อมูลตะกร้าใหม่ทุกๆ 5 วินาที
    //   }, 5000);
    
    //   // ทำความสะอาดเมื่อคอมโพเนนต์ถูกทำลาย
    //   return () => clearInterval(interval);
    // }, [userId, BASE_URL]);

      // เรียกใช้ fetchCart เมื่อ component ถูกโหลดครั้งแรก หรือ userId, BASE_URL เปลี่ยน
  useEffect(() => {
    if (!userId) return; // หากไม่มี userId ไม่ต้องเรียก fetchCart
    fetchCart(); // เรียกใช้งานฟังก์ชัน fetchCart
    //console.log("Show fetchCart1: ", fetchCart);

    // ตั้งเวลาให้ดึงข้อมูลทุกๆ 5 วินาที
    const interval = setInterval(() => {
      fetchCart(); // ทำการดึงข้อมูลตะกร้าใหม่ทุกๆ 5 วินาที
      //console.log("Show fetchCart2: ", fetchCart);
      //setCart(fetchCart);
    }, 5000);

    // ทำความสะอาดเมื่อคอมโพเนนต์ถูกทำลาย
    return () => clearInterval(interval);
  }, [fetchCart,userId]); // useEffect จะทำงานเมื่อ userId หรือ BASE_URL เปลี่ยนแปลง


  // ฟังก์ชันสำหรับดึงข้อมูลตะกร้า
  // const fetchCart = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/api/cart`, { params: { userId } });
  //     setCart(response.data);
  //     console.log("Fetched cart:", response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch cart:", error);
  //   }
  // };


  //     // if (userId) {
  //     //   fetchCart(); // ดึงข้อมูลตะกร้า
  //     // }

  //     useEffect(() => {
  //       // ดึงข้อมูลครั้งแรก
  //       if (userId) {
  //         fetchCart();
  //       }
    
  //       // ฟัง event `cartUpdate` จาก WebSocket
  //       socket.on('cartUpdate', (updatedCart) => {
  //         console.log("Cart updated:", updatedCart);
  //         setCart(updatedCart); // อัปเดตข้อมูลตะกร้าใน state
  //       });
    
  //       // ลบ event listener เมื่อ component ถูก unmount
  //       return () => {
  //         socket.off('cartUpdate');
  //       };
  //     }, [userId]);

  //   //}, [userId, BASE_URL]); // คอยติดตามการเปลี่ยนแปลงของ userId (ถ้ามีการเปลี่ยนแปลง)

  //   useEffect(() => {
  //     // ดึงข้อมูลครั้งแรก
  //     if (userId) {
  //       fetchCart();
  //     }
  
  //     // ฟัง event `cartUpdate` จาก WebSocket
  //     socket.on('cartUpdate', (updatedCart) => {
  //       console.log("Cart updated:", updatedCart);
  //       setCart(updatedCart); // อัปเดตข้อมูลตะกร้าใน state
  //     });
  
  //     // ลบ event listener เมื่อ component ถูก unmount
  //     return () => {
  //       socket.off('cartUpdate');
  //     };
  //   }, [userId]);


    // ฟังก์ชันในการลบสินค้า
    const handleRemoveItem = async (productId) => {
      try {
        const token = localStorage.getItem('authToken'); // หรือดึงจาก Context
        const response = await axios.delete(`${BASE_URL}/api/cart/deleteall`, {
          data: { userId, productId }, // ส่ง userId และ productId ไปใน request body
          headers: {
            'Cache-Control': 'no-cache',// ห้ามแคช
            Authorization: `Bearer ${token}`,
          }
        });
        // console.log("data: ", data);

        if (response.status === 200) {
          //addToCart({ userId, productId: id, quantity: 1 });
          dispatch(clearCart());//userId, productId: id,
          fetchCart(); // เรียก fetchCart เพื่ออัปเดตตะกร้าหลังลบสินค้า
          //toast.success("Product added to the cart");
          console.log('Cart reset successfully.',clearCart);
        }
        console.log(response.data.message); // "Item removed from cart"
        // ลบสินค้าจาก state
        //setCart([]);
        //setCart(cart.filter(item => item.product_id !== productId));
      } catch (error) {
        console.error("Failed to reset cart:", error);
      }
    };

   

  //Calculate total amount
  // useEffect(() => {
  //   const price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //   setTotalAmt(price);
  // }, [cart]);

  //  // Calculate total amount
  //  useEffect(() => {
  //   const itemscart = cart.reduce((acc, item) => acc + item.id);
  //   setTotalAmt(itemscart);
  // }, [cart]);


  ////////////////////////////// ใช้ //////////////////////////////////
  // Calculate shipping charge ใช้
  // useEffect(() => {
  //   if (totalAmt <= 200) setShippingCharge(30);
  //   else if (totalAmt <= 400) setShippingCharge(25);
  //   else setShippingCharge(20);
  // }, [totalAmt]);

  //New 06/01/2568 //
  // const handleSelectItem = (itemId) => {
  //   setSelectedItems((prevSelected) =>
  //     prevSelected.includes(itemId)
  //       ? prevSelected.filter((id) => id !== itemId)
  //       : [...prevSelected, itemId]
  //   );
  // };

// new 06/01/2568 //
  // const handleSelectItem = (itemId) => {
  //   setSelectedItems((prevSelected) =>
  //     prevSelected.includes(itemId)
  //       ? prevSelected.filter((id) => id !== itemId)
  //       : [...prevSelected, itemId]
  //   );
  // };

  // const handleProceedToPayment = () => {
  //   const selectedProducts = cart.filter((item) =>
  //     selectedItems.includes(item.id)
  //   );
  //   navigate("/paymentpage", { state: { selectedProducts } });
  // };

//                //

  //if (!cartItems.length) return <p>No cart items found.</p>;
  //if (!cartItem.length) return <p>No cart items found.</p>;

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {isLoggedIn ? (
        <>
      {cart.length > 0 ? (
        console.log("Cartjs Show cart_length: ", cart),
        <div className="pb-20">
          {/* ตารางสินค้า */}
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {cart.map((item) => (//carttItems
              // <ItemCard key={item.id} item={item} />
              console.log("Cartjs Show Items: ", item),
              console.log("Cartjs Show cart_map: ", cart),
              <ItemCard 
                key={item.id} 
                item={{
                  _id: item._id,
                  id: item.id, 
                  product_id: item.product_Id,
                  name: item.productName,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                  color: item.color,
                  is_selected: item.is_selected,
                }} 
                handleSelectItem={handleSelectItem}
                isSelected={selectedItems.includes(item.id)}

                // handleSelectItem={handleSelectItem}
                // isSelected={selectedItems.includes(item.id)}
                
              />
            ))}
          </div>

          {/* Reset cart button */}
          {/* dispatch(clearCart()) */}

          {/* <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => handleSelectItem(item.id)}
            className="form-checkbox"
          /> */}

          <button
            onClick={() =>{console.log("Cartjs Show Items: ", cart); handleRemoveItem()}}  
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset Cart
          </button>

          {/* Cart totals */}
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  {/* <span>${totalAmt}</span> */}
                  <span>฿{(getSubtotal()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  VAT (7%)
                  <span>฿{((getSubtotal() * 0.07)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> {/* ${(getSubtotal() * 0.07).toLocaleString()} */}
                </p>
                {/* <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span>${shippingCharge}</span>
                </p> */}
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  {/* <span>${totalAmt + shippingCharge}</span> */}
                  <span>฿{(getTotal()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </p>
                
              </div>
              <div className="flex justify-end">
                   {/* <Link to="/paymentpage">
                     <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                       Proceed to Checkout
                     </button>
                   </Link> */}

                  <button onClick={handleProceedToCheckout} className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>

                  {/* <Link 
                    to="/payments" 
                    state={{ selectedItems: selectedCartItems }} 
                    onClick={() => {
                      console.log("Selected items being sent to Payments:", selectedCartItems); // Log ข้อมูลที่ถูกส่ง
                    }}
                  >
                    <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">Proceed to Checkout</button>
                  </Link> */}

                  {/* <Link to={{ pathname: "/payments", state: { selectedItemss: selectedCartItems } }}>
                    <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                      Proceed to Checkout
                    </button>
                  </Link> */}
                  
                   {/* ตัวเก่าใช้ Link */}
                   {/* <Link to="/payments">
                   {/* onClick={handleProceedToPayment} 
                     <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                       Proceed to Checkout
                     </button>
                   </Link> */}

                   {/* <Link to="/paymentgateway">
                     <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                       Proceed to Checkout
                     </button>
                   </Link> */}
              </div>
            </div>
          </div>

        </div>
      ) : (
                 //แจ้งเตือนว่าไม่มีสินค้าในตะกร้า และให้กลับไปหน้า Shopping เพื่อเพิ่มสินค้า
                 <motion.div
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.4 }}
                   className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
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
                       Your Cart feels lonely.
                     </h1>
                     <p className="text-sm text-center px-10 -mt-2">
                       Your Shopping cart lives to serve. Give it purpose - fill it with
                       books, electronics, videos, etc. and make it happy.
                     </p>
                     <Link to="/shop">
                       <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                         Continue Shopping
                       </button>
                     </Link>
                   </div>
                 </motion.div>
               )}
               </>
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
    </div>
  );
};

export default Cart;


// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { Link } from "react-router-dom"; // Import Link for routing
// import { motion } from "framer-motion"; // Import motion for animation
// import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import ItemCard from "./ItemCard";
// import { resetCart } from "../../redux/orebiSlice";
// import emptyCart from "../../assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)

// const Cart = () => {
//   const dispatch = useDispatch();
//   const [cart, setCart] = useState([]);
//   const [totalAmt, setTotalAmt] = useState(0);
//   const [shippingCharge, setShippingCharge] = useState(0);
  
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   // Fetch cart data
//   useEffect(() => {
//     const fetchCart = async () => {
//       const userId = localStorage.getItem("user_id");
//       console.log("Show userID:", userId);
//       try {
//         const { data } = await axios.get(`${BASE_URL}/api/cart/${userId}`);
//         //console.log("data api Backend :",data);
//         setCart(data); // เก็บข้อมูลใน state
//       } catch (error) {
//         console.error("Failed to fetch cart:", error);
//       }
//     };
//     fetchCart();
//   }, [BASE_URL]);

//   // Calculate total amount
//   useEffect(() => {
//     const price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalAmt(price);
//   }, [cart]);

//   // Calculate shipping charge
//   useEffect(() => {
//     if (totalAmt <= 200) setShippingCharge(30);
//     else if (totalAmt <= 400) setShippingCharge(25);
//     else setShippingCharge(20);
//   }, [totalAmt]);


//   return (
//     <div className="max-w-container mx-auto px-4">
//       <Breadcrumbs title="Cart" />
//       {cart.length > 0 ? (
//         <div className="pb-20">
//           {/* ตารางสินค้า */}
//           <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
//             <h2 className="col-span-2">Product</h2>
//             <h2>Price</h2>
//             <h2>Quantity</h2>
//             <h2>Sub Total</h2>
//           </div>
//           <div className="mt-5">
//             {cart.map((item) => (
//               <ItemCard key={item.id} item={item} />
//             ))}
//           </div>

//           {/* Reset cart button */}
//           <button
//             onClick={() => dispatch(resetCart())}
//             className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
//           >
//             Reset Cart
//           </button>

//           {/* Cart totals */}
//           <div className="max-w-7xl gap-4 flex justify-end mt-4">
//             <div className="w-96 flex flex-col gap-4">
//               <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
//               <div>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//                   Subtotal
//                   <span>${totalAmt}</span>
//                 </p>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//                   Shipping Charge
//                   <span>${shippingCharge}</span>
//                 </p>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
//                   Total
//                   <span>${totalAmt + shippingCharge}</span>
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                    <Link to="/paymentgateway">
//                      <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
//                        Proceed to Checkout
//                      </button>
//                    </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//                  //แจ้งเตือนว่าไม่มีสินค้าในตะกร้า และให้กลับไปหน้า Shopping เพื่อเพิ่มสินค้า
//                  <motion.div
//                    initial={{ y: 30, opacity: 0 }}
//                    animate={{ y: 0, opacity: 1 }}
//                    transition={{ duration: 0.4 }}
//                    className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
//                  >
//                    <div>
//                      <img
//                        className="w-80 rounded-lg p-4 mx-auto"
//                        src={emptyCart}
//                        alt="emptyCart"
//                      />
//                    </div>
//                    <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
//                      <h1 className="font-titleFont text-xl font-bold uppercase">
//                        Your Cart feels lonely.
//                      </h1>
//                      <p className="text-sm text-center px-10 -mt-2">
//                        Your Shopping cart lives to serve. Give it purpose - fill it with
//                        books, electronics, videos, etc. and make it happy.
//                      </p>
//                      <Link to="/shop">
//                        <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
//                          Continue Shopping
//                        </button>
//                      </Link>
//                    </div>
//                  </motion.div>
//                )}
//     </div>
//   );
// };

// export default Cart;

