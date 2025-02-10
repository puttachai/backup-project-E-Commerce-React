import { configureStore } from "@reduxjs/toolkit";//createSlice
import logoutReducer from '../redux/logout';
import cartReducer from "../redux/cartReducer";
//import { orebiSlice } from '../redux/orebiSlice'; // นำเข้า orebiSlice
//import wishlistReducer from './wishlistSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import orebiReducer from "./orebiSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, orebiReducer);

export const store = configureStore({
  reducer: { orebiReducer: persistedReducer ,loginStatus: logoutReducer ,cart: cartReducer,},//logout: logoutReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


// // ตัวอย่างการ dispatch clearProducts เมื่อทำการ logout
// import { clearProducts } from './orebiSlice';

// export const logout = () => {
//   return (dispatch) => {
//     dispatch(clearProducts()); // เคลียร์สินค้าหลังจาก logout
//     //dispatch(logoutReducer()); // ดำเนินการ logout ซ้ำทำให้แจ้งเตือนว่า Logout failed
//   };
// };


export let persistor = persistStore(store);


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
//     orebi: persistedOrebiReducer, // แก้ไขให้ตรงกับการเรียกใช้งานใน component
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


// import { configureStore } from "@reduxjs/toolkit";
// import wishlistReducer from './wishlistSlice';  // ต้องมั่นใจว่าเส้นทางนี้ถูกต้อง
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
//     orebi: persistedOrebiReducer,
//     wishlist: wishlistReducer,  // ตรวจสอบการตั้งชื่อ
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });



// export let persistor = persistStore(store);
