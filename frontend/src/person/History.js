// import React from "react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; //useSelector
import { motion } from "framer-motion"; // Import motion for animation
import emptyCart from "../../src/assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)
import defaultProfileImage from "../assets/images/userProfile/user_default.jpg"; // Default profile image
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const History = () => {

      const [profileImage, setProfileImage] = useState(null);
      const [username, setUsername] = useState("");
      const [name, setName] = useState("");//activeMenu
      const [email, setEmail] = useState("");//wi********@gmail.com
      const [phoneNumber, setphoneNumber] = useState("");//********69
      const [Gender, setGender] = useState("");//Female
      const [date_of_birth, setDob] = useState("");//**/03/20**

      const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login

      let imageProfile = localStorage.getItem('image_profile');

      console.log("Log imageProfile: ", imageProfile);

      const [loading, setLoading] = useState(false);//loading


      useEffect(() => {
        // Fetch user profile from backend
        const fetchProfile = async () => {
          try {
            const userId = localStorage.getItem("user_id");
            console.log("localStorage ID: ",userId);
            const token = localStorage.getItem('authToken'); // หรือดึงจาก Context
            //const response = await fetch(`${BASE_URL}/api/profile`, {
            //   userId,
            const response = await fetch(`${BASE_URL}/api/profile?userId=${userId}`, {
              userId,
              method: "GET",
              headers: {
                //Authorization: `Bearer ${userId}`, token
                "Content-Type": "application/json",
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${token}`,
              },
            });

            console.log("res json: ",response.text);
            console.log("res ok: ",response.ok);
            console.log("res body: ",response.body);

            if (response.ok) {
              const data = await response.json();
              console.log("data log: ",data);

              setUsername(data.username);
              console.log("data.phoneNumber: ",data.username);
              setName(data.name);
              setEmail(data.email);
              setphoneNumber(data.phoneNumber);
              console.log("data.phoneNumber: ",data.phoneNumber);
              console.log("data.email: ",data.email);
              setGender(data.Gender);
              console.log("data.gender: ",data.Gender);
              setDob(data.date_of_birth);
              console.log("data.date_of_birth: ",data.date_of_birth);
              // setDob(formattedDob); // ตั้งค่าวันเกิดที่แปลงแล้ว
              // console.log("formattedDob: ",data.formattedDob);
              //setDob(formattedDob); // วันเกิดที่แปลงแล้ว
              setProfileImage(data.imageProfile || defaultProfileImage);
              console.log("imageProfile: ",data.imageProfile);
            } else {
              console.error("Failed to fetch profile data");
            }
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        };

        fetchProfile();
      }, []);

      // const handleImageChange = (event) => {
      //   const file = event.target.files[0];
      //   if (file) {
      //     setProfileImage(URL.createObjectURL(file));
      //   }
      // };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImage(reader.result); // แสดงตัวอย่างรูปภาพที่เลือก
          };
          reader.readAsDataURL(file);
        }
      };


    // ตัวทดลองล่าสุด การทดลองครั้งที่ 3
    const handleSave = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        // ตรวจสอบว่า 'date_of_birth' เป็นวันที่ที่ถูกต้องก่อน
        const dateObject = new Date(date_of_birth);
        if (isNaN(dateObject)) {
          alert("กรุณากรอกวันที่ที่ถูกต้อง");
          return;
        }

        const formattedDob = dateObject.toISOString().split("T")[0];

        const formData = new FormData();
        formData.append("username", username);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("Gender", Gender);
        formData.append("date_of_birth", formattedDob);

        // ถ้ามีไฟล์ให้แนบ
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
          formData.append("image_profile", fileInput.files[0]);
        }

        setLoading(true);

        const response = await fetch(`${BASE_URL}/api/profile?userId=${userId}`, {
          method: "PUT",
          body: formData,
          headers: {
            'Cache-Control': 'no-cache',// ห้ามแคช
          }
        });

        setLoading(true);

        if (response.ok) {
          const data = await response.json();
          setLoading(true);
          //alert(data.message);

          // อัปเดตโปรไฟล์ทันที
          if (data.user) {
            //setProfileImage(`${BASE_URL}/${data.user.image_profile}` || defaultProfileImage);
            const updatedImage =`${BASE_URL}/images/userprofile/${data.user.image_profile}` || defaultProfileImage;
            localStorage.setItem('image_profile', updatedImage);
            setProfileImage(updatedImage);
            setUsername(data.user.username);
            setName(data.user.name);
            setEmail(data.user.email);
            setphoneNumber(data.user.phoneNumber);
            setGender(data.user.Gender);
            setDob(data.user.date_of_birth);

            console.log("Updated profile image: ", updatedImage);
            console.log("LocalStorage Image Profile: ", localStorage.getItem('image_profile'));
            
            window.location.reload(setLoading(false));
            //setLoading(false);
          }
        } else {
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setLoading(false);
      }
    };


    // ตรวจสอบว่า imageProfile เป็นค่า /images/userprofile/null หรือไม่
    if (imageProfile === '/images/userprofile/null' || !imageProfile) {
      console.log("No profile image found. Using default image.");
      imageProfile = defaultProfileImage;  // เส้นทางภาพเริ่มต้น
    } else {
      console.log("User profile image found:", imageProfile);
    }


    //imageProfile = JSON.parse(imageProfile); // แปลงจาก "null" เป็น null จริง
    const Profileuser = imageProfile || defaultProfileImage;

    console.log("Profileuser: ", Profileuser);

      // สร้าง state เพื่อจัดการการแสดงของ Sub Menu
      //const [activeMenu, setActiveMenu] = useState(null);

      // ฟังก์ชันสำหรับจัดการการคลิก Main Menu
      // const toggleMenus = (menuName) => {
      //   setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
      // };

      // // State สำหรับจัดการการเปิด-ปิด Sub Menu
      // const [openMenu, setOpenMenu] = useState({
      //   myAccount: false,
      //   myPurchases: false,
      //   notifications: false,
      //   discountCodes: false,
      //   gekkoCoins: false,
      // });

      // // ฟังก์ชันสลับสถานะการแสดงผล
      // const toggleMenu = (menuKey) => {
      //   setOpenMenu((prevState) => ({
      //     ...prevState,
      //     [menuKey]: !prevState[menuKey],
      //   }));
      // };


    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading, please wait...</p>
          </div>
        </div>
      );
    }

    if (!profileImage) {
      // แสดงสัญลักษณ์โหลดหรือเนื้อหาแทนที่ระหว่างโหลด
      return <div>Loading...</div>;
    }
    if (!imageProfile) {
      // แสดงสัญลักษณ์โหลดหรือเนื้อหาแทนที่ระหว่างโหลด
      return <div>!imageProfile Loading...</div>;
    }


  return (
    <>
    {isLoggedIn ? (
    <div className="bg-white w-full flex flex-col gap-2 px-3 lg:px-28 md:flex-row text-[#161931]"> {/* md:px-16 */}
      <main className="flex flex-col mt-6 mb-6 items-center w-full min-h-screen ">

          {/* Profile Section */}
          <section className="flex flex-col items-center w-full px-6 py-8 mt-8 bg-white rounded-lg shadow sm:max-w-4xl">

          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
                   <img
                     className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
                     src={Profileuser}
                     alt="Profile"
                   />
                   <div className="flex flex-col space-y-4 text-center sm:text-left">
                     <div className="cursor-pointer py-3 px-6 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                       <label
                         htmlFor="fileUpload"
                         // className="cursor-pointer py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                       >
                         Change Picture
                       </label>
                       <input
                         id="fileUpload"
                         type="file"
                         accept=".jpg,.jpeg,.png"
                         onChange={handleImageChange}
                         className="hidden" // ซ่อน input จริง
                       />
                     </div>
                   
                   </div>
                 </div>

            {/* Profile Details */}
            <form className="flex flex-col w-full gap-4">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  className="px-4 py-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded-md"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">Gender</label>
                <select
                  className="px-4 py-2 border rounded-md"
                  value={Gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  className="px-4 py-2 border rounded-md"
                  value={date_of_birth}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              {/* Save Button */}
              <button
                type="button"
                className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </form>
          </section>
          </main> 
        </div>

        ) : (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
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
};

export default History;
