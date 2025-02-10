// import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../../redux/orebiSlice";

// const ProductInfo = ({ productInfo }) => {
//   console.log(productInfo)
//   const highlightStyle = {
//     color: "#d0121a", // Change this to the desired color
//     fontWeight: "bold", // Change this to the desired font weight
//   };

//   const renderDescription = () => {
//     if (!productInfo.des) {
//       return null; // or handle accordingly if product.des is not defined
//     }

//     const description = productInfo.des.split(/:(.*?)-/).map((part, index) => {
//       return (
//         <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
//           {part}
//         </span>
//       );
//     });

//     return <>{description}</>;
//   };
//   const dispatch = useDispatch();
//   return (
//     <div className="flex flex-col gap-5">
//       <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
//       <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
//       <p className="text-2xl font-semibold">
//         {productInfo.price} Dt
//         <span className="text-xl font-semibold line-through ml-2">540</span>
//         <span className="text-xs ml-2 inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white">
//           Save 100
//         </span>
//       </p>
//       <hr />
//       <p className="text-base text-gray-600">{renderDescription()}</p>

//       <div className="flex items-center">
//         <p className="text-sm mr-2"> leave a review </p>

//         <svg
//           className="w-4 h-4 text-yellow-300 ms-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <svg
//           className="w-4 h-4 text-yellow-300 ms-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <svg
//           className="w-4 h-4 text-yellow-300 ms-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <svg
//           className="w-4 h-4 text-yellow-300 ms-1"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//         <svg
//           className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//       </div>

//       <p className="text-base text-green-600 font-medium">En Stock</p>
//       <p className="font-medium text-lg">
//         <span className="font-normal">Colors:</span> {productInfo.color}
//       </p>
//       <button
//         onClick={() =>
//           dispatch(
//             addToCart({
//               _id: productInfo.id,
//               name: productInfo.productName,
//               name: productInfo.name,
//               quantity: 1,
//               image: productInfo.img,
//               badge: productInfo.badge,
//               price: productInfo.price,
//               colors: productInfo.color,
//               //description: productInfo.description,
//             })
//           )
//         }
//         className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
//       >
//         Add to Cart
//       </button>
//       <p className="font-normal text-sm">
//         <span className="text-base font-medium"> Categories:</span> Spring
//         collection, Streetwear, Women Tags: featured SKU: N/A
//       </p>
//     </div>
//   );
// };

// export default ProductInfo;


import React from "react";
import { useSelector, useDispatch } from "react-redux";//useDispatch
import { useNavigate } from "react-router-dom";
//import { addToCart } from "../../../redux/cartActions";//orebiSlice
//import { setCart } from "../../../redux/cartActions";//orebiSlice 
import { addToCart } from "../../../redux/orebiSlice";
//import { setCart } from "../../../redux/orebiSlice";//orebiSlice 
//import { useCart } from "../../pageProps/context/CartContext";// 
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import { toast } from "react-toastify";
import axios from "axios";

