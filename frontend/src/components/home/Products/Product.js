// import React, { useState } from "react";
// import { BsSuitHeartFill } from "react-icons/bs";
// import { GiReturnArrow } from "react-icons/gi";
// import { FaShoppingCart } from "react-icons/fa";
// import { MdOutlineLabelImportant } from "react-icons/md";
// import Image from "../../designLayouts/Image";
// import Badge from "./Badge";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../../redux/orebiSlice";
// import { toast } from "react-toastify";
// import PropTypes from "prop-types"; // เพิ่มการนำเข้า PropTypes

// const Product = (props) => {
//   const dispatch = useDispatch();
//   const _id = props.productName;
//   const id = props.name;
//   //const id = props.name;
//   // const idString = (_id,id) => {
//   //   return String(_id,id).toLowerCase().split(" ").join("");
//   // // const idString = (id) => {
//   // //   return String(id).toLowerCase().split(" ").join("");
//   // };
//   const idString = (_id, id) => {
//     // รวมค่า _id และ id ถ้ามีค่า
//     let combinedId = "";
//     if (_id) combinedId += _id;
//     if (id) combinedId += id;
  
//     // แปลงเป็นตัวพิมพ์เล็กและลบช่องว่าง
//     return combinedId.toLowerCase().split(" ").join("");
//   };
//   const rootId = idString(_id,id);
//   const [wishList, setWishList] = useState([]);
//   const navigate = useNavigate();
//   const productItem = props;
//   const handleProductDetails = () => {
//     navigate(`/product/${rootId}`, {
//       state: {
//         item: productItem,
//       },
//     });
//   };

//   const handleWishList = () => {
//     toast.success("Product add to wish List");
//     setWishList(wishList.push(props));
//     console.log(wishList);
//   };
//   return (
//     <div className="w-full relative group justify-items-center">
//       <div className="">
//       <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        
//         <div onClick={handleProductDetails}>
//           <Image className="w-full h-full" imgSrc={props.img} />
        
//         </div>
//         <div className="absolute top-6 left-8">
//           {props.badge && <Badge text="New" />}
//         </div>
//         <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
//           <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
//             <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
//               Compare
//               <span>
//                 <GiReturnArrow />
//               </span>
//             </li>
//             <li
//               onClick={() =>
//                 dispatch(
//                   addToCart({
                    // _id: props._id,
                    // productName: props.productName,
                    // name: props.name,
                    // quantity: 1,
                    // image: props.img,
                    // badge: props.badge,
                    // price: props.price,
                    // colors: props.color,
//                   })
//                 )
//               }
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               Add to Cart
//               <span>
//                 <FaShoppingCart />
//               </span>
//             </li>
//             <li
//               onClick={handleProductDetails}
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               View Details
//               <span className="text-lg">
//                 <MdOutlineLabelImportant />
//               </span>
//             </li>
//             <li
//               onClick={handleWishList}
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               Add to Wish List
//               <span>
//                 <BsSuitHeartFill />
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="max-w-80 max-h-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
//         <div className="flex items-center justify-between font-titleFont">
//           <h2 className="text-lg text-primeColor font-bold truncate max-w-[2000px]">
//             {props.productName}
//             {props.name}
//             {/*props.name*/}
//           </h2>
//           <p className="text-[#767676] text-[14px]">${props.price}</p>
//         </div>
//         <div>
//           <p className="text-[#767676] text-[14px]">{props.color}</p>
//         </div>
//       </div>

//       </div>
//     </div>

//   );
// };

// Product.propTypes = {
//   productName: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   img: PropTypes.string.isRequired,
//   badge: PropTypes.number,
//   price: PropTypes.string.isRequired,
//   color: PropTypes.string.isRequired,
//   _id: PropTypes.number.isRequired,
// }

// export default Product;




import React, { useState, useEffect  } from "react";//useEffect, useCallback
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";//useDispatch
//import { addToCart } from "../../../redux/orebiSlice";
import { toast } from "react-toastify";
import PropTypes from "prop-types"; // เพิ่มการนำเข้า PropTypes
import Swal from "sweetalert2";
import axios from "axios";
//import { setCart } from "../../../redux/cartActions";//orebiSlice
import { addToCart } from "../../../redux/cartActions";//orebiSlice
// Example: Correct import
//import { fetchCartItems } from '../../../pages/Cart/ItemCard';
//import { fetchCartItemst } from '../../../pages/Cart/Cart';



