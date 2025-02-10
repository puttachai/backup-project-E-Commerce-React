// import React, { createContext, useState, useContext } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes

// // สร้าง Context สำหรับตะกร้า
// const CartContext = createContext();

// // สร้าง Provider สำหรับให้คอมโพเนนต์ภายในแอปสามารถเข้าถึงข้อมูลใน CartContext ได้
// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // ฟังก์ชันเพื่อเพิ่มสินค้าไปยังตะกร้า
//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // PropTypes validation for children
// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired, // Ensure children is a valid React node
// };

// // Hook สำหรับใช้ Context ในคอมโพเนนต์
// export const useCart = () => useContext(CartContext);
