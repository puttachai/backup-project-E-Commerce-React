// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
// import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
// import Flex from "../../designLayouts/Flex";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { paginationItems } from "../../../constants";
// import { BsSuitHeartFill } from "react-icons/bs";

// const HeaderBottom = () => {
//   const products = useSelector((state) => state.orebiReducer.products);
//   const [show, setShow] = useState(false);
//   const [showUser, setShowUser] = useState(false);
//   const navigate = useNavigate();
//   const ref = useRef();
//   useEffect(() => {
//     document.body.addEventListener("click", (e) => {
//       if (ref.current.contains(e.target)) {
//         setShow(true);
//       } else {
//         setShow(false);
//       }
//     });
//   }, [show, ref]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [showSearchBar, setShowSearchBar] = useState(false);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   useEffect(() => {
//     const filtered = paginationItems.filter((item) =>
//       item.productName.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   }, [searchQuery]);

//   return (
//     <div className="w-full bg-[#F5F5F3] relative">
//       <div className="max-w-container mx-auto">
//         <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
//           <div
//             onClick={() => setShow(!show)}
//             ref={ref}
//             className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
//           >
//             <HiOutlineMenuAlt4 className="w-5 h-5" />
//             <p className="text-[14px] font-normal">Shop by Category</p>

//             {show && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
//               >
//                 <Link to={"category/imprimante"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Imprimante
//                   </li>
//                 </Link>

//                 <Link to={"category/ancre"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     ancre
//                   </li>
//                 </Link>
//                 <Link to={"category/Ruban"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     ruban
//                   </li>
//                 </Link>
//                 <Link to={"category/Bac"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Bac de dechet
//                   </li>
//                 </Link>
//               </motion.ul>
//             )}
//           </div>
//           <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
//             <input
//               className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
//               type="text"
//               onChange={handleSearch}
//               value={searchQuery}
//               placeholder="Search your products here"
//             />
//             <FaSearch className="w-5 h-5" />
//             {searchQuery && (
//               <div
//                 className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
//               >
//                 {searchQuery &&
//                   filteredProducts.map((item) => (
//                     <div
//                       onClick={() =>
//                         navigate(
//                           `/product/${item.productName
//                             .toLowerCase()
//                             .split(" ")
//                             .join("")}`,
//                           {
//                             state: {
//                               item: item,
//                             },
//                           }
//                         ) &
//                         setShowSearchBar(true) &
//                         setSearchQuery("")
//                       }
//                       key={item._id}
//                       className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
//                     >
//                       <img className="w-24" src={item.img} alt="productImg" />
//                       <div className="flex flex-col gap-1">
//                         <p className="font-semibold text-lg">
//                           {item.productName}
//                         </p>
//                         <p className="text-xs">
//                           {item.des.length > 100
//                             ? `${item.des.slice(0, 100)}...`
//                             : item.des}
//                         </p>
//                         <p className="text-sm">
//                           Price:{" "}
//                           <span className="text-primeColor font-semibold">
//                             ${item.price}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//           <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
//             <div onClick={() => setShowUser(!showUser)} className="flex">
//               <FaUser />
//               <FaCaretDown />
//             </div>
//             {showUser && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
//               >
//                 <Link to="/signin">
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Login
//                   </li>
//                 </Link>
//                 <Link onClick={() => setShowUser(false)} to="/signup">
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Sign Up
//                   </li>
//                 </Link>
//                 <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                   Profile
//                 </li>
//                 <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                   Others
//                 </li>
//               </motion.ul>
//             )}
//             <Link to="/cart">
//               <div className="relative">
//                 <FaShoppingCart />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {products.length > 0 ? products.length : 0}
//                 </span>
//               </div>
//             </Link>
//             <BsSuitHeartFill />
//           </div>
//         </Flex>
//       </div>
//     </div>
//   );
// };

// export default HeaderBottom;


// //ปรับแต่งครั้งที่1
// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
// import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
// import Flex from "../../designLayouts/Flex";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { paginationItems } from "../../../constants";
// import { BsSuitHeartFill } from "react-icons/bs";

// const HeaderBottom = () => {
//   const products = useSelector((state) => state.orebiReducer.products);
//   const [show, setShow] = useState(false);
//   const [showUser, setShowUser] = useState(false);
//   const navigate = useNavigate();
//   const ref = useRef();
//   //
//   useEffect(() => {
//     document.body.addEventListener("click", (e) => {
//       if (ref.current.contains(e.target)) {
//         setShow(true);
//       } else {
//         setShow(false);
//       }
//     });
//   }, [show, ref]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };
// //
//   useEffect(() => {
//     const filtered = paginationItems.filter((item) =>
//       item.productName.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   }, [searchQuery]);

//   return (
//     <div className="w-full bg-[#F5F5F3] relative">
//       <div className="max-w-container mx-auto">
//         <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
//           <div
//             onClick={() => setShow(!show)}
//             ref={ref}
//             className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
//           >
//             {/*Menu Category*/}
//             <HiOutlineMenuAlt4 className="w-5 h-5" />
//             <p className="text-[14px] font-normal">Shop by Category</p>

//             {show && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
//               >
//                 <Link to={"category/imprimante"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Imprimante
//                   </li>
//                 </Link>

//                 <Link to={"category/ancre"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     ancre
//                   </li>
//                 </Link>
//                 <Link to={"category/Ruban"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     ruban
//                   </li>
//                 </Link>
//                 <Link to={"category/Bac"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Bac de dechet
//                   </li>
//                 </Link>
//                 <Link to="/cart">
//               <div className="relative">
//                 {/*ShoppingCart*/}
//                 <FaShoppingCart />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {products.length > 0 ? products.length : 0}
//                 </span>
//               </div>
//             </Link>
//             {/*HeartFill*/}
//             {/*<BsSuitHeartFill />*/}
//             <Link to="/bssuitheartfill">
//               <div className="relative">
//                 {/*HeartFill*/}
//                 <BsSuitHeartFill />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {BsSuitHeartFill.length > 0 ? BsSuitHeartFill.length : 0}
//                 </span>
//               </div>
//             </Link>
            
//               </motion.ul>
//             )}
//           </div>

//           <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
//              {/*Search your products*/}
//             <input
//               className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
//               type="text"
//               onChange={handleSearch}
//               value={searchQuery}
//               placeholder="Search your products here"
//             />
//             <FaSearch className="w-5 h-5" />
//             {searchQuery && (
//               <div
//                 className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
//               >
//                 {searchQuery &&
//                   filteredProducts.map((item) => (
//                     <div
//                       onClick={() =>
//                         navigate(
//                           `/product/${item.productName
//                             .toLowerCase()
//                             .split(" ")
//                             .join("")}`,
//                           {
//                             state: {
//                               item: item,
//                             },
//                           }
//                         ) &
//                         setSearchQuery("")
//                       }
//                       key={item._id}
//                       className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
//                     >
//                       <img className="w-24" src={item.img} alt="productImg" />
//                       <div className="flex flex-col gap-1">
//                         <p className="font-semibold text-lg">
//                           {item.productName}
//                         </p>
//                         <p className="text-xs">
//                           {item.des.length > 100
//                             ? `${item.des.slice(0, 100)}...`
//                             : item.des}
//                         </p>
//                         <p className="text-sm">
//                           Price:{" "}
//                           <span className="text-primeColor font-semibold">
//                             ${item.price}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>