const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.productName;
  const id = props.name;
  //const { addToCart } = setCart(); // ใช้ CartContext เพื่อเพิ่มสินค้า
  //const { addToCart } = addToCart(); // ใช้ CartContext เพื่อเพิ่มสินค้า
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //const userId = localStorage.getItem('user_id'); // หรือดึงจาก Context

  //const [cart, setCarts] = useState([]);

  // ดึงข้อมูลสถานะการเข้าสู่ระบบจาก Redux Store
  const isLoggedIn = useSelector(state => state.loginStatus);

  //const id = props.name;
  // const idString = (_id,id) => {
  //   return String(_id,id).toLowerCase().split(" ").join("");
  // // const idString = (id) => {
  // //   return String(id).toLowerCase().split(" ").join("");
  // };
  const idString = (_id, id) => {
    // รวมค่า _id และ id ถ้ามีค่า
    let combinedId = "";
    if (_id) combinedId += _id;
    if (id) combinedId += id;
  
    // แปลงเป็นตัวพิมพ์เล็กและลบช่องว่าง
    return combinedId.toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id,id);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleWishList = () => {
    toast.success("Product add to wish List");
    setWishList(wishList.push(props));
    console.log(wishList);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      console.log('show:',isLoggedIn);
      // แจ้งเตือนและเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
      Swal.fire({
        title: "Please Login",
        text: "You need to login before adding items to the cart.",
        icon: "warning",
        confirmButtonText: "Login Now",
        confirmButtonColor: "#3085d6", // สีเขียวสำหรับปุ่ม Confirm
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin"); // เปลี่ยนเส้นทางไปยังหน้า SignIn
        }
      });
    } else {

      const productId = props.id || props._id; // ใช้ค่าเดียวกัน
      console.log("productId :", productId);

        try {
        const userId = localStorage.getItem('user_id'); // หรือดึงจาก Context
        const token = localStorage.getItem('authToken'); // หรือดึงจาก Context
        //const { id, productName, name, img, badge, price, color, } = props;//des, description

              // console.log("Prop_id :",props._id);
              console.log("productId :",productId);

              // เรียก API เพื่อเพิ่มสินค้าลงฐานข้อมูล
              const response = await axios.post(`${BASE_URL}/api/cart/add`, {
                  userId,
                  // productId: props.id,//id productId
                  productId,//id productId
                  // _idassets: props._id,
                  // ...(props.id && { productId: props.id }),  // ส่ง productId ถ้ามีค่า
                  // ...(props._id && { _idassets: props._id }), // ส่ง _idassets ถ้ามีค่า
                  // productId: props.id || 0, // ตรวจสอบว่ามีค่า productId หรือไม่ ถ้าไม่มีให้ส่ง 0 หรือค่าที่เหมาะสม
                  // _idassets: props._id || 0, // ตรวจสอบ _idassets ด้วย
                  quantity: 1, // หรือระบุจำนวนที่ผู้ใช้เลือก
                  header:{
                    Authorization: `Bearer ${token}`,
                  }
              });
              console.log("Response from API:", response);

              if (response.status === 200) {
                //addToCart({ userId, productId: id, quantity: 1 });
                // อัปเดตข้อมูลตะกร้าหลังเพิ่มสินค้า
                // fetchCartItemst(); // เรียกฟังก์ชันเพื่ออัปเดตข้อมูลตะกร้า
                dispatch(addToCart({ _id: props._id, id: props.id, quantity: 1 }));//userId, productId: id,
                //toast.success("Product added to the cart");
                console.log('Item added successfully',addToCart);
              }

              if (response.status !== 200) {
                  throw new Error('Failed to add item to cart');
              }
          
          } catch (error) {
              console.error("Error adding product to cart:", error);
              toast.error("Failed to add product to the cart");
          }
      //toast.success("Product added to the cart");
    }
  };

  //if (!cart.length) return <p>No cart items found.</p>;

    // // ใช้ useEffect เพื่อดึงข้อมูลเมื่อโหลดคอมโพเนนต์
    // useEffect(() => {
    //   fetchCartItems();
    // }, [fetchCartItems]);

    useEffect(() => {
      console.log("Updated Image Source:", props.img);
    }, [props.img]);

  return (
    // <div className="w-full relative group justify-items-center">
    <div className="w-full h-full relative group flex flex-col items-center">
      <div className="w-full h-full relative">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
      {/* <div className="w-full h-[225px] md:h-[225px] lg:h-[225px] relative overflow-hidden "> */}
        
        <div onClick={handleProductDetails}>
          
          <Image className="w-full h-full object-cover" imgSrc={props.img || `${BASE_URL}/images/product/${props.img}`} /> {/* ++ object-cover */}
        
        </div>
        <div className="absolute top-6 left-8">
          {/* {props.badge && <Badge text="New" />} */}
          {props.badge === 1 && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
      <li
        onClick={handleAddToCart}
        className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
      >
        Add to Cart
        <span>
          <FaShoppingCart />
        </span>
      </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li
              onClick={handleWishList}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-80 max-h-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold truncate max-w-[2000px]">
            {props.productName}
            {props.name}
            {/*props.name*/}
          </h2>
          {/* <p className="text-[#767676] text-[14px]">${props.price}</p> */}
          ฿{parseFloat(props.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          {/* ${props.price ? parseFloat(props.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"} */}
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>

      </div>
    </div>

  );
};

Product.propTypes = {
  productName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  badge: PropTypes.number,
  price: PropTypes.string.isRequired,
  // des: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  _id: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
}

export default Product;





// import React, { useState } from "react";
// import { BsSuitHeartFill } from "react-icons/bs";
// import { GiReturnArrow } from "react-icons/gi";
// import { FaShoppingCart } from "react-icons/fa";
// import { MdOutlineLabelImportant } from "react-icons/md";
// import Image from "../../designLayouts/Image";
// import Badge from "./Badge";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart } from "../../../redux/orebiSlice";
// import { toast } from "react-toastify";
// import PropTypes from "prop-types"; // เพิ่มการนำเข้า PropTypes
// import Swal from "sweetalert2";

// const Product = (props) => {
//   const dispatch = useDispatch();
//   const _id = props.productName;
//   const id = props.name;

//   // ดึงข้อมูลสถานะการเข้าสู่ระบบจาก Redux Store
//   const isLoggedIn = useSelector(state => state.loginStatus);

//   //const id = props.name;
//   // const idString = (_id,id) => {
//   //   return String(_id,id).toLowerCase().split(" ").join("");
//   // // const idString = (id) => {
//   // //   return String(id).toLowerCase().split(" ").join("");
//   // };
//   const idString = (_id, id) => {
//     // รวมค่า _id และ id ถ้ามีค่า
//     let combinedId = "";
//     if (_id) combinedId += _id;
//     if (id) combinedId += id;
  
//     // แปลงเป็นตัวพิมพ์เล็กและลบช่องว่าง
//     return combinedId.toLowerCase().split(" ").join("");
//   };
//   const rootId = idString(_id,id);
//   const [wishList, setWishList] = useState([]);
//   const navigate = useNavigate();
//   const productItem = props;
//   const handleProductDetails = () => {
//     navigate(`/product/${rootId}`, {
//       state: {
//         item: productItem,
//       },
//     });
//   };

//   const handleWishList = () => {
//     toast.success("Product add to wish List");
//     setWishList(wishList.push(props));
//     console.log(wishList);
//   };

//   const handleAddToCart = () => {
//     if (!isLoggedIn) {
//       console.log('show:',isLoggedIn);
//       // แจ้งเตือนและเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
//       Swal.fire({
//         title: "Please Login",
//         text: "You need to login before adding items to the cart.",
//         icon: "warning",
//         confirmButtonText: "Login Now",
//         confirmButtonColor: "#3085d6", // สีเขียวสำหรับปุ่ม Confirm
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/signin"); // เปลี่ยนเส้นทางไปยังหน้า SignIn
//         }
//       });
//     } else {
//       // เพิ่มสินค้าไปยังตะกร้าปกติ
//       dispatch(
//         addToCart({
          // _id: props._id,
          // id: props.id,
//           productName: props.productName,
//           name: props.name,
//           quantity: 1,
//           image: props.img,
//           badge: props.badge,
//           price: props.price,
//           colors: props.color,
//         })
//       );
//       //toast.success("Product added to the cart");
//     }
//   };


//   return (
//     <div className="w-full relative group justify-items-center">
//       <div className="">
//       <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        
//         <div onClick={handleProductDetails}>
//           <Image className="w-full h-full" imgSrc={props.img} />
        
//         </div>
//         <div className="absolute top-6 left-8">
//           {props.badge && <Badge text="New" />}
//         </div>
//         <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
//           <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
//             <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
//               Compare
//               <span>
//                 <GiReturnArrow />
//               </span>
//             </li>
//       <li
//         onClick={handleAddToCart}
//         className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//       >
//         Add to Cart
//         <span>
//           <FaShoppingCart />
//         </span>
//       </li>
//             <li
//               onClick={handleProductDetails}
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               View Details
//               <span className="text-lg">
//                 <MdOutlineLabelImportant />
//               </span>
//             </li>
//             <li
//               onClick={handleWishList}
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               Add to Wish List
//               <span>
//                 <BsSuitHeartFill />
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="max-w-80 max-h-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
//         <div className="flex items-center justify-between font-titleFont">
//           <h2 className="text-lg text-primeColor font-bold truncate max-w-[2000px]">
//             {props.productName}
//             {props.name}
//             {/*props.name*/}
//           </h2>
//           <p className="text-[#767676] text-[14px]">${props.price}</p>
//         </div>
//         <div>
//           <p className="text-[#767676] text-[14px]">{props.color}</p>
//         </div>
//       </div>

//       </div>
//     </div>

//   );
// };

// Product.propTypes = {
//   productName: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   img: PropTypes.string.isRequired,
//   badge: PropTypes.number,
//   price: PropTypes.string.isRequired,
//   color: PropTypes.string.isRequired,
//   _id: PropTypes.number.isRequired,
//   id: PropTypes.number.isRequired,
// }

// export default Product;




