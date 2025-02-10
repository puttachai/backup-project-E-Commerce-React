// const initialState = { products: [] };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_CART":
//       return { ...state, products: action.payload };
//     case "CLEAR_CART":
//       return { ...state, products: [] };
//     default:
//       return state;
//   }
// };

// export default cartReducer;


// // initialState ของคุณจะใช้ items แทน products
// const initialState = { items: [] };

// // cartReducer ที่ใช้ action types "FETCH_CART_ITEMS_SUCCESS" และ "ADD_TO_CART"
// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // การดึงข้อมูลตะกร้า
//     case "FETCH_CART_ITEMS_SUCCESS":
//       return { ...state, items: action.payload };

//     // การเพิ่มสินค้าในตะกร้า
//     case "ADD_TO_CART":
//       return { ...state, items: [...state.items, action.payload] };

//     // เคลียร์ข้อมูลตะกร้า
//     case "CLEAR_CART":
//       return { ...state, items: [] };

//     default:
//       return state;
//   }
// };

// export default cartReducer;




import { toast } from "react-toastify";

const initialState = { 
  items: [],
  checkedBrands: [],
  checkedCategories: [], 
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // ค้นหาสินค้าในตะกร้า
      const item = state.items.find(
        (item) => item._id === action.payload._id && item.id === action.payload.id
      );

      // ถ้าสินค้ามีอยู่แล้ว ให้เพิ่มจำนวน
      if (item) {
        // ใช้การทำสำเนา state เพื่อไม่ให้แก้ไข state โดยตรง
        const updatedItems = state.items.map((item) =>
          item._id === action.payload._id && item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        toast.success("Product added to cart");
        return { ...state, items: updatedItems };
      } else {
        // ถ้าสินค้าไม่มีในตะกร้า ให้เพิ่มสินค้าใหม่
        const updatedItems = [...state.items, action.payload];
        // toast.success("Product added to cart");
        toast.success('🦄 Product added to cart', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
          });
         
        return { ...state, items: updatedItems };
      }
    }

    // case "INCREASE_QUANTITY": {
    //   const item = state.items.find((item) => item.id === action.payload.id && item._id === action.payload._id);//item.id === action.payload
    //   //if (item) item.quantity++;
    //   if (item) {
    //     item.quantity++;
    //     // Dispatch a success toast
    //   }
    //   console.log("INCREASE_QUANTITY: ",item);
    //   toast.info("Increased product quantity");
    //   return { ...state, items: [...state.items] };
    // }

    case "INCREASE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
          item.id === action.payload.id && item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 } // สร้าง object ใหม่
              : item
      );
      toast.info("Increased product quantity");
      return { ...state, items: updatedItems }; // คืนค่ารูปแบบ state ใหม่
  }
  

    // case "DECREASE_QUANTITY": {
    //   const item = state.products.find(
    //   //const item = state.items.find((item) => item.id === action.payload);
    //   (item) => item._id === action.payload._id && item.id === action.payload.id
    // );
    // if (item.quantity === 1) {
    //   item.quantity = 1;
    //   //toast.info("Decreased product quantity");
    // } else {
    //   item.quantity--;
    //   //toast.warning("Minimum quantity reached");
    //   toast.info("Decreased product quantity");
    //   // Dispatch a success toast
    // }
 
    //   // if (item && item.quantity > 1) {
    //   //   item.quantity--;
    //   //   console.log("DECREASE_QUANTITY: ",item.quantity);
    //   //   toast.info("Decreased product quantity");
    //   // } else {
    //   //   toast.warning("Minimum quantity reached");
    //   // }
    //   return { ...state, items: [...state.items] };
    // }

    case "DECREASE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
          item.id === action.payload.id && item._id === action.payload._id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) } // ลดค่าจำนวนลง
              : item
      );
      toast.info("Decreased product quantity");
      return { ...state, items: updatedItems };
  }

    case "DELETE_ITEM":
      toast.error("Product removed from cart");
      return {
        ...state,
        //items: state.items.filter((item) => item.id !== action.payload),
        items: state.items.filter((item) => !(item._id === action.payload._id && item.id === action.payload.id)),
      };
      // deleteItem: (state, action) => {
      //   state.products = state.products.filter(
      //     (item) => !(item._id === action.payload._id && item.id === action.payload.id)
      //     //(item) => item._id !== action.payload._id || item.id !== action.payload.id //item._id !== action.payload
      //   );
      //   // Dispatch a success toast
      //   toast.error("Product removed from cart");
      // },


      case "TOGGLE_BRAND": {
        const isBrandChecked = state.checkedBrands.some(
          (brand) => brand._id === action.payload._id
        );
        const updatedBrands = isBrandChecked
          ? state.checkedBrands.filter((brand) => brand._id !== action.payload._id)
          : [...state.checkedBrands, action.payload];
        return { ...state, checkedBrands: updatedBrands };
      }
  
      case "TOGGLE_CATEGORY": {
        const isCategoryChecked = state.checkedCategories.some(
          (category) => category._id === action.payload._id
        );
        const updatedCategories = isCategoryChecked
          ? state.checkedCategories.filter(
              (category) => category._id !== action.payload._id
            )
          : [...state.checkedCategories, action.payload];
        return { ...state, checkedCategories: updatedCategories };
      }


    case "FETCH_CART_ITEMS_SUCCESS":
      return { ...state, items: action.payload };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default cartReducer;




// import { toast } from "react-toastify";

// const initialState = { items: [] };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART": {
//       const item = state.items.find(
//         (item) => item._id === action.payload._id && item.id === action.payload.id
//       );
//       if (item) {
//         item.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       } 
//       toast.success("Product added to cart");
//       return { ...state, items: [...state.items] };
//     }

//     case "FETCH_CART_ITEMS_SUCCESS":
//       return { ...state, items: action.payload };

//     case "CLEAR_CART":
//       return { ...state, items: [] };

//     default:
//       return state;
//   }
// };

// export default cartReducer;