//           <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
//             <div onClick={() => setShowUser(!showUser)} className="flex">
//               {/*AccountUser*/}
//               <FaUser />
//               {/*Caret*/}
//               <FaCaretDown />
//             </div>

//             {/*แสดงรายการ Dropdown ของ AccountUser*/}

//             {showUser && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
//               >
//                 <Link to="/signin">
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Login
//                   </li>
//                 </Link>
//                 <Link onClick={() => setShowUser(false)} to="/signup">
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Sign Up
//                   </li>
//                 </Link>
//                 <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                   Profile
//                 </li>
//                 <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                   Others
//                 </li>
//               </motion.ul>
//             )}

//             <Link to="/cart">
//               <div className="relative">
//                 {/*ShoppingCart*/}
//                 <FaShoppingCart />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {products.length > 0 ? products.length : 0}
//                 </span>
//               </div>
//             </Link>
//             {/*HeartFill*/}
//             {/*<BsSuitHeartFill />*/}
//             <Link to="/bssuitheartfill">
//               <div className="relative">
//                 {/*HeartFill*/}
//                 <BsSuitHeartFill />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {BsSuitHeartFill.length > 0 ? BsSuitHeartFill.length : 0}
//                 </span>
//               </div>
//             </Link>
//           </div>
//         </Flex>
//       </div>
//     </div>
//   );
// };

// export default HeaderBottom;




// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
// import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
// import Flex from "../../designLayouts/Flex";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { paginationItems } from "../../../constants";
// import { BsSuitHeartFill } from "react-icons/bs";

// const HeaderBottom = () => {
//   const products = useSelector((state) => state.orebiReducer.products);
//   //const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn); // เพิ่มตัวแปรเพื่อตรวจสอบสถานะการเข้าสู่ระบบ

//     // ใช้ useSelector เพื่อดึงค่าจาก Redux state
//     const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);

//     // ตรวจสอบกรณีที่ isLoggedIn เป็น undefined
//     if (isLoggedIn === undefined) {
//       return <div>กำลังโหลด...</div>;
//     }

//   const [show, setShow] = useState(false);
//   const [showUser, setShowUser] = useState(false);
//   const navigate = useNavigate();
//   const ref = useRef(null);

//   const handleLogout = () => {
//     // ลบข้อมูลการล็อกอินจาก localStorage หรือ sessionStorage
//     localStorage.removeItem('userToken'); // หรือ sessionStorage.removeItem('userToken');
    
//     // รีไดเรกต์ผู้ใช้ไปที่หน้า SignIn
//     navigate('/signin');
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setShow(false);
//       }
//     };

//     document.body.addEventListener("click", handleClickOutside);

//     return () => {
//       document.body.removeEventListener("click", handleClickOutside);
//     };
//   }, [ref]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   useEffect(() => {
//     const filtered = paginationItems.filter((item) =>
//       item.productName.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   }, [searchQuery]);

//   return (
//     <div className="w-full bg-[#F5F5F3] relative">
//       <div className="max-w-container mx-auto">
//         <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
//           <div
//             onClick={() => setShow(!show)}
//             ref={ref}
//             className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
//           >
//             <HiOutlineMenuAlt4 className="w-5 h-5" />
//             <p className="text-[14px] font-normal">Shop by Category</p>

//             {show && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
//               >
//                 <Link to={"category/imprimante"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Imprimante
//                   </li>
//                 </Link>
//                 <Link to={"category/ancre"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     ancre
//                   </li>
//                 </Link>
//                 <Link to={"category/Ruban"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     ruban
//                   </li>
//                 </Link>
//                 <Link to={"category/Bac"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Bac de dechet
//                   </li>
//                 </Link>
//               </motion.ul>
//             )}
//           </div>

//           <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
//             <input
//               className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
//               type="text"
//               onChange={handleSearch}
//               value={searchQuery}
//               placeholder="Search your products here"
//             />
//             <FaSearch className="w-5 h-5" />
//             {searchQuery && (
//               <div
//                 className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
//               >
//                 {searchQuery &&
//                   filteredProducts.map((item) => (
//                     <div
//                       onClick={() =>
//                         navigate(
//                           `/product/${item.productName
//                             .toLowerCase()
//                             .split(" ")
//                             .join("")}`,
//                           {
//                             state: {
//                               item: item,
//                             },
//                           }
//                         ) &
//                         setSearchQuery("")
//                       }
//                       key={item._id}
//                       className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
//                     >
//                       <img className="w-24" src={item.img} alt="productImg" />
//                       <div className="flex flex-col gap-1">
//                         <p className="font-semibold text-lg">
//                           {item.productName}
//                         </p>
//                         <p className="text-xs">
//                           {item.des.length > 100
//                             ? `${item.des.slice(0, 100)}...`
//                             : item.des}
//                         </p>
//                         <p className="text-sm">
//                           Price:{" "}
//                           <span className="text-primeColor font-semibold">
//                             ${item.price}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>

//           <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
//             <div onClick={() => setShowUser(!showUser)} className="flex">
//               <FaUser />
//               <FaCaretDown />
//             </div>

//             {showUser && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
//               >

//             {showUser && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
//               >
//                 {isLoggedIn ? (
//                   <>
//                     <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                       Profile
//                     </li>
//                     <li
//                       onClick={handleLogout} 
//                         // เพิ่มโค้ดสำหรับออกจากระบบ
//                         className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
//                          >
//                       Logout
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/signin">
//                       <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                         Login
//                       </li>
//                     </Link>
//                     <Link onClick={() => setShowUser(false)} to="/signup">
//                       <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                         Sign Up
//                       </li>
//                     </Link>
//                   </>
//                 )}
//               </motion.ul>
//             )}

//                 {/*}
//                 <Link to="/signin">
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Login
//                   </li>
//                 </Link>

//                 <Link onClick={() => setShowUser(false)} to="/signup">
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Sign Up
//                   </li>
//                 </Link> */}

//                 <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                   Profile
//                 </li>
//                 <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                   Others
//                 </li>
//               </motion.ul>
//             )}

//             <Link to="/cart">
//               <div className="relative">
//                 <FaShoppingCart />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {products.length > 0 ? products.length : 0}
//                 </span>
//               </div>
//             </Link>
//             <Link to="/bssuitheartfill">
//               <div className="relative">
//                 <BsSuitHeartFill />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {products.length > 0 ? products.length : 0}
//                 </span>
//               </div>
//             </Link>
//           </div>
//         </Flex>
//       </div>
//     </div>
//   );
// };

