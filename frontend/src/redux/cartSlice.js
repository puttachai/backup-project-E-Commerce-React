// ตัวอย่างใน cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload; // อัปเดต cart ด้วยข้อมูลใหม่
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
