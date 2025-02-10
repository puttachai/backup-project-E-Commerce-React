import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  userId: null, // เก็บ user ID ของผู้ที่เข้าสู่ระบบ
  products: [], // รายการสินค้าในตะกร้าของผู้ใช้
  checkedBrands: [],
  checkedCategorys: [],
  checkedCategorysData: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId; // ตั้งค่า userId หลังจาก login
    },
    // addToCart: (state, action) => {
    //   const item = state.products.find(
    //     (item) =>
    //       item._id === action.payload._id &&
    //       item.userId === state.userId // ตรวจสอบว่าผู้ใช้เป็นคนเดียวกัน
    //   );
    //   if (item) {
    //     item.quantity += action.payload.quantity;
    //   } else {
    //     state.products.push({ ...action.payload, userId: state.userId });
    //   }
    //   toast.success("Product added to cart");
    // },
    // clearCart: (state) => {
    //   state.products = state.products.filter(
    //     (item) => item.userId !== state.userId
    //   );
    //   toast.info("Cart cleared");
    // },
    //
    addToCart: (state, action) => {
      // หา item โดยใช้ทั้ง _id และ id
      const item = state.products.find(
        (item) => item._id === action.payload._id && 
        item.id === action.payload.id //item._id === action.payload._id
      );
      if (item) {
         // ถ้ามี item อยู่แล้ว ให้เพิ่ม quantity
        item.quantity += action.payload.quantity;
      } else {
        // ถ้าไม่มี ให้เพิ่มสินค้าใหม่
        state.products.push(action.payload);
      }
      // Dispatch a success toast 
      toast.success("Product add to cart");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id && item.id === action.payload.id
        //(item) =>  item._id === action.payload._id && item.id === action.payload.id //item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        // Dispatch a success toast
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id && item.id === action.payload.id
        //(item) => item._id === action.payload._id && item.id === action.payload.id //item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        // Dispatch a success toast
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => !(item._id === action.payload._id && item.id === action.payload.id)
        //(item) => item._id !== action.payload._id || item.id !== action.payload.id //item._id !== action.payload
      );
      // Dispatch a success toast
      toast.error("Product removed from cart");
    },
    resetCart: (state) => {
      state.products = [];
      toast.info("Cart reset successfully");
      // Dispatch a success toast
    },

    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b._id === brand._id
        // (b) => b._id === brand._id || b.id === brand.id
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b._id !== brand._id
          // (b) => b._id !== brand._id || b.id === brand.id
        );
      } else {
        state.checkedBrands.push(brand);
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b._id === category._id
        // (b) => b._id === category._id || b.id === category.id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b._id !== category._id
          // (b) => b._id !== category._id || b.id === category.id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },

    // toggleCategoryData: (state, action) => {
    //   const category = action.payload;
    //   const isCategoryChecked = state.checkedCategorysData.some(
    //     (b) => b.id === category.id
    //     // (b) => b._id === category._id || b.id === category.id
    //   );

    //   if (isCategoryChecked) {
    //     state.checkedCategorysData = state.checkedCategorysData.filter(
    //       (b) => b.id !== category.id
    //       // (b) => b._id !== category._id || b.id === category.id
    //     );
    //   } else {
    //     state.checkedCategorysData.push(category);
    //   }
    // },

    toggleCategoryData: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorysData.some(
        (b) => b.categories_id === category.categories_id
      );
    
      if (isCategoryChecked) {
        // ถ้ามี category อยู่แล้ว, ก็จะไม่ทำการเพิ่มซ้ำ
        state.checkedCategorysData = state.checkedCategorysData.filter(
          (b) => b.categories_id !== category.categories_id
        );
      } else {
        // ถ้าไม่มี category อยู่, ก็จะเพิ่มเข้าไป
        state.checkedCategorysData.push(category);
      }
    },
    

    // toggleCategory: (state, action) => {
    //   const category = action.payload;
    //   const isCategoryChecked = state.checkedCategorys.some(
    //     (b) => b._id === category._id
    //     // (b) => b._id === category._id || b.id === category.id
    //   );

    //   if (isCategoryChecked) {
    //     state.checkedCategorys = state.checkedCategorys.filter(
    //       (b) => b._id !== category._id
    //       // (b) => b._id !== category._id || b.id === category.id
    //     );
    //   } else {
    //     state.checkedCategorys.push(category);
    //   }
    // },

    // action ใหม่
    clearProducts: (state) => {
      state.products = [];
      toast.info("Cart has been cleared");
    },

  },
});

export const {
  addToCart,
  setUser,
  clearCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  clearProducts, // action ใหม่
  toggleBrand,
  toggleCategory,
  toggleCategoryData,
} = orebiSlice.actions;
export default orebiSlice.reducer;