// export default HeaderBottom;








// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
// import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
// import Flex from "../../designLayouts/Flex";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { paginationItems } from "../../../constants";
// import { BsSuitHeartFill } from "react-icons/bs";
// import { setLoginStatus } from '../../../redux/logout';//setLogoutStatus
// //import { useDispatch } from 'react-redux';
// //import { setLoginStatus } from '../../../redux/logout'; // Correctly import the action
// import axios from 'axios';


// const HeaderBottom = () => {
//   const products = useSelector((state) => state.orebiReducer.products);
//   //const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
//   const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
//   const dispatch = useDispatch();
//   //const isLoggedOut = setLoginStatus((state) => state.user?.isLoggedOut);
//   //const dispatch = useDispatch();
//   //const setLogouts = setLogoutStatus();

//   const [show, setShow] = useState(false);
//   const [showUser, setShowUser] = useState(false);
//   const navigate = useNavigate();
//   const ref = useRef(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setShow(false);
//       }
//     };
//     document.body.addEventListener("click", handleClickOutside);
//     return () => {
//       document.body.removeEventListener("click", handleClickOutside);
//     };
//   }, [ref]);

//   useEffect(() => {
//     const filtered = paginationItems.filter((item) =>
//       item.productName.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   }, [searchQuery]);

//   // const handleLogout = () => {
//   //   localStorage.removeItem('userToken');
//   //   navigate('/signin');
//   // };
//   // const handleLogout = () => {
//   //   setLogouts({ type: 'SET_LOGIN_STATUS', payload: false });
//   //   navigate('/signin'); // เปลี่ยนเส้นทางไปที่หน้าเข้าสู่ระบบหลังจากออกจากระบบ
//   // };

//   const handleLogout = () => {
//     // เรียก API logout
//     axios.post(`${BASE_URL}/api/logout`)
//       .then((response) => {
//         // ตั้ง state loggedIn เป็น false
//         //setLoginStatus({ type: 'SET_LOGIN_STATUS', payload: false });
//         //console.log(response.data); // Use the response here
        
//         dispatch(setLoginStatus(false)); // Dispatch the logout status update
//         // ลบ token ออกจาก localStorage (ถ้ามี)
//         localStorage.removeItem('token'); // Remove token from localStorage
  
//         // นำผู้ใช้ไปหน้า login
//         navigate('/signin');// Redirect to login page
//         console.log(response.data); // Use the response here
//       })
//       .catch((error) => {
//         console.error('Logout failed:', error);
//       });
//   };
  
  

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // if (isLoggedIn === undefined) {
//   //   return <div>กำลังโหลด...</div>;
//   // }

//   return (
//     <div className="w-full bg-[#F5F5F3] relative">
//       <div className="max-w-container mx-auto">
//         <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
//           <div
//             onClick={() => setShow(!show)}
//             ref={ref}
//             className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
//           >
//             <HiOutlineMenuAlt4 className="w-5 h-5" />
//             <p className="text-[14px] font-normal">Shop by Category</p>

//             {show && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
//               >
//                 <Link to={"category/imprimante"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Imprimante
//                   </li>
//                 </Link>
//                 <Link to={"category/ancre"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     ancre
//                   </li>
//                 </Link>
//                 <Link to={"category/Ruban"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     ruban
//                   </li>
//                 </Link>
//                 <Link to={"category/Bac"}>
//                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                     Bac de dechet
//                   </li>
//                 </Link>
//               </motion.ul>
//             )}
//           </div>

//           <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
//             <input
//               className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
//               type="text"
//               onChange={handleSearch}
//               value={searchQuery}
//               placeholder="Search your products here"
//             />
//             <FaSearch className="w-5 h-5" />
//             {searchQuery && (
//               <div
//                 className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
//               >
//                 {searchQuery &&
//                   filteredProducts.map((item) => (
//                     <div
//                       onClick={() =>
//                         navigate(
//                           `/product/${item.productName
//                             .toLowerCase()
//                             .split(" ")
//                             .join("")}`,
//                           {
//                             state: {
//                               item: item,
//                             },
//                           }
//                         ) & setSearchQuery("")
//                       }
//                       key={item._id}
//                       className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
//                     >
//                       <img className="w-24" src={item.img} alt="productImg" />
//                       <div className="flex flex-col gap-1">
//                         <p className="font-semibold text-lg">
//                           {item.productName}
//                         </p>
//                         <p className="text-xs">
//                           {item.des.length > 100
//                             ? `${item.des.slice(0, 100)}...`
//                             : item.des}
//                         </p>
//                         <p className="text-sm">
//                           Price:{" "}
//                           <span className="text-primeColor font-semibold">
//                             ${item.price}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>

//           <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
//             <div onClick={() => setShowUser(!showUser)} className="flex">
//               <FaUser />
//               <FaCaretDown />
//             </div>

//             {showUser && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
//               >
//                 {isLoggedIn ? (
//                   <>
//                     <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                       Profile
//                     </li>
//                     <li
//                       onClick={handleLogout}
//                       className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
//                     >
//                       Logout
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/signin">
//                       <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                         Login
//                       </li>
//                     </Link>
//                     <Link onClick={() => setShowUser(false)} to="/signup">
//                       <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                         Sign Up
//                       </li>
//                     </Link>
//                   </>
//                 )}
//               </motion.ul>
//             )}

//             <Link to="/cart">
//               <div className="relative">
//                 <FaShoppingCart />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {products.length > 0 ? products.length : 0}
//                 </span>
//               </div>
//             </Link>
//             <Link to="/bssuitheartfill">
//               <div className="relative">
//                 <BsSuitHeartFill />
//                 <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
//                   {products.length > 0 ? products.length : 0}
//                 </span>
//               </div>
//             </Link>
//           </div>
//         </Flex>
//       </div>
//     </div>
//   );
// };

// export default HeaderBottom;




import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";//useDispatch
import { paginationItems } from "../../../constants";
import { BsSuitHeartFill } from "react-icons/bs";
import {  setLoginStatus } from '../../../redux/logout'; // Correctly import the action
import defaultProfileImage from "../../../assets/images/userProfile/user_default.jpg"; // Default profile image

