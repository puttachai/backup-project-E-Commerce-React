// import { toast } from "react-toastify";
// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {

//   products: [], // รายการสินค้าในตะกร้าของผู้ใช้
// }

// export const setCarts = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {

//     addToCart: (state, action) => {
//       // หา item โดยใช้ทั้ง _id และ id
//       const item = state.products.find(
//         (item) => item._id === action.payload._id && 
//         item.id === action.payload.id //item._id === action.payload._id
//       );
//       if (item) {
//          // ถ้ามี item อยู่แล้ว ให้เพิ่ม quantity
//         item.quantity += action.payload.quantity;
//       } else {
//         // ถ้าไม่มี ให้เพิ่มสินค้าใหม่
//         state.products.push(action.payload);
//       }
//       // Dispatch a success toast 
//       toast.success("Product add to cart");
//     },

//   },
// });

// export const {
//   addToCart,
// } = setCarts.actions;
// export default setCarts.reducer;




// export const setCart = (cart) => {
//     return {
//       type: "SET_CART",
//       payload: cart,

//       addToCart: (state, action) => {
//         // หา item โดยใช้ทั้ง _id และ id
//         const item = state.products.find(
//           (item) => item._id === action.payload._id && 
//           item.id === action.payload.id //item._id === action.payload._id
//         );
//         if (item) {
//            // ถ้ามี item อยู่แล้ว ให้เพิ่ม quantity
//           item.quantity += action.payload.quantity;
//         } else {
//           // ถ้าไม่มี ให้เพิ่มสินค้าใหม่
//           state.products.push(action.payload);
//         }
//         // Dispatch a success toast 
//         toast.success("Product add to cart");
//       },
      
//     };
//   };

// export const fetchCartItems = () => async (dispatch) => {
//   try {
//     const userId = localStorage.getItem("user_id");
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cart`, { params: { userId } });
//     dispatch({ type: "FETCH_CART_ITEMS_SUCCESS", payload: response.data });
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//   }
// };

// export const addToCartTest = (item) => ({
//   type: "ADD_TO_CART",
//   payload: item,
// });

  
//   export const clearCart = () => ({ type: "CLEAR_CART" });
  

//import { toast } from "react-toastify";
import axios from "axios";

// Action Types
export const ADD_TO_CART = "ADD_TO_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_ITEM = "DELETE_ITEM";

export const FETCH_CART_ITEMS_SUCCESS = "FETCH_CART_ITEMS_SUCCESS";
export const CLEAR_CART = "CLEAR_CART";

export const TOGGLE_BRAND = "TOGGLE_BRAND";
export const TOGGLE_CATEGORY = "TOGGLE_CATEGORY";

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});


export const increaseQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: productId,
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

export const deleteItem = (productId) => ({
  type: DELETE_ITEM,
  payload: productId,
});


export const toggleBrand = (brand) => ({
  type: TOGGLE_BRAND,
  payload: brand,
});

export const toggleCategory = (category) => ({
  type: TOGGLE_CATEGORY,
  payload: category,
});


export const fetchCartItemsSuccess = (cartItems) => ({
  type: FETCH_CART_ITEMS_SUCCESS,
  payload: cartItems,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const loginSuccess = (user, token) => ({
  type: 'LOGIN_SUCCESS',
  payload: { user, token },
});

// Thunk to fetch cart items
export const fetchCartItems = () => async (dispatch) => {
  try {
    const userId = localStorage.getItem("user_id");
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/cart`,
      { params: { userId } }
    );
    dispatch(fetchCartItemsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};
