
// // export default ProfilePage;
// ////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux"; //useSelector
// import { Link } from "react-router-dom"; // Import Link for routing
// import { motion } from "framer-motion"; // Import motion for animation
// import emptyCart from "../../src/assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)
// import defaultProfileImage from "../assets/images/userProfile/user_default.jpg"; // Default profile image

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// function ProfilePage() {
    
//   const [profileImage, setProfileImage] = useState(null);
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");//wichuda
//   const [email, setEmail] = useState("");//wi********@gmail.com
//   const [phoneNumber, setphoneNumber] = useState("");//********69
//   const [Gender, setGender] = useState("");//Female
//   const [date_of_birth, setDob] = useState("");//**/03/20**

//   const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login

//   let imageProfile = localStorage.getItem('image_profile');

//   console.log("Log imageProfile: ", imageProfile);

//   const [loading, setLoading] = useState(false);//loading


//   useEffect(() => {
//     // Fetch user profile from backend
//     const fetchProfile = async () => {
//       try {
//         const userId = localStorage.getItem("user_id");
//         console.log("localStorage ID: ",userId);
//         const token = localStorage.getItem('authToken'); // หรือดึงจาก Context
//         //const response = await fetch(`${BASE_URL}/api/profile`, {
//         //   userId,
//         const response = await fetch(`${BASE_URL}/api/profile?userId=${userId}`, {
//           userId,
//           method: "GET",
//           headers: {
//             //Authorization: `Bearer ${userId}`, token
//             "Content-Type": "application/json",
//             'Cache-Control': 'no-cache',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("res json: ",response.text);
//         console.log("res ok: ",response.ok);
//         console.log("res body: ",response.body);

//         if (response.ok) {
//           const data = await response.json();
//           console.log("data log: ",data);

//           setUsername(data.username);
//           setName(data.name);
//           setEmail(data.email);
//           setphoneNumber(data.phoneNumber);
//           console.log("data.phoneNumber: ",data.phoneNumber);
//           console.log("data.email: ",data.email);
//           setGender(data.Gender);
//           console.log("data.gender: ",data.Gender);
//           setDob(data.date_of_birth);
//           console.log("data.date_of_birth: ",data.date_of_birth);
//           // setDob(formattedDob); // ตั้งค่าวันเกิดที่แปลงแล้ว
//           // console.log("formattedDob: ",data.formattedDob);
//           //setDob(formattedDob); // วันเกิดที่แปลงแล้ว
//           setProfileImage(data.imageProfile || defaultProfileImage);
//           console.log("imageProfile: ",data.imageProfile);
//         } else {
//           console.error("Failed to fetch profile data");
//         }
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // const handleImageChange = (event) => {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     setProfileImage(URL.createObjectURL(file));
//   //   }
//   // };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result); // แสดงตัวอย่างรูปภาพที่เลือก
//       };
//       reader.readAsDataURL(file);
//     }
//   };


// // ตัวทดลองล่าสุด การทดลองครั้งที่ 3
// const handleSave = async () => {
//   try {
//     const userId = localStorage.getItem("user_id");

//     // ตรวจสอบว่า 'date_of_birth' เป็นวันที่ที่ถูกต้องก่อน
//     const dateObject = new Date(date_of_birth);
//     if (isNaN(dateObject)) {
//       alert("กรุณากรอกวันที่ที่ถูกต้อง");
//       return;
//     }

//     const formattedDob = dateObject.toISOString().split("T")[0];

//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phoneNumber", phoneNumber);
//     formData.append("Gender", Gender);
//     formData.append("date_of_birth", formattedDob);

