// const initialState = {
//     isLoggedIn: false, // ค่าตั้งต้น
//     userData: {},
//   };
  
//   const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_LOGIN_STATUS':
//         return {
//           ...state,
//           isLoggedIn: action.payload, // ค่า action.payload จะเป็น true หรือ false
//         };
//       default:
//         return state;
//     }
//   };
  


// src/redux/logout.js

// src/redux/logout.js

// Action
// export const setLoginStatus = (status) => ({
//   type: 'SET_LOGIN_STATUS',
//   payload: status,
// }
// );


// export const setLoginStatus = (state = initialState, action = {}) => {
//   switch (action.type) {
//     case 'SET_LOGIN_STATUS':
//       return {
//         ...state,
//         isLoggedIn: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const setLogoutStatus = (state = initialStates, action = {}) => {
//   switch (action.type) {
//     case 'SET_LOGIN_STATUS':
//       return {
//         ...state,
//         isLoggedOut: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// // Reducer
// const initialStates = {
//   isLoggedOut: false,
//   userData: {},
// };

// // Reducer
// const initialState = {
//   isLoggedIn: true,
//   userData: {},
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_LOGIN_STATUS':
//       return {
//         ...state,
//         isLoggedIn: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;


/// redux/logout.js

// Action สำหรับตั้งสถานะ login
export const setLoginStatus = (status) => ({
  type: "SET_LOGIN_STATUS",
  payload: status,
});

// Reducer สำหรับจัดการสถานะ login
const logoutReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_LOGIN_STATUS":
      return action.payload;  // อัปเดตสถานะล็อกอิน
    default:
      return state;
  }
};

export default logoutReducer;