//import { setCart } from "../../../redux/cartActions"; // ปรับตามโครงสร้างโปรเจคของคุณ
//import { useCart } from '../../pageProps/context/CartContext'; // ใช้ useCart hook
//import {  logout } from '../../../redux/store'; // Correctly import the action
import Swal from 'sweetalert2';
//import axios from "axios";
//import Image from "../../designLayouts/Image";
//import { setLogoutStatus } from '../../../redux/logout'; // Correctly import the action
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const HeaderBottom = () => {
  //const products = useSelector((state) => state.orebiReducer.products);
  // const products = useSelector((state) => state.orebiReducer.products);
  // ดึงข้อมูลตะกร้าจาก store
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login
  console.log('showstatus:',isLoggedIn);//setLoginStatus((state) => state.logoutReducer?.isLoggedIn);
  const dispatch = useDispatch();
  
  const [categorydata, setcategorydata] = useState([]); 
  console.log("categorydata: ",categorydata);
  // let categorydata = [];  // declare it once, if needed
  const [showAll, setShowAll] = useState(false); // สำหรับแสดงทั้งหมด
  const categoriesToShow = showAll ? categorydata : categorydata.slice(0, 5); // แสดงข้อมูลสูงสุด 5 รายการ หรือทั้งหมดถ้า showAll เป็น true

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  console.log("show useState status: ",show);
  const [showUser, setShowUser] = useState(false);
  console.log("showUser useState status: ",showUser);

  const [showUserresize, setShowUserresize] = useState(false);
  console.log("showUser useState status: ",showUserresize);
  
  const navigate = useNavigate();
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);
  //const [isVisible, setIsVisible] = useState(window.innerWidth >= 960);
  const [isVisiblet, setIsVisiblet] = useState(window.innerWidth >= 960);
  const [isVisiblejustify, setIsVisiblejustify] = useState(window.innerWidth >= 960);
  //const [IsVisiblehidden, setIsVisiblehidden] = useState(window.innerWidth >= 960);

  const ref = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  //const BASE_URL = process.env.REACT_APP_BASE_URL;

  const userName = localStorage.getItem('username');
  //const imageProfile = localStorage.getItem('image_profile');
  let imageProfile = localStorage.getItem('image_profile');

  const categoryRef = useRef(null);
  console.log("categoryRef useRef status: ",categoryRef);
  const userMenuRef = useRef(null);
  console.log("userMenuRef useRef status: ",userMenuRef);
  const userMenuRefresize = useRef(null);
  console.log("userMenuRef useRef status: ",userMenuRefresize);

    // เพิ่ม useEffect เพื่อให้แน่ใจว่า dropdown ไม่ถูกปิด
    useEffect(() => {
      if (showAll) {
        setShow(true);  // ถ้าแสดงทั้งหมด ให้ dropdown เปิดอยู่
      }
      // else if(!showAll == true){
      //   setShow(true);  // ถ้าแสดงทั้งหมด ให้ dropdown เปิดอยู่
      // }

      // switch(showAll) {
      //   case showAll:
      //     // code block
      //     setShow(true);
      //     break;
      //   case !showAll == true:
      //     // code block
      //     setShow(true);
      //     break;
      //   default:
      //     // code block
      // }

    }, [showAll]);

  // เปลี่ยนโค้ดใน onClick ของการคลิกที่ "Show More" และ "Show Less" ให้ไม่ปิด dropdown
    const handleShowMore = () => {
      setShowAll(true);  // แสดงทั้งหมด
      setShow(true); // ให้ dropdown ยังคงเปิดอยู่
    };

    const handleShowLess = () => {
      setShowAll(false);  // แสดงเฉพาะ 5 รายการ
      setShow(true); // ให้ dropdown ยังคงเปิดอยู่
    };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShow(false);
        setShowAll(false);  // แสดงเฉพาะ 5 รายการ
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUser(false);
      }
      if (userMenuRefresize.current && !userMenuRefresize.current.contains(e.target)) {
        setShowUserresize(false);
      }
      // if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      //   //setIsVisiblet(false);
      // }
    };
    
    console.log("handleClickOutside status: ", handleClickOutside),
    console.log("userMenuRef.current status: ", userMenuRef.current),
    // console.log("categoryRef.current status: ", categoryRef.current.current),

    document.body.addEventListener("mousedown", handleClickOutside);
    console.log("document.body.addEventListener status: ", document.body.addEventListener);

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
      console.log("document.body status: ", document.body);
    };
  }, []);

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log("Header is show token :",token);
    const expiresAt = localStorage.getItem('expiresAt');
    console.log("Header is show expiresAt :",expiresAt);
  
    if (token && expiresAt) {
      if (Date.now() > parseInt(expiresAt, 10)) {
        // ถ้า token หมดอายุ ให้ลบ token และเปลี่ยนสถานะใน Redux
        localStorage.removeItem('authToken');
        localStorage.removeItem('expiresAt');
        dispatch(setLoginStatus(false));
      } else {
        // ถ้ายังไม่หมดอายุ ให้ตั้งสถานะเป็น true
        dispatch(setLoginStatus(true));
      }
    }
  }, [dispatch]);
  

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
  