//     // ถ้ามีไฟล์ให้แนบ
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput && fileInput.files[0]) {
//       formData.append("image_profile", fileInput.files[0]);
//     }

//     setLoading(true);

//     const response = await fetch(`${BASE_URL}/api/profile?userId=${userId}`, {
//       method: "PUT",
//       body: formData,
//       headers: {
//         'Cache-Control': 'no-cache',// ห้ามแคช
//       }
//     });

//     setLoading(true);

//     if (response.ok) {
//       const data = await response.json();
//       setLoading(true);
//       //alert(data.message);

//       // อัปเดตโปรไฟล์ทันที
//       if (data.user) {
//         //setProfileImage(`${BASE_URL}/${data.user.image_profile}` || defaultProfileImage);
//         const updatedImage =`${BASE_URL}/images/userprofile/${data.user.image_profile}` || defaultProfileImage;
//         localStorage.setItem('image_profile', updatedImage);
//         setProfileImage(updatedImage);
//         setUsername(data.user.username);
//         setName(data.user.name);
//         setEmail(data.user.email);
//         setphoneNumber(data.user.phoneNumber);
//         setGender(data.user.Gender);
//         setDob(data.user.date_of_birth);

//         console.log("Updated profile image: ", updatedImage);
//         console.log("LocalStorage Image Profile: ", localStorage.getItem('image_profile'));
        
//         window.location.reload(setLoading(false));
//         //setLoading(false);
//       }
//     } else {
//       console.error("Failed to update profile");
//     }
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     setLoading(false);
//   }
// };


// // ตรวจสอบว่า imageProfile เป็นค่า /images/userprofile/null หรือไม่
// if (imageProfile === '/images/userprofile/null' || !imageProfile) {
//   console.log("No profile image found. Using default image.");
//   imageProfile = defaultProfileImage;  // เส้นทางภาพเริ่มต้น
// } else {
//   console.log("User profile image found:", imageProfile);
// }


// //imageProfile = JSON.parse(imageProfile); // แปลงจาก "null" เป็น null จริง
// const Profileuser = imageProfile || defaultProfileImage;

// console.log("Profileuser: ", Profileuser);


// if (loading) {
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="flex flex-col items-center">
//         <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
//         <p className="mt-4 text-gray-600 font-medium">Loading, please wait...</p>
//       </div>
//     </div>
//   );
// }

// if (!profileImage) {
//   // แสดงสัญลักษณ์โหลดหรือเนื้อหาแทนที่ระหว่างโหลด
//   return <div>Loading...</div>;
// }
// if (!imageProfile) {
//   // แสดงสัญลักษณ์โหลดหรือเนื้อหาแทนที่ระหว่างโหลด
//   return <div>!imageProfile Loading...</div>;
// }

//   return (
//     <>
//       {isLoggedIn ? (
//         // เมื่อผู้ใช้ล็อกอินแล้ว
//         <div className="container mx-auto mt-8 mb-8 p-6 bg-white shadow-md rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* คอลัมน์ด้านซ้าย: รูปโปรไฟล์ */}
//             <div className="text-center">
//               <h3 className="text-2xl font-bold mb-4">My Profile</h3>
//               <div className="mb-4">
//                 <img
//                   src={Profileuser}
//                   className="w-32 h-32 rounded-full mx-auto"
//                   alt="Profile"
//                 />
//                 <div className="mt-4">
//                   <input
//                     type="file"
//                     accept=".jpg,.jpeg,.png"
//                     onChange={handleImageChange}
//                     className="block mx-auto mb-4"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* คอลัมน์ด้านขวา: แบบฟอร์ม */}
//             <div className="col-span-2">
//               <h4 className="text-xl font-semibold mb-4">Manage and protect your account</h4>
//               <form onSubmit={(e) => e.preventDefault()}>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Username</label>
//                   <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     readOnly
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Name</label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Email</label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Phone Number</label>
//                   <input
//                     type="text"
//                     value={phoneNumber}
//                     onChange={(e) => setphoneNumber(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Gender</label>
//                   <div className="flex items-center">
//                     <label className="mr-4">
//                       <input
//                         type="radio"
//                         value="Male"
//                         checked={Gender === "Male"}
//                         onChange={(e) => setGender(e.target.value)}
//                         className="mr-2"
//                       />
//                       Male
//                     </label>
//                     <label className="mr-4">
//                       <input
//                         type="radio"
//                         value="Female"
//                         checked={Gender === "Female"}
//                         onChange={(e) => setGender(e.target.value)}
//                         className="mr-2"
//                       />
//                       Female
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         value="Other"
//                         checked={Gender === "Other"}
//                         onChange={(e) => setGender(e.target.value)}
//                         className="mr-2"
//                       />
//                       Other
//                     </label>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium">Date of Birth</label>
//                   <input
//                     type="date"
//                     value={date_of_birth}//date_of_birth
//                     onChange={(e) => setDob(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   onClick={handleSave}
//                   className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
//                 >
//                   Save
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       ) : (
//         // เมื่อผู้ใช้ยังไม่ได้ล็อกอิน
//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.4 }}
//           className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
//         >
//           <div>
//             <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="emptyCart" />
//           </div>
//           <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
//             <h1 className="font-titleFont text-xl font-bold uppercase">
//               You need to log in to access your cart.
//             </h1>
//             <Link to="/signin">
//               <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
//                 Log In
//               </button>
//             </Link>
//           </div>
//         </motion.div>
//       )}
//     </>
//   );
// }

// export default ProfilePage;


// export default ProfilePage;
////////////////////////////////////////////////////////////////////

import React, { useState } from "react"; //useEffect
import { useSelector, useDispatch } from "react-redux"; //useSelector
import { Link, Outlet, useNavigate } from "react-router-dom"; // Import Link for routing
import { motion } from "framer-motion"; // Import motion for animation
import emptyCart from "../../src/assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)
import { FaCaretDown } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import {  setLoginStatus } from '../redux/logout'; // Correctly import the action

const BASE_URL = process.env.REACT_APP_BASE_URL;

function ProfilePage() {
    
   const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login

  // สร้าง state เพื่อจัดการการแสดงของ Sub Menu
  const [activeMenu, setActiveMenu] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับจัดการการคลิก Main Menu
  const toggleMenus = (menuName) => {
    setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  
  const handleLogout = async () => {
    console.log('show:', isLoggedIn);
  
    Swal.fire({
      title: "Do you want to logout?",
      text: "Click confirm to log out.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#f44336",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // เรียก API เพื่อล้างข้อมูลตะกร้าบนเซิร์ฟเวอร์
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('authToken');
          if (userId) {
            await axios.post(`${BASE_URL}/api/cart/clear`, { userId ,
              headers: {
              //'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },});
          }
  
          // ล้างข้อมูลใน Redux
          dispatch(setLoginStatus(false));
          //dispatch(setCart([]));
  
          // ลบข้อมูลที่เก็บไว้ใน localStorage
          localStorage.removeItem('image_profile');
          localStorage.removeItem('username');
          // localStorage.removeItem('status_seller');
          localStorage.removeItem('token');
          //authToken lสำคัญ !!
          localStorage.removeItem('userId'); // ลบ userId
          localStorage.removeItem('user_id'); // ลบ user_id เพื่อให้แน่ใจว่าไม่เหลือข้อมูลเก่า
          localStorage.removeItem('authToken'); // ลบ authToken
  
          console.log('Logout successful');
  
          // นำทางผู้ใช้ไปยังหน้าแรก
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
          Swal.fire("Error", "Logout failed. Please try again.", "error");
        }
      }
    });
  };

return (
  <>
    {isLoggedIn ? (
      <div className="bg-white w-full flex flex-col gap-2 px-3 py-16 lg:px-28 md:flex-row text-[#161931]"> {/* md:px-16 */}
        

    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
      <div className="sticky flex flex-col gap-4 p-[0.25rem] text-sm border-r border-indigo-100 top-12">
        <div className="mt-1 mb-3">
          {/* Main Menu: My Account */}
          <div className="flex items-center">
            {/* mb-4 */}
          <h2
            className="pl-3 text-1xl font-semibold text-gray-800 cursor-pointer" 
            aria-label="Main Menu"
            onClick={() => toggleMenus("myAccount")}
          >
            บัญชีของฉัน
          </h2>
          <FaCaretDown className="ml-2"/>
          </div>
          {/* Sub Menu: My Account */}
          {activeMenu === "myAccount" && (
            <div className="pl-2">
              <Link
                to="/profile/history"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                ประวัติ
              </Link>
              <Link
                to="/profile/bankandcard"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                บัญชีธนาคาร & บัตร
              </Link>
              <Link
                to="/profile/addresslist"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                ที่อยู่
              </Link>
              {/*  
              <Link
                to="/profile/change-password"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                เปลี่ยนรหัสผ่าน
              </Link> */}
              {/* <Link
                to="/profile/privacy"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                การตั้งค่าความเป็นส่วนตัว
              </Link>
              <Link
                to="/profile/notifications"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                ตั้งค่าการแจ้งเตือน
              </Link> */}
            </div>
          )}
        </div>

        <div className="mb-1 mb-3">
          {/* Main Menu: My Purchases */}
          <div className="flex items-center">
            <h2
              className="pl-3 text-1xl font-semibold text-gray-800 cursor-pointer"
              aria-label="Main Menu"
              onClick={() => toggleMenus("myPurchases")}
            >
              การซื้อของฉัน
            </h2>
            <FaCaretDown className="ml-2"/>
          </div>
          {/* Sub Menu: My Purchases */}
          {activeMenu === "myPurchases" && (
            <div className="pl-2">
              <Link
                to="/profile/purchases"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                การซื้อของฉัน
              </Link>
            </div>
          )}
        </div>

        <div className="mb-1 mb-3">
          {/* Main Menu: Discount Codes */}
          <div className="flex items-center">
            <h2
              className="pl-3 text-1xl font-semibold text-gray-800 cursor-pointer"
              aria-label="Main Menu"
              onClick={() => toggleMenus("discountCodes")}
            >
              โค้ดส่วนลด
            </h2>
            <FaCaretDown className="ml-2"/>
          </div>
          {/* Sub Menu: Discount Codes */}
          {activeMenu === "discountCodes" && (
            <div className="pl-2">
              <Link
                to="/profile/discounts"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                โค้ดส่วนลดของฉัน
              </Link>
            </div>
          )}
        </div>
        <div className="mb-1 mb-3">
          {/* Main Menu: Gekko Coins */}
          <div className="flex items-center">
            <h2
              className="pl-3 text-1xl font-semibold text-gray-800 cursor-pointer"
              aria-label="Main Menu"
              onClick={() => toggleMenus("gekkoCoins")}
            >
              Gekko Coins
            </h2>
            <FaCaretDown className="ml-2"/>
          </div>
          {/* Sub Menu: Gekko Coins */}
          {activeMenu === "gekkoCoins" && (
            <div className="pl-2">
              <Link
                to="/profile/shopee-coins"
                className="flex items-center px-4 py-2.5 font-semibold text-gray-600 hover:text-indigo-900 hover:border hover:rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Gekko Coins ของฉัน
              </Link>
            </div>
          )}
        </div>
        <div className="mb-1 mb-3">
          {/* Main Menu: Gekko Coins */}
          <div className="flex items-center">
          <h2 onClick={handleLogout} className="pl-3 text-1xl font-semibold text-gray-800 cursor-pointer">Logout</h2>
            {/* <h2
              className="pl-3 text-1xl font-semibold text-gray-800 cursor-pointer"
              aria-label="Main Menu"
              onClick={() => toggleMenus("gekkoCoins")}
            >
              Logout
            </h2> */}
            {/* <FaCaretDown className="ml-2"/> */}
          </div>
          </div>
      </div>
    </aside>
    <Outlet />
        
      </div>
    ) : (
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20 pt-20"
      >
        <div>
            <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="emptyCart" />
        </div>
        <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
          <h1 className="font-titleFont text-xl font-bold uppercase">
            You need to log in to access your profile.
          </h1>
          <Link to="/signin">
            <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
              Log In
            </button>
          </Link>
        </div>
      </motion.div>
    )}
  </>
);
}

export default ProfilePage;

////////////////////////////// Laster ////////////////////////////////////

// {/* <main className="flex flex-col mt-6 mb-6 items-center w-full min-h-screen ">

// {/* Profile Section */}
// <section className="flex flex-col items-center w-full px-6 py-8 mt-8 bg-white rounded-lg shadow sm:max-w-4xl">

// <div className="flex flex-col items-center space-y-5 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
//          <img
//            className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
//            src={Profileuser}
//            alt="Profile"
//          />
//          <div className="flex flex-col space-y-4 text-center sm:text-left">
//            <div className="cursor-pointer py-3 px-6 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
//              <label
//                htmlFor="fileUpload"
//                // className="cursor-pointer py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
//              >
//                Change Picture
//              </label>
//              <input
//                id="fileUpload"
//                type="file"
//                accept=".jpg,.jpeg,.png"
//                onChange={handleImageChange}
//                className="hidden" // ซ่อน input จริง
//              />
//            </div>
         
//          </div>
//        </div>

//   {/* Profile Details */}
//   <form className="flex flex-col w-full gap-4">
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Name</label>
//       <input
//         type="text"
//         className="px-4 py-2 border rounded-md"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Email</label>
//       <input
//         type="email"
//         className="px-4 py-2 border rounded-md"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Phone Number</label>
//       <input
//         type="text"
//         className="px-4 py-2 border rounded-md"
//         value={phoneNumber}
//         onChange={(e) => setphoneNumber(e.target.value)}
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Gender</label>
//       <select
//         className="px-4 py-2 border rounded-md"
//         value={Gender}
//         onChange={(e) => setGender(e.target.value)}
//       >
//         <option value="Female">Female</option>
//         <option value="Male">Male</option>
//         <option value="Other">Other</option>
//       </select>
//     </div>
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Date of Birth</label>
//       <input
//         type="date"
//         className="px-4 py-2 border rounded-md"
//         value={date_of_birth}
//         onChange={(e) => setDob(e.target.value)}
//       />
//     </div>

//     {/* Save Button */}
//     <button
//       type="button"
//       className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//       onClick={handleSave}
//     >
//       Save Changes
//     </button>
//   </form>
// </section>
// </main>  */}


//////////////////////////////////////////////

// {/* <main className="flex flex-col mt-6 mb-6 items-center w-full min-h-screen ">

// {/* Profile Section */}
// <section className="flex flex-col items-center w-full px-6 py-8 mt-8 bg-white rounded-lg shadow sm:max-w-4xl">
//   {/* Profile Image */}
//   <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full">
//     <img
//       src={Profileuser || defaultProfileImage}
//       alt="User Profile"
//       className="object-cover w-full h-full"
//     />
//     <label
//       htmlFor="upload-image"
//       className="absolute bottom-0 right-0 w-8 h-8 text-white bg-indigo-500 rounded-full cursor-pointer hover:bg-indigo-600"
//     >
//       +
//     </label>
//     <input
//       id="upload-image"
//       type="file"
//       className="hidden"
//       onChange={handleImageChange}
//     />
//   </div>

//   {/* Profile Details */}
//   <form className="flex flex-col w-full gap-4">
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Name</label>
//       <input
//         type="text"
//         className="px-4 py-2 border rounded-md"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Email</label>
//       <input
//         type="email"
//         className="px-4 py-2 border rounded-md"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Phone Number</label>
//       <input
//         type="text"
//         className="px-4 py-2 border rounded-md"
//         value={phoneNumber}
//         onChange={(e) => setphoneNumber(e.target.value)}
//       />
//     </div>
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Gender</label>
//       <select
//         className="px-4 py-2 border rounded-md"
//         value={Gender}
//         onChange={(e) => setGender(e.target.value)}
//       >
//         <option value="Female">Female</option>
//         <option value="Male">Male</option>
//         <option value="Other">Other</option>
//       </select>
//     </div>
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-semibold text-gray-700">Date of Birth</label>
//       <input
//         type="date"
//         className="px-4 py-2 border rounded-md"
//         value={date_of_birth}
//         onChange={(e) => setDob(e.target.value)}
//       />
//     </div>

//     {/* Save Button */}
//     <button
//       type="button"
//       className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//       onClick={handleSave}
//     >
//       Save Changes
//     </button>
//   </form>
// </section>
// </main> */}







////////////////// Main //////////////////////


// <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
//           <div className="p-2 md:p-4">
//             <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
//               <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
//               <div className="grid max-w-2xl mx-auto mt-8">
//                 {/* <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
//                   <img
//                     className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
//                     // src={profileData.image}
//                     src={Profileuser}
//                     alt="Profile"
//                   />
//                   <div className="flex flex-col space-y-5 sm:ml-8">
//                   <div className="mt-4">
//                     <label htmlFor="fileUpload" className="cursor-pointer py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
//                       Change Picture
//                     </label>
//                     <input
//                       id="fileUpload"
//                       type="file"
//                       accept=".jpg,.jpeg,.png"
//                       onChange={handleImageChange}
//                       className="hidden" // ซ่อน input จริง
//                     />
//                   </div>
//                     {/* <button
//                       type="button"
//                       className="py-3.5 px-7 text-base font-medium text-indigo-100 bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
//                       onClick={handleImageChange}
//                     >
//                       Change picture
//                     </button> 
//                     <button
//                       type="button"
//                       className="py-3.5 px-7 text-base font-medium text-indigo-900 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
//                       // onClick={handleImageChange}
//                     >
//                       Delete picture
//                     </button>
//                   </div>
//                 </div> */}
//                 <div className="flex flex-col items-center space-y-5 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-8">
//                   <img
//                     className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
//                     src={Profileuser}
//                     alt="Profile"
//                   />
//                   <div className="flex flex-col space-y-4 text-center sm:text-left">
//                     <div className="cursor-pointer py-3 px-6 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
//                       <label
//                         htmlFor="fileUpload"
//                         // className="cursor-pointer py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
//                       >
//                         Change Picture
//                       </label>
//                       <input
//                         id="fileUpload"
//                         type="file"
//                         accept=".jpg,.jpeg,.png"
//                         onChange={handleImageChange}
//                         className="hidden" // ซ่อน input จริง
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       className="py-3 px-6 text-base font-medium text-indigo-900 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
//                     >
//                       Delete picture
//                     </button>
//                   </div>
//                 </div>

//                 <div className="items-center mt-8 sm:mt-14 text-[#202142]">
//                   <div className="flex flex-col items-center w-full mb-2 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    
//                     <div className="w-full">
//                       <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900">
//                         Your first name
//                       </label>
//                       <input
//                         type="text"
//                         id="first_name"
//                         className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                         placeholder="Your first name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                       />
//                     </div>

//                     <div className="w-full">
//                       <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-indigo-900">
//                         Your last name
//                       </label>
//                       <input
//                         type="text"
//                         id="last_name"
//                         className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                         placeholder="Your last name"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="w-full sm:mb-6">
//                       <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900">
//                         Username
//                       </label>
//                       <input
//                         type="text"
//                         id="first_name"
//                         className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                         placeholder="Your first name"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                       />
//                     </div>
//                   <div className="mb-2 sm:mb-6">
//                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900">
//                       Your email
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                       placeholder="your.email@mail.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="mb-2 sm:mb-6">
//                     <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900">
//                       Profession
//                     </label>
//                     <input
//                       type="text"
//                       id="profession"
//                       className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                       placeholder="Your profession"
//                       required
//                     />
//                   </div>
//                   {/* <div className="mb-6">
//                     <label htmlFor="message" className="block mb-2 text-sm font-medium text-indigo-900">
//                       Bio
//                     </label>
//                     <textarea
//                       id="message"
//                       rows="4"
//                       className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="Write your bio here..."
//                     ></textarea>
//                   </div> */}
//                   <div className="flex justify-end">
//                     <button
//                       type="submit"
//                       className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//                       onClick={handleSave}
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>