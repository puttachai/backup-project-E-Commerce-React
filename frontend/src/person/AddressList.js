import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; //useSelector
import { Link } from "react-router-dom"; // Import Link for routing
import { motion } from "framer-motion"; // Import motion for animation
import emptyCart from "../../src/assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)
import axios from "axios";
//import defaultProfileImage from "../assets/images/userProfile/user_default.jpg"; // Default profile image

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddressList = () => {

    const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login

    const [loading, setLoading] = useState(false);//loading
    const [popupVisible, setPopupVisible] = useState(false);

    //const [username, setUsername] = useState("");
    const [Datas, setDatas] = useState([]);//activeMenu
    const [name_las, setName_las] = useState("");//activeMenu
    const [id, setId] = useState([]);//activeMenu
    console.log("laster id: ", id);
    //const [email, setEmail] = useState("");//wi********@gmail.com
    const [phone, setPhone] = useState("");//********69
    const [addressline, setaddressline] = useState("");//Female
    //console.log("addressline laster: ",addressline);
    const [city, setCity] = useState("");//**/03/20**
    const [province, setProvince] = useState("");//**/03/20**
    const [postalCode, setPostalCode] = useState("");//**/03/20**
    const [country, setCountry] = useState("");//**/03/20**

    const handlePopupOpen = () => setPopupVisible(true);
    const handlePopupClose = () => setPopupVisible(false);

    useEffect(() => {
        // Fetch user profile from backend
        const fetchAddress = async () => {
          try {
            const userId = localStorage.getItem("user_id");
            console.log("localStorage ID: ",userId);
            const token = localStorage.getItem('authToken'); // หรือดึงจาก Context
            //const response = await fetch(`${BASE_URL}/api/profile`, {
            //   userId,
            const response = await fetch(`${BASE_URL}/api/addresses?userId=${userId}`, {
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
            console.log("res response: ",response);
            // console.log("res response.data: ",response.data);
            console.log("res ok: ",response.ok);
            console.log("res body: ",response.body);

            if (response.ok) {
              const data = await response.json();
              console.log("data log: ",data);

              // ตรวจสอบว่า data เป็น array หรือไม่
                if (Array.isArray(data)) {
                  setDatas(data);
                } else {
                  console.error("Data is not an array");
                  setDatas([]); // หากไม่ใช่ array ให้ตั้งเป็น array ว่าง
                }

              // setDatas(data);

            //   setUsername(data.username);
            //   console.log("data.phoneNumber: ",data.username);
              setId(data.id);
              console.log("data.id: ",data.id);
              setName_las(data.name_lasname);
              console.log("data.name_las: ",data.name_lasname);
              //setEmail(data.email);
            //   console.log("data.email: ",data.email);
              setPhone(data.phone);
              console.log("data.phone: ",data.phone);
              setaddressline(data.address_line);
              console.log("data.addressline: ",data.address_line);
              setCity(data.city);
              console.log("data.city: ",data.city);
              setProvince(data.province);
              console.log("data.province: ",data.province);
              setPostalCode(data.postal_code);
              console.log("data.postalCode: ",data.postal_code);
              setCountry(data.country);
              console.log("data.country: ",data.country);

                  // แสดงข้อมูลทั้งหมดจากทุก address
            data.forEach((address, index) => {
              console.log(`Address ${index + 1}: `, address);
              // ตั้งค่าแต่ละ address
              // หากต้องการเก็บข้อมูลต่าง ๆ จากแต่ละ address เช่น id, name, phone, ...
              setId(address.id);
              console.log("Address ID:", address.id);
              console.log("Name:", address.name_lasname);
              console.log("Phone:", address.phone);
              console.log("Address Line:", address.address_line);
              console.log("City:", address.city);
              console.log("Province:", address.province);
              console.log("Postal Code:", address.postal_code);
              console.log("Country:", address.country);
            });

              // setDob(formattedDob); // ตั้งค่าวันเกิดที่แปลงแล้ว
              // console.log("formattedDob: ",data.formattedDob);
              // setDob(formattedDob); // วันเกิดที่แปลงแล้ว
              // setProfileImage(data.imageProfile || defaultProfileImage);

              //console.log("imageProfile: ",data.imageProfile);
            } else {
              console.error("Failed to fetch profile data");
            }
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        };

        fetchAddress();
      }, []);


          // ตัวทดลองล่าสุด การทดลองครั้งที่ 3
    const handleInsertAddress = async () => {
       
        try {
          
          const userId = localStorage.getItem("user_id");
          console.log("userId line 107: ",userId);
          console.log("Data being sent:", {
            userId,
            name_las,
            phone,
            addressline,
            city,
            province,
            postalCode,
            country,
          });

          const response = await axios.post(`${BASE_URL}/api/addressesInto`, { //?userId=${userId}
                userId,
                name_las: name_las,
                phone: phone,
                addressline: addressline,
                city: city,
                province: province,
                postalCode: postalCode,
                country: country,
                
            // method: "POST",
            // body: formData,
            headers: {
              'Cache-Control': 'no-cache',// ห้ามแคช
            },
            // body: JSON.stringify({
            //     name_lasname: name_las,
            //     phone,
            //     addressline,
            //     city,
            //     province,
            //     postalCode,
            //     country,
            //   }),
          });
          console.log("addressline laster 146: ",addressline);
  
        //   setLoading(true);
  
          // if (response.ok) {
          //   const data = await response.json();

          //   setDatas([...Datas, data.newAddress]);
          //   handlePopupClose();
          if (response.status === 200) {
            const data = response.data;
            setDatas([...Datas, data.user]);  // Add new address data
            handlePopupClose();
            // setLoading(true);

            // alert(data.message);
  
            // อัปเดตโปรไฟล์ทันที
            if (data.user) {

              setName_las(data.user.name_las);
              setPhone(data.user.phone);
              setaddressline(data.user.addressline);
              setCity(data.user.city);
              setProvince(data.user.province);
              setPostalCode(data.user.postalCode);
              setCountry(data.user.country);

            //window.location.reload(setLoading(false));
            //setLoading(false);
            
            // แสดงข้อความแจ้งเตือนเมื่อบันทึกสำเร็จ
            alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
            // รีโหลดหน้าใหม่เมื่อบันทึกสำเร็จ
            // window.location.reload();
            }
            setLoading(false);
          } else {
            console.error("Failed to insert address");
          }

        } catch (error) {
          console.error("Error inserting address:", error);
          setLoading(false);
        }
        // setLoading(false);
      };

      const handleSubmit = () => {
        // ตรวจสอบว่าข้อมูลในฟิลด์ต่างๆ ถูกกรอกครบหรือไม่
        if (!name_las || !phone || !addressline || !city || !province || !postalCode || !country) {
          alert("กรุณากรอกข้อมูลให้ครบทุกฟิลด์");
          return; // ถ้ายังกรอกไม่ครบก็ไม่ทำการบันทึก
        }
      
        // ถ้ากรอกครบแล้ว ก็เรียกฟังก์ชันบันทึก
        handleInsertAddress();
      };

  const userId = localStorage.getItem('user_id'); // หรือดึงจาก Context

  // ฟังก์ชันในการลบสินค้า
    const handleDelete = async (addressId) => {

      console.log("address ID:", addressId); // เพิ่มก่อนเรียก axios
      if (!addressId) {
        console.error("addressId ID is missing");
        return;
    }

      try {
        const response = await axios.delete(`${BASE_URL}/api/addresses/delete`, {
          data: { userId, id: addressId }, // ส่ง userId และ productId ไปใน request body
          headers: {
            'Cache-Control': 'no-cache',// ห้ามแคช
          }
        });
        console.log("data: ", response.data);

        if (response.status === 200) {
          alert(`ลบที่อยู่ ID: ${addressId} สำเร็จ`);
          console.log('Item remove successfully',response.data);
        }
        console.log(response.data.message); // "Item removed from cart"
        // ลบข้อมูลใน state
        setDatas((prevDatas) => prevDatas.filter((item) => item.id !== addressId));
      } catch (error) {
        console.error("Failed to remove item from addresses:", error);
      }
    };

//สร้าง function ใหม่ ให้สามารถแก้ไขได้
  const handleEdit = (id) => {
    alert(`แก้ไขที่อยู่ ID: ${id}`);
  };

  // const handleDelete = (id) => {
  //   alert(`ลบที่อยู่ ID: ${id}`);
  // };

  const handleSetDefault = (id) => {
    alert(`ตั้งค่าที่อยู่ ID: ${id} เป็นค่าตั้งต้น`);
  };


  
  if (loading) {
    return (
      <div className="flex w-full justify-center my-4 items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading, please wait...</p>
        </div>
      </div>
    );
  }

//   handleInsertAddress

  return (
    <>
    {isLoggedIn ? (
    <section className="my-4 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">ที่อยู่ของฉัน</h2>
        <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        // onClick={(e) => handleInsertAddress(e.target.value)}
        onClick={handlePopupOpen}
        >
          + เพิ่มที่อยู่
        </button>
      </div>
      <div className="space-y-4">
  {Array.isArray(Datas) && Datas.length > 0 ? (
    Datas.map((itemAdd) => (
      <div key={itemAdd.id} className={" rounded px-2 py-2 border-solid border-2 border-gray-200"}>
        <div className="flex justify-between">
          <div>
            <p className="font-medium text-gray-800">{itemAdd.name_lasname}</p>
            <p className="text-sm text-gray-600">{itemAdd.phone}</p>
            {/* <p className="text-sm text-gray-600">{`${itemAdd.addressline}, ${itemAdd.city}, ${itemAdd.province}, ${itemAdd.postalCode}, ${itemAdd.country}`}</p> */}
            <p className="text-sm text-gray-600">{`${itemAdd.address_line}, ${itemAdd.city}, ${itemAdd.province}, ${itemAdd.postal_code}, ${itemAdd.country}`}</p>
            <p className="mt-2 text-sm text-red-500">ค่าเริ่มต้น</p> 
          </div>
          <div className="flex flex-col space-y-2">
            <button className="text-blue-600 hover:underline" onClick={(e) => handleEdit(e.target.value)}>
              แก้ไข
            </button>
            <button className="text-red-600 hover:underline" onClick={() => handleDelete(itemAdd.id)}>
              ลบ
            </button>
          </div>
        </div>
        {!itemAdd.isDefault && (
          <button className="mt-4 px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700" onClick={() => handleSetDefault(itemAdd.id)}>
            ตั้งเป็นค่าตั้งต้น
          </button>
        )}
      </div>
    ))
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
            <h1 className=" text-center font-titleFont text-xl font-bold uppercase">
            Add new address information.
            </h1>
            {/* <Link to="/signin">
            <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Log In
            </button>
            </Link> */}
            <button className="text-center bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300"
            // onClick={(e) => handleInsertAddress(e.target.value)}
            onClick={handlePopupOpen}
            >
              + เพิ่มที่อยู่ใหม่
            </button>
        </div>
        </motion.div>
  )}
</div>
    </section>

    ) : (
        <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col mdl:flex-row justify-center items-center mt-4 gap-4 pb-20 pb-20" //pb-20 ไม่มี พึ่งเพิ่ม
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

        {popupVisible && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-lg font-semibold mb-4">ที่อยู่ใหม่</h2>
                    <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="ชื่อ"
                        className="w-full border rounded p-2"
                        value={name_las || ""}
                        onChange={(e) => setName_las(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="เบอร์โทรศัพท์"
                        className="w-full border rounded p-2"
                        value={phone || ""}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="ที่อยู่"
                        className="w-full border rounded p-2"
                        value={addressline || ""}
                        onChange={(e) =>{
                            console.log("Address Line:", e.target.value); // แสดงค่าที่ผู้ใช้พิมพ์
                            setaddressline(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="เมือง"
                        className="w-full border rounded p-2"
                        value={city || ""}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="จังหวัด"
                        className="w-full border rounded p-2"
                        value={province || ""}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="รหัสไปรษณีย์"
                        className="w-full border rounded p-2"
                        value={postalCode || ""}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="ประเทศ"
                        className="w-full border rounded p-2"
                        value={country || ""}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={handlePopupClose}
                    >
                        ยกเลิก
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={handleSubmit}//handleInsertAddress
                    >
                        บันทึก
                    </button>
                    </div>
                </div>
                </div>
         )}
            
    </>
  );
};

export default AddressList;




// return (
//     <>
//     {isLoggedIn ? (
//     <section className="my-4 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-semibold text-gray-800">ที่อยู่ของฉัน</h2>
//         <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
//           + เพิ่มที่อยู่
//         </button>
//       </div>
//       <div className="space-y-4">
//         {addresses.map((item) => (
//           <div
//             key={item.id}
//             className={`p-4 border rounded-md ${
//               item.isDefault ? "border-red-500" : "border-gray-200"
//             }`}
//           >
//             <div className="flex justify-between">
//               <div>
//                 <p className="font-medium text-gray-800">{item.name}</p>
//                 <p className="text-sm text-gray-600">{item.phone}</p>
//                 <p className="text-sm text-gray-600">{item.address}</p>
//                 {item.isDefault && (
//                   <p className="mt-2 text-sm text-red-500">ค่าเริ่มต้น</p>
//                 )}
//               </div>
//               <div className="flex flex-col space-y-2">
//                 <button
//                   className="text-blue-600 hover:underline"
//                   onClick={() => handleEdit(item.id)}
//                 >
//                   แก้ไข
//                 </button>
//                 <button
//                   className="text-red-600 hover:underline"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   ลบ
//                 </button>
//               </div>
//             </div>
//             {!item.isDefault && (
//               <button
//                 className="mt-4 px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
//                 onClick={() => handleSetDefault(item.id)}
//               >
//                 ตั้งเป็นค่าตั้งต้น
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>

//     ) : (
//         <motion.div
//         initial={{ y: 30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//         className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
//         >
//         <div>
//             <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="emptyCart" />
//         </div>
//         <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
//             <h1 className="font-titleFont text-xl font-bold uppercase">
//             You need to log in to access your profile.
//             </h1>
//             <Link to="/signin">
//             <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
//                 Log In
//             </button>
//             </Link>
//         </div>
//         </motion.div>
//     )}
//     </>
//   );