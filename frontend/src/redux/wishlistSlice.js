import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    deleteWishlistItem: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
    },
    drecreaseWishlistQuantity: (state, action) => {
      const item = state.wishlist.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity = Math.max(item.quantity - 1, 1);
      }
    },
    increaseWishlistQuantity: (state, action) => {
      const item = state.wishlist.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      }
    },
    resetWishlist: (state) => {
      state.wishlist = [];
    }
  }
});

export const {
  addToWishlist,
  deleteWishlistItem,
  drecreaseWishlistQuantity,
  increaseWishlistQuantity,
  resetWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   wishlist: [],
// };

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     addToWishlist: (state, action) => {
//       state.wishlist.push(action.payload);
//     },
//     deleteWishlistItem: (state, action) => {
//       state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
//     },
//     drecreaseWishlistQuantity: (state, action) => {
//       const item = state.wishlist.find(item => item._id === action.payload._id);
//       if (item) {
//         item.quantity = Math.max(item.quantity - 1, 1);
//       }
//     },
//     increaseWishlistQuantity: (state, action) => {
//       const item = state.wishlist.find(item => item._id === action.payload._id);
//       if (item) {
//         item.quantity += 1;
//       }
//     },
//     resetWishlist: (state) => {
//       state.wishlist = [];
//     }
//   }
// });

// export const {
//   addToWishlist,
//   deleteWishlistItem,
//   drecreaseWishlistQuantity,
//   increaseWishlistQuantity,
//   resetWishlist,
// } = wishlistSlice.actions;

// export default wishlistSlice.reducer;


// import { configureStore } from "@reduxjs/toolkit";
// import wishlistReducer from './wishlistSlice';
// import orebiReducer from "./orebiSlice";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedOrebiReducer = persistReducer(persistConfig, orebiReducer);

// export const store = configureStore({
//   reducer: {
//     orebi: persistedOrebiReducer,  // ตรวจสอบการเรียกใช้งานใน component ให้ตรงกับการตั้งชื่อ
//     wishlist: wishlistReducer,    // เพิ่ม wishlistReducer ที่นี่
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export let persistor = persistStore(store);