// นับจำนวนสินค้าในตะกร้า
  const  productTypesCount = cartItems.length; // const = cartItems.reduce((total, item) => total + item.quantity, 0);
  console.log("productTypesCount : ", productTypesCount); // ผลลัพธ์: 3

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth;
      console.log("Viewport Width (Client):", clientWidth);
      setIsMobile(clientWidth > 960); //>
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth;
      console.log("Viewport Width (Client):", clientWidth);
      setIsVisiblet(clientWidth < 960);
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth;
      console.log("Viewport Width (Client):", clientWidth);
      setIsVisiblejustify(clientWidth < 960);
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products_by_category`, {
        headers: { 'Cache-Control': 'no-cache' },
    })
    .then((response) => {
      console.log("API Response:", response.data);  // เช็คค่าที่ React ได้รับจาก API
      // กรองค่า category_name ที่ไม่เป็น null หรือ undefined และไม่ซ้ำกัน
      const uniqueCategories = [...new Set(response.data
        .filter(category => category.category_name)  // กรองค่า null หรือ undefined
        .map(category => ({categories_id: category.categories_id, category_name: category.category_name})))];   // ดึงแค่ category_name แล้วแปลงเป็น Set เพื่อให้ไม่ซ้ำกัน
      setcategorydata(uniqueCategories);
      setLoading(false);
      // กรองค่า category_name ที่ไม่เป็น null หรือ undefined และไม่ซ้ำกัน
      // const uniqueCategories = response.data
      //   .filter(category => category.category_name)  // กรอง category_name ที่ไม่ใช่ null
      //   .map(category => ({
      //     category_id: category.categories_id,  // ดึง categories_id ด้วย
      //     category_name: category.category_name
      //   }));
      //   console.log("uniqueCategories: ",uniqueCategories);
      // setcategorydata(uniqueCategories);
      // setLoading(false);
    //     console.log("API Response:", response.data);  // เช็คค่าที่ React ได้รับจาก API
    //     setcategorydata(response.data);
    //     setLoading(false);
    })
    .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
        setLoading(false);
    });
}, []);

  
// ตรวจสอบว่า imageProfile เป็นค่า /images/userprofile/null หรือไม่
if (imageProfile === '/images/userprofile/null' || !imageProfile) {
  console.log("No profile image found. Using default image.");
  imageProfile = defaultProfileImage;  // เส้นทางภาพเริ่มต้น
} else {
  console.log("User profile image found:", imageProfile);
}

if (loading) return <p>Loading...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;

//imageProfile = JSON.parse(imageProfile); // แปลงจาก "null" เป็น null จริง
const Profileuser = imageProfile || defaultProfileImage;

console.log("Profileuser: ", Profileuser);
  

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          

          <div className={`flex h-14 cursor-pointer items-center gap-2 text-primeColor ${isVisiblejustify ? "justify-between w-full" : ""}`}>  {/*//ref={ref}*/}
            <div ref={categoryRef} onClick={() => setShow(!show)} className="flex gap-2"> 
              <HiOutlineMenuAlt4 className="w-5 h-5" />
              <p className="text-[14px] font-normal">Shop by Category</p>

               {/* Categories Dropdown */}
                {show && (
                  <motion.ul
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: -30, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
                  >
                    {categorydata && categorydata.length > 0 ? (
                      categoriesToShow.map((category) => (
                        <Link key={category.categories_id} to={`/category/${category.category_name ? category.category_name.toLowerCase() : ""}/${String(category.categories_id || "")}`}>
                          <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                            {category.category_name}
                          </li>
                        </Link>
                      ))
                    ) : (
                      <li>No categories available</li>
                    )}

                    {/* แสดงปุ่ม "Show More" ถ้ามีข้อมูลมากกว่า 5 รายการ */}
                    {categorydata.length > 5 && !showAll && (
                      <li
                        // onClick={() => setShowAll(true)}
                        onClick={handleShowMore}  // ใช้ handleShowMore ในการแสดงทั้งหมด
                        className="text-blue-500 cursor-pointer mt-2 text-center"
                      >
                        Show More
                      </li>
                    )}

                    {/* ถ้าแสดงทั้งหมดแล้วให้แสดงปุ่ม "Show Less" */}
                    {showAll && (
                      <li
                        // onClick={() => setShowAll(false)}
                        onClick={handleShowLess}  // ใช้ handleShowLess ในการแสดงบางส่วน
                        className="text-blue-500 cursor-pointer mt-2 text-center"
                      >
                        Show Less
                      </li>
                    )}
                  </motion.ul>
                )}

              {/* Categories Dropdown
              {show && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: -30, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
                >
                  {categorydata && categorydata.length > 0 ? (
                    categorydata.map((category, index) => (
                      <Link key={index} to={`/category/${category ? category.toLowerCase() : ""}`}>
                        <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                          {category}
                        </li>
                      </Link>
                    ))
                  ) : (
                    <li>No categories available</li>
                  )}
                </motion.ul>
              )} */}

               {/* Categories Dropdown */}
            {/* {show && (
              <motion.ul initial={{ y: 30, opacity: 0 }} animate={{ y: -30, opacity: 1 }} transition={{ duration: 0.5 }} className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6">
                {/* Dropdown Items 

                <Link to={"category/imprimante"}>
                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                     Imprimante
                   </li>
                 </Link>
                 <Link to={"category/ancre"}>
                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                     ancre
                   </li>
                 </Link>
                 <Link to={"category/Ruban"}>
                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                     ruban
                   </li>
                 </Link>
                 <Link to={"category/Bac"}>
                   <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                     Bac de dechet
                   </li>
                 </Link>

              </motion.ul>
            )} */}
            
            </div>

            {/* User Profile and Cart */}
          <div ref={userMenuRefresize} className={`flex gap-4 lg:mt-0 items-center pr-6 cursor-pointer relative ${isVisiblet ? "absolute left-4 justify-between" : "hidden"} `}> {/*className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative" , "flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative " , "absolute left-[0]" : "hidden lg:flex" ,ref={userMenuRef} , onClick={() => setShowUser(!showUser)} */}
            
            
            <div className="flex items-center gap-2">{/*onClick={() => setShowUser(!showUser)} ref={ref}*/}
            
              {/* {images[0] &&  <Image className="rounded-full w-8 h-8 object-cover" imgSrc={`${BASE_URL}/images/userprofile/${images[0].image_profile}`}></Image>}
              <h2>{username}</h2> */}
              
              {isLoggedIn && (
                console.log("userMenuRef status: ", userMenuRefresize),
                <div className="flex items-center gap-2">
                  {/* แสดงรูปภาพโปรไฟล์เมื่อผู้ใช้ล็อกอิน */}
                  <img src={imageProfile} className="rounded-full w-8 h-8 object-cover" alt="Profile" />
                  <span>{userName}</span>
                </div>
              )}

               {/* <img src={`${imageProfile}`}  className="rounded-full w-8 h-8 object-cover" /> {/*alt="Profile" profile-image
              
              
              <span>{userName}</span> */}

              {/*<FaUser />
              <FaCaretDown />*/}

            </div>

            <div onClick={() => setShowUserresize(!showUserresize)} ref={ref} className="flex items-center"> {/*ref={userMenuRef} ,ref*/}
              <FaUser />
              <FaCaretDown />
            </div>

            {showUserresize && (
              <motion.ul  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={`absolute top-6 z-50 right-0 bg-primeColor  text-[#767676] h-auto p-4 pb-6 `}> {/* w-44* ,${isVisible ?  "left-0":"right-0" }*/}
                {isLoggedIn ? (
                  <>
                    <Link to="/profile/history"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Profile</li></Link>
                    {/* <Link to="/profile"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Profile</li></Link> */}
                    <li onClick={handleLogout} className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Logout</li>
                  </>
                ) : (
                  <>
                    <Link to="/signinresize" onClick={() => setShowUserresize(false)} ><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Login</li></Link>
                    <Link to="/signupresize" onClick={() => setShowUserresize(false)} ><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Sign Up</li></Link>
                  </>
                )}

              </motion.ul>
            )}
            {/* <Link to="/cart"><div className="relative"><FaShoppingCart /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{isLoggedIn ?(cartItemCount > 0 ? cartItemCount : 0) :0}</span></div></Link>*products.length , products?.cart?.length , cart?.length //// 0cartItemCount.length > 0 ? cartItemCount.length : 0, {cartItemCount > 0 ? cartItemCount : 0} */}
            <Link to="/cart"><div className="relative"><FaShoppingCart /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{isLoggedIn ?(productTypesCount > 0 ? productTypesCount : 0) :0}</span></div></Link>{/**products.length , products?.cart?.length , cart?.length //// 0cartItemCount.length > 0 ? cartItemCount.length : 0, {cartItemCount > 0 ? cartItemCount : 0}*/}
            <Link to="/bssuitheartfill"><div className="relative"><BsSuitHeartFill /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{productTypesCount > 0 ? productTypesCount : 0}</span></div></Link> {/*products*/}
            {/* <Link to="/bssuitheartfill"><div className="relative"><BsSuitHeartFill /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{cartItemCount.length > 0 ? cartItemCount.length : 0}</span></div></Link> products */}
          </div>

          </div>
          {/* </div> */}



          {/* Search bar */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input type="text" onChange={handleSearch} value={searchQuery} placeholder="Search your products here" className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]" />
            <FaSearch className="w-5 h-5" />
            {/* Filtered Products */}
            {searchQuery && (
              <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
                {filteredProducts.map((item) => (
                  <div onClick={() => { navigate(`/product/${item.productName.toLowerCase().split(" ").join("")}`, { state: { item } }); setSearchQuery(""); }} key={item._id} className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3">
                    <img className="w-24" src={item.img} alt="productImg" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.productName}</p>
                      <p className="text-xs">{item.des.length > 100 ? `${item.des.slice(0, 100)}...` : item.des}</p>
                      <p className="text-sm">Price: <span className="text-primeColor font-semibold">${item.price}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* {isVisible && ( */}
          {/* User Profile and Cart */}
          <div ref={userMenuRef} className={`flex  gap-4 mt-2 hidden lg:flex lg:mt-0 items-center pr-6 cursor-pointer relative ${show ? "absolute right-4 top-4 lg:static" : "hidden lg:flex"} `}> {/*className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative"*/}
            
            
            <div className="flex items-center gap-2">{/*onClick={() => setShowUser(!showUser)} ref={ref}*/}
            
              {/* {images[0] &&  <Image className="rounded-full w-8 h-8 object-cover" imgSrc={`${BASE_URL}/images/userprofile/${images[0].image_profile}`}></Image>}
              <h2>{username}</h2> */}
              
              {isLoggedIn && (
                <div className="flex items-center gap-2">
                  {/* แสดงรูปภาพโปรไฟล์เมื่อผู้ใช้ล็อกอิน */}
                  <img src={imageProfile} className="rounded-full w-8 h-8 object-cover" alt="Profile" />
                  <span>{userName}</span>
                </div>
              )}

               {/* <img src={`${imageProfile}`}  className="rounded-full w-8 h-8 object-cover" /> {/*alt="Profile" profile-image
              
              
              <span>{userName}</span> */}

              {/*<FaUser />
              <FaCaretDown />*/}

            </div>

            <div onClick={() => setShowUser(!showUser)} ref={ref} className="flex items-center">
              <FaUser />
              <FaCaretDown />
            </div>

            {showUser && (
              <motion.ul  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={`absolute top-6 z-50 right-0 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6 ${isMobile ?  "left-0":"right-0" }`}>
                {isLoggedIn ? (
                  <>
                    <Link to="/profile/history"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Profile</li></Link>
                    {/* <Link to="/promptpaycheckout"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Paymentgateway</li></Link> */}
                    <Link to="/sellerRegister"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">sellerRegister</li></Link>
                    <li onClick={handleLogout} className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Logout</li>
                  </>
                ) : (
                  <>
                    <Link to="/signin"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Login</li></Link>
                    <Link onClick={() => setShowUser(false)} to="/signup"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Sign Up</li></Link>
                  </>
                )}

              </motion.ul>
            )}
            <Link to="/cart"><div className="relative"><FaShoppingCart /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{isLoggedIn ?(productTypesCount > 0 ? productTypesCount : 0) :0}</span></div></Link>{/**products.length , products?.cart?.length , cart?.length //// 0cartItemCount.length > 0 ? cartItemCount.length : 0, {cartItemCount > 0 ? cartItemCount : 0}*/}
            {/* <Link to="/cart"><div className="relative"><FaShoppingCart /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{isLoggedIn ?(cartItemCount > 0 ? cartItemCount : 0) :0}</span></div></Link>*products.length , products?.cart?.length , cart?.length //// 0cartItemCount.length > 0 ? cartItemCount.length : 0, {cartItemCount > 0 ? cartItemCount : 0} */}
            <Link to="/bssuitheartfill"><div className="relative"><BsSuitHeartFill /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{productTypesCount.length > 0 ? productTypesCount.length : 0}</span></div></Link> {/*products*/}
            {/* <Link to="/bssuitheartfill"><div className="relative"><BsSuitHeartFill /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{cartItemCount.length > 0 ? cartItemCount.length : 0}</span></div></Link> products */}
          </div>
          {/* )} */}
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;



/////////////////////ล่าสุด Laster/////////////////////////

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .get(`${BASE_URL}/api/cart`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         dispatch(setCart(response.data.cart)); // อัปเดต Redux state
  //         //console.log(response);
  //         console.log(response.data.cart); // ตรวจสอบข้อมูลที่ได้จาก API
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching cart:", error);
  //       });
  //   }
  // }, [dispatch,BASE_URL]);


  // const handleClickOutside = (e) => {
  //   if (categoryRef.current && !categoryRef.current.contains(e.target)) {
  //     setShow(false);
  //   }
  //   if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
  //     setShowUser(false);
  //   }
  // };
  
  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => document.removeEventListener('click', handleClickOutside);
  // }, []);
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       setShow(false);
  //     }
  //   };
  //   document.body.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.body.removeEventListener("click", handleClickOutside);
  //   };
  // }, [ref]);


  //const BASE_URL = process.env.REACT_APP_BASE_URL;




//ใช้ล่าสุด
  // useEffect(() => {
  //   const handleResize = () => {
  //     console.log("Window Width:", window.innerWidth);
  //     setIsVisible(window.innerWidth <= 960); // ถ้า width >= 960 จะเป็น true
  //   };
  
  //   // เรียกใช้งานครั้งแรกเพื่อเช็คค่าเริ่มต้น
  //   handleResize();
  
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);




  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsVisiblehidden(window.innerWidth < 960); // ถ้า width >= 960 จะเป็น true
  //   };
  
  //   // เรียกใช้งานครั้งแรกเพื่อเช็คค่าเริ่มต้น
  //   handleResize();
  
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);


  //${IsVisiblehidden ? "absolute left-[655px]" : "hidden lg:flex" }
  // if (IsVisiblehidden) {
  //   // แสดงสัญลักษณ์โหลดหรือเนื้อหาแทนที่ระหว่างโหลด
  //   return <div>Loading...</div>;
  // }  


  
  // const handleLogout = () => {
  //   //dispatch(setLoginStatus(false)); // ตั้งสถานะเป็น false เมื่อออกจากระบบ
  //   console.log('show:',isLoggedIn);

  //   Swal.fire({
  //     title: "Do you want to logout?",
  //     text: "Click confirm to log out.",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Confirm",
  //     cancelButtonText: "Cancel",
  //     confirmButtonColor: "#4CAF50", // สีเขียวสำหรับปุ่ม Confirm
  //     cancelButtonColor: "#f44336",  // สีแดงสำหรับปุ่ม Cancel
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Dispatch logout action to update the login status
  //       dispatch(setLoginStatus(false));
  //       // ล้างข้อมูล Redux
  //       dispatch(setCart([]));
  //     //dispatch(setLoginStatus(false));
  //       //dispatch(logout());  // เคลียร์ข้อมูลสินค้าเมื่อ logout

  //       // ลบข้อมูลที่เก็บไว้ใน localStorage
  //       localStorage.removeItem('image_profile');
  //       localStorage.removeItem('username');
  //       localStorage.removeItem('token');  // ถ้าคุณใช้ JWT token

  //       // รีเซ็ตข้อมูลผู้ใช้ใน Redux หรือ state
  //       //dispatch(setUser({ username: '', image_profile: '' }));  // สมมติคุณมี action setUser ที่ใช้รีเซ็ตข้อมูลผู้ใช้
        
  //       console.log('Logout successful');
        
  //       // Navigate to the desired route after logging out
  //       navigate('/');
  //     }
  //   }).catch((error) => {
  //     console.error('Logout failed', error);
  //     alert('Logout failed');
  //   });
  // };



  // const handleLogout = () => {
  //   //dispatch(setLoginStatus(false)); // ตั้งสถานะเป็น false เมื่อออกจากระบบ
  //   console.log('show:',isLoggedIn);

  //   Swal.fire({
  //     title: "Do you want to logout?",
  //     text: "Click confirm to log out.",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Confirm",
  //     cancelButtonText: "Cancel",
  //     confirmButtonColor: "#4CAF50", // สีเขียวสำหรับปุ่ม Confirm
  //     cancelButtonColor: "#f44336",  // สีแดงสำหรับปุ่ม Cancel
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Dispatch logout action to update the login status
  //       dispatch(setLoginStatus(false));
  //       // ล้างข้อมูล Redux
  //       dispatch(setCart([]));
  //     //dispatch(setLoginStatus(false));
  //       //dispatch(logout());  // เคลียร์ข้อมูลสินค้าเมื่อ logout

  //       // ลบข้อมูลที่เก็บไว้ใน localStorage
  //       localStorage.removeItem('image_profile');
  //       localStorage.removeItem('username');
  //       localStorage.removeItem('token');  // ถ้าคุณใช้ JWT token

  //       // รีเซ็ตข้อมูลผู้ใช้ใน Redux หรือ state
  //       //dispatch(setUser({ username: '', image_profile: '' }));  // สมมติคุณมี action setUser ที่ใช้รีเซ็ตข้อมูลผู้ใช้
        
  //       console.log('Logout successful');
        
  //       // Navigate to the desired route after logging out
  //       navigate('/');
  //     }
  //   }).catch((error) => {
  //     console.error('Logout failed', error);
  //     alert('Logout failed');
  //   });
  // };


  
  // ซ่อนตัวของ เมนูและตะกร้า
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsVisible(window.innerWidth >= 960);
  //   };
  
  //   window.addEventListener('resize', handleResize);
  
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);


  ////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   const handleResize = () => {
  //     const clientWidth = document.documentElement.clientWidth;
  //     console.log("Viewport Width (Client):", clientWidth);
  //     setIsVisible(clientWidth < 960);
  //   };
  
  //   handleResize();
  
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);




///////////////////////////////////////////////

// {/* <div className="w-full bg-[#F5F5F3] relative">
//       <div className="max-w-container mx-auto">
//         <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          

//           <div ref={categoryRef} onClick={() => setShow(!show)}  className="flex h-14 cursor-pointer items-center gap-2 text-primeColor">  {/*//ref={ref}*/}
//             <HiOutlineMenuAlt4 className="w-5 h-5" />
//             <p className="text-[14px] font-normal">Shop by Category</p>
//             {/* Categories Dropdown */}
//             {show && (
//               <motion.ul initial={{ y: 30, opacity: 0 }} animate={{ y: -30, opacity: 1 }} transition={{ duration: 0.5 }} className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6">
//                 {/* Dropdown Items */}

//                 <Link to={"category/imprimante"}>
//                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                      Imprimante
//                    </li>
//                  </Link>
//                  <Link to={"category/ancre"}>
//                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                      ancre
//                    </li>
//                  </Link>
//                  <Link to={"category/Ruban"}>
//                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                      ruban
//                    </li>
//                  </Link>
//                  <Link to={"category/Bac"}>
//                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
//                      Bac de dechet
//                    </li>
//                  </Link>

//               </motion.ul>
//             )}


//             {/* User Profile and Cart */}
//           <div ref={userMenuRef} className={`flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative ${isVisible ? "flex" : "hidden"} `}> {/*className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative" , "flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative " , "absolute left-[0]" : "hidden lg:flex"  */}
            
            
//             <div className="flex items-center gap-2">{/*onClick={() => setShowUser(!showUser)} ref={ref}*/}
            
//               {/* {images[0] &&  <Image className="rounded-full w-8 h-8 object-cover" imgSrc={`${BASE_URL}/images/userprofile/${images[0].image_profile}`}></Image>}
//               <h2>{username}</h2> */}
              
//               {isLoggedIn && (
//                 <div className="flex items-center gap-2">
//                   {/* แสดงรูปภาพโปรไฟล์เมื่อผู้ใช้ล็อกอิน */}
//                   <img src={imageProfile} className="rounded-full w-8 h-8 object-cover" alt="Profile" />
//                   <span>{userName}</span>
//                 </div>
//               )}

//                {/* <img src={`${imageProfile}`}  className="rounded-full w-8 h-8 object-cover" /> {/*alt="Profile" profile-image
              
              
//               <span>{userName}</span> */}

//               {/*<FaUser />
//               <FaCaretDown />*/}

//             </div>

//             <div onClick={() => setShowUser(!showUser)} ref={ref} className="flex items-center">
//               <FaUser />
//               <FaCaretDown />
//             </div>

//             {showUser && (
//               <motion.ul  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={`absolute top-6 z-50 right-0 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6 ${isMobile ?  "left-0":"right-0" }`}>
//                 {isLoggedIn ? (
//                   <>
//                     <Link to="/profile"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Profile</li></Link>
//                     <li onClick={handleLogout} className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Logout</li>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/signin"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Login</li></Link>
//                     <Link onClick={() => setShowUser(false)} to="/signup"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Sign Up</li></Link>
//                   </>
//                 )}

//               </motion.ul>
//             )}
//             <Link to="/cart"><div className="relative"><FaShoppingCart /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{isLoggedIn ?(cartItemCount > 0 ? cartItemCount : 0) :0}</span></div></Link>{/**products.length , products?.cart?.length , cart?.length //// 0cartItemCount.length > 0 ? cartItemCount.length : 0, {cartItemCount > 0 ? cartItemCount : 0}*/}
//             <Link to="/bssuitheartfill"><div className="relative"><BsSuitHeartFill /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{cartItemCount.length > 0 ? cartItemCount.length : 0}</span></div></Link> {/*products*/}
//           </div>


//           </div>



//           {/* Search bar */}
//           <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
//             <input type="text" onChange={handleSearch} value={searchQuery} placeholder="Search your products here" className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]" />
//             <FaSearch className="w-5 h-5" />
//             {/* Filtered Products */}
//             {searchQuery && (
//               <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
//                 {filteredProducts.map((item) => (
//                   <div onClick={() => { navigate(`/product/${item.productName.toLowerCase().split(" ").join("")}`, { state: { item } }); setSearchQuery(""); }} key={item._id} className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3">
//                     <img className="w-24" src={item.img} alt="productImg" />
//                     <div className="flex flex-col gap-1">
//                       <p className="font-semibold text-lg">{item.productName}</p>
//                       <p className="text-xs">{item.des.length > 100 ? `${item.des.slice(0, 100)}...` : item.des}</p>
//                       <p className="text-sm">Price: <span className="text-primeColor font-semibold">${item.price}</span></p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
          
//           {/* {isVisible && ( */}
//           {/* User Profile and Cart */}
//           <div ref={userMenuRef} className="flex gap-4 mt-2 hidden lg:flex lg:mt-0 items-center pr-6 cursor-pointer relative "> {/*className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative"*/}
            
            
//             <div className="flex items-center gap-2">{/*onClick={() => setShowUser(!showUser)} ref={ref}*/}
            
//               {/* {images[0] &&  <Image className="rounded-full w-8 h-8 object-cover" imgSrc={`${BASE_URL}/images/userprofile/${images[0].image_profile}`}></Image>}
//               <h2>{username}</h2> */}
              
//               {isLoggedIn && (
//                 <div className="flex items-center gap-2">
//                   {/* แสดงรูปภาพโปรไฟล์เมื่อผู้ใช้ล็อกอิน */}
//                   <img src={imageProfile} className="rounded-full w-8 h-8 object-cover" alt="Profile" />
//                   <span>{userName}</span>
//                 </div>
//               )}

//                {/* <img src={`${imageProfile}`}  className="rounded-full w-8 h-8 object-cover" /> {/*alt="Profile" profile-image
              
              
//               <span>{userName}</span> */}

//               {/*<FaUser />
//               <FaCaretDown />*/}

//             </div>

//             <div onClick={() => setShowUser(!showUser)} ref={ref} className="flex items-center">
//               <FaUser />
//               <FaCaretDown />
//             </div>

//             {showUser && (
//               <motion.ul  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={`absolute top-6 z-50 right-0 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6 ${isMobile ?  "left-0":"right-0" }`}>
//                 {isLoggedIn ? (
//                   <>
//                     <Link to="/profile"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Profile</li></Link>
//                     <li onClick={handleLogout} className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Logout</li>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/signin"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Login</li></Link>
//                     <Link onClick={() => setShowUser(false)} to="/signup"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Sign Up</li></Link>
//                   </>
//                 )}

//               </motion.ul>
//             )}
//             <Link to="/cart"><div className="relative"><FaShoppingCart /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{isLoggedIn ?(cartItemCount > 0 ? cartItemCount : 0) :0}</span></div></Link>{/**products.length , products?.cart?.length , cart?.length //// 0cartItemCount.length > 0 ? cartItemCount.length : 0, {cartItemCount > 0 ? cartItemCount : 0}*/}
//             <Link to="/bssuitheartfill"><div className="relative"><BsSuitHeartFill /><span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{cartItemCount.length > 0 ? cartItemCount.length : 0}</span></div></Link> {/*products*/}
//           </div>
//           {/* )} */}
//         </Flex>
//       </div>
//     </div> */}




// const handleLogout = () => {
  //   axios.post(`${BASE_URL}/api/logout`)
  //     .then(() => {
  //       //dispatch(setLoginStatus(false)); // Dispatch the logout status update
  //       setLogoutStatus(false); // Dispatch the logout status update
  //       localStorage.removeItem('token'); // Remove token from localStorage
  //       navigate('/signin'); // Redirect to login page
  //     })
  //     .catch((error) => {
  //       console.error('Logout failed:', error);
  //     });
  // };

  
  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };

    // // Fetch images using axios
    // useEffect(() => {
    //   axios.get(`${BASE_URL}/api/profile_user`, {
    //     headers: {
    //       'Cache-Control': 'no-cache',
    //       'ngrok-skip-browser-warning': 'true',
    //       //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    //     }
    //   })
    //   .then(response => {
    //     // setImages(response.data);
    //     // setUsername(response.data.username);
  
    //     setImages(response.data);  // กำหนดค่าให้ images จากผลลัพธ์
    //     setUsername(response.data[0]?.username);  // ตรวจสอบข้อมูลก่อนใช้งาน
  
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error('Failed to fetch profile data (axios):', err);
    //     setError('Failed to load profile data.');
    //     setLoading(false);
    //   });
    // }, [BASE_URL]);
  
    // // Fetch images using fetch
    // useEffect(() => {
    //   const fetchImages = async () => {
    //     try {
    //       const response = await fetch(`${BASE_URL}/api/profile_user`, {
    //         //method: 'GET',
    //         method: 'GET',
    //         headers: {
    //           'Cache-Control': 'no-cache',
    //           'ngrok-skip-browser-warning': 'true',
    //           //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    //         }
    //       });
  
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
  
    //       //const data = await response.json();
    //       //setCurrentImages(data);
    //     } catch (error) {
    //       console.error('Error fetching images (fetch):', error);
    //     }
    //   };
  
    //   fetchImages();
    // }, [BASE_URL]);
  
  
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;

    // Fetch images using axios


// useEffect(() => {
//   axios.get(`${BASE_URL}/api/profile_user`, {
//     headers: {
//       'Cache-Control': 'no-cache',
//       'ngrok-skip-browser-warning': 'true',
//     }
//   })
//   .then(response => {
//      //setImages(response.data);  // กำหนดค่าให้ images จากผลลัพธ์
//      setImages(response.data);  // กำหนดค่าให้ images จากผลลัพธ์
//      setUsername(response.data[0]?.username);  // ตรวจสอบข้อมูลก่อนใช้งาน
//     setLoading(false); // อัพเดทสถานะเป็นไม่กำลังโหลด
//   })
//   .catch(err => {
//     console.error('Failed to fetch profile data (axios):', err);
//     setError('Failed to load profile data.');
//     setLoading(false); // อัพเดทสถานะเมื่อเกิดข้อผิดพลาด
//   });
// }, [BASE_URL]);

// if (loading) return <p>Loading...</p>; // ถ้ายังโหลดอยู่ ให้แสดงข้อความ Loading
// if (error) return <p>{error}</p>; // ถ้ามีข้อผิดพลาดในการโหลด ให้แสดงข้อความข้อผิดพลาด