const ProductInfo = ({ productInfo }) => {
  //const { id, productName, name, img, badge, price, color, des, description} = productInfo;//
  //const BASE_URL = process.env.REACT_APP_BASE_URL;
  //const { addToCart } = useCart(); // ใช้ CartContext เพื่อเพิ่มสินค้า
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

    //Check if productInfo is undefined or null
    // if (!productInfo) {
    //   return <div>กำลังโหลดข้อมูลสินค้า...</div>;//กำลังโหลดข้อมูลสินค้า...Product information is not available.
    // }
  // Destructure the productInfo properties safely
  //const { productName, name, img, badge, price, color, des, description, id } = productInfo;

  console.log(productInfo);
  //const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log('show:',isLoggedIn);

  const highlightStyle = {
    color: "#d0121a",
    fontWeight: "bold",
  };

  // const renderDescription = (description) => {
  //   if (!description) {
  //     return <p>No description available.</p>;
  //   }

  const renderDescription = (description) => {
    if (!description) {
      return null; // ถ้าไม่มีค่าก็ไม่แสดงอะไร
    }

    // ตัวอย่างการแยกข้อมูล description
    const descriptionParts = description.split(/:(.*?)-/);

    // ตรวจสอบว่ามีการแยกได้จริง
    if (descriptionParts.length === 0) {
      return <p>{description}</p>;
    }

    // แปลงข้อมูล description และกำหนดสไตล์
    const descriptionContent = descriptionParts.map((part, index) => (
      <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
        {part}
      </span>
    ));

    return <>{descriptionContent}</>;
  };

//   const handleAddToCart = async () => {
//     console.log('showStatus:', isLoggedIn);
//     if (!isLoggedIn) {
//         Swal.fire({
//             title: "Please Login",
//             text: "You need to login before adding items to the cart.",
//             icon: "warning",
//             confirmButtonText: "Login Now",
//             confirmButtonColor: "#3085d6",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 navigate('/signin');
//             }
//         });
//     } else {
//         try {
//             const userId = localStorage.getItem('user_id'); // หรือดึงจาก Context
//             const { id, productName, name, img, badge, price, color, des, description} = productInfo;
           
//             console.log("localStorage:", userId);
//             if (!userId) {
//               // แจ้งให้ผู้ใช้ล็อกอินหรือแสดงข้อผิดพลาด
//               toast.error("Failed to add product to the cart");
//               return;
//             }
//             //const { id, productName, name, img, badge, price, color, des, description} = productInfo;
//             console.log("Product Info:", id, productName);

//             // เรียก API เพื่อเพิ่มสินค้าลงฐานข้อมูล
//             const response = await axios.post(`${BASE_URL}/api/cart/add`, {
//                 userId,
//                 productId: id,
//                 quantity: 1, // หรือระบุจำนวนที่ผู้ใช้เลือก
//             });
//             console.log("Response from API:", response);

//             if (response.status !== 200) {
//               throw new Error('Failed to add item to cart');
//             }

//             // เพิ่มสินค้าไปยัง CartContext
//               addToCart({
//                 _id: id,
//                 productName,
//                 name,
//                 quantity: 1,
//                 image: img,
//                 badge,
//                 price,
//                 colors: color,
//                 des,
//                 description,
//               });

//             // เพิ่มสินค้าไปยัง Redux Store
//             dispatch(
//                 setCart({
//                     _id: id,
//                     productName,
//                     name,
//                     quantity: 1,
//                     image: img,
//                     badge,
//                     price,
//                     colors: color,
//                 })
//             );

//             toast.success("Product added to the cart");
//         } catch (error) {
//             console.error("Error adding product to cart:", error);
//             toast.error("Failed to add product to the cart");
//         }
//     }
// };


  const handleAddToCart = async() => {
    console.log('showStatus:',isLoggedIn);
    if (!isLoggedIn) {
      Swal.fire({
        title: "Please Login",
        text: "You need to login before adding items to the cart.",
        icon: "warning",
        confirmButtonText: "Login Now",
        confirmButtonColor: "#3085d6", // สีเขียวสำหรับปุ่ม Confirm
      }).then((result) => {
          if (result.isConfirmed){
            navigate('/signin');
          }
      });
      } else {
        try {
          const userId = localStorage.getItem('user_id'); // หรือดึงจาก Context
          const token = localStorage.getItem('authToken'); // หรือดึงจาก Context
          //const { id, productName, name, img, badge, price, color, } = props;//des, description
    
                console.log("Prop_id :",productInfo._id);
    
                // เรียก API เพื่อเพิ่มสินค้าลงฐานข้อมูล
                const response = await axios.post(`${BASE_URL}/api/cart/add`, {
                    userId,
                    productId: productInfo.id,//id productId
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
                  dispatch(
                    addToCart({//setCart
                      _id: productInfo.id,
                      productName: productInfo.productName,
                      name: productInfo.name,
                      quantity: 1,
                      image: productInfo.img,
                      badge: productInfo.badge,
                      price: productInfo.price,
                      colors: productInfo.color,
                     //description: productInfo.description, // Optional field
                    })
                  );
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
          // เพิ่มสินค้าไปยังตะกร้าปกติ
      
      // toast.success("Product added to the cart")
      }
    }


  // const handleAddToCart = async (event) => {
  //   event.preventDefault();
  
  //   if (!isLoggedIn) {
  //     Swal.fire({
  //       title: "Please Login",
  //       text: "You need to login before adding items to the cart.",
  //       icon: "warning",
  //       confirmButtonText: "Login Now",
  //       confirmButtonColor: "#3085d6",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate('/signin');
  //       }
  //     });
  //   } else {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const userId = localStorage.getItem("user_id");
  //       const productid = productInfo?.id; // ใช้ค่า productInfo โดยตรง
  //       const quantityD = productInfo?.quantity || 1; // ตั้งค่าเริ่มต้น
  
  //       if (!userId || !productid) {
  //         throw new Error("Missing required data");
  //       }
  
  //       const cartItem = {
  //         user_id: userId,
  //         product_id: productid,
  //         quantity_id: quantityD,
  //       };
  
  //       console.log("Cart item:", cartItem);
  
  //       const response = await axios.post(`${BASE_URL}/api/cart/add`, cartItem, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  
  //       console.log("API Response:", response.data);
  //       dispatch(addToCart(cartItem));
  //       toast.success("Product added to the cart");
  //     } catch (error) {
  //       console.error("Error adding product to cart:", error);
  //       toast.error("Failed to add product to the cart");
  //     }
  //   }
  // };
  


  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-2xl font-semibold">
        {/* {productInfo.price} Dt */}
        ${parseFloat(productInfo.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Dt
        <span className="text-xl font-semibold line-through ml-2">540</span>
        <span className="text-xs ml-2 inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white">
          Save 100
        </span>
      </p>
      <hr />
      
      {/* แสดงผล des
      <p className="text-base text-gray-600">
        <strong>Description (des):</strong>
        {renderDescription(productInfo.des)}
      </p>
      <hr />
      {/* แสดงผล description 
      <p className="text-base text-gray-600">
        <strong>Description (description):</strong>
        {renderDescription(productInfo.description)}
      </p> */}


      {/* แสดงผล des ถ้ามีค่า */}
      {productInfo.des && (
        <p className="text-base text-gray-600">
          <strong>Description (des):</strong>
          {renderDescription(productInfo.des)}
        </p>
      )}

      {/* แสดงผล description ถ้ามีค่า */}
      {productInfo.description && (
        <p className="text-base text-gray-600">
          <strong>Description (description):</strong>
          {renderDescription(productInfo.description)}
        </p>
      )}

      <div className="flex items-center">
        <p className="text-sm mr-2">Leave a review</p>
        {/* SVG Icons omitted for brevity */}
      </div>

      <p className="text-base text-green-600 font-medium">En Stock</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>

      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>

      <p className="font-normal text-sm">
        <span className="text-base font-medium">Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

ProductInfo.propTypes = {

  productInfo: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    // id: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    badge: PropTypes.string,
    price: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    description: PropTypes.string, 
    quantity: PropTypes.number

  }).isRequired
  
};

// ProductInfo.defaultProps = {
//   productInfo: {},
// };



export default ProductInfo;
