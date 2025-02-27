import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill, RiUserAddFill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useSelector } from "react-redux";

const Specialcase = () => {
  // const products = useSelector((state) => state.orebiReducer.products);
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [imagePosition, setImagePosition] = useState(0);
  console.log("imagePosition: ",imagePosition);

  const productTypesCount = cartItems.length;  // หรือใช้ cartItems.reduce เพื่อคำนวณตามต้องการ
  console.log("productTypesCount: ", productTypesCount);


  useEffect(() => {
    const handleScroll = () => {
      // เมื่อมีการ scroll จะปรับค่าตำแหน่ง
      setImagePosition(window.scrollY);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  
  

// useEffect(() => {
//   const handleScroll = () => {
//     setScrollPosition(window.scrollY);
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);

    {/* <div className="relative"> */}
//<div className="fixed top-52 right-2 z-20 flex flex-col gap-2 hidden md:flex items-end "> 
// style={{ transform: `translateY(${imagePosition}px)`, marginTop: "250px" }} // เลื่อนตาม scrollY imagescroll relative
  return (
      
    <div className="imagescroll fixed top-5 right-2 z-20 flex flex-col gap-2 hidden md:flex items-end"
    // style={{ top: scrollPosition + 200 }}
    style={{ transform: `translateY(${imagePosition}px)`, marginTop: "250px" }} // เลื่อนตาม scrollY imagescroll relative
    >
      {/* Profile Link */}
      <Link to={isLoggedIn ? "/profile/history" : "/signin"}>
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">
            {isLoggedIn ? "Profile" : "Sign In"}
          </p>
        </div>
      </Link>
    
      {/* Buy Now Link */}
      <Link to={isLoggedIn ? "/cart" : "/signup"}>
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            {isLoggedIn ? (
              <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
            ) : (
              <RiUserAddFill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
            )}
            {isLoggedIn ? (
              <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
            ) : (
              <RiUserAddFill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
            )}
          </div>
          <p className="text-xs font-semibold font-titleFont">
            {isLoggedIn ? "Buy Now" : "Sign Up"}
          </p>
          {/* && products.length > 0 && */}
          {isLoggedIn && productTypesCount > 0 && ( 
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {productTypesCount}
            </p>
          )}
        </div>
      </Link>
    </div>
 

  );
};

export default Specialcase;


{/* <div className="absolute top-52 right-2 z-20 flex flex-col hidden md:flex flex-col gap-2">
      
<Link to="/signin">
  <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
    <div className="flex justify-center items-center">
      <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

      <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
    </div>
    <p className="text-xs font-semibold font-titleFont">Profile</p>
  </div>
</Link>

<Link to="/cart">
  <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
    <div className="flex justify-center items-center">
      <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

      <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
    </div> 
    <p className="text-xs font-semibold font-titleFont">Buy Now</p>
    {products.length > 0 && (
      <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
        {products.length}
      </p>
    )}
  </div>
</Link>

</div> */}



//<div className="absolute top-52 right-2 z-20 flex flex-col hidden md:flex flex-col gap-2">
//////////////////////////////////////////////////////////////////////////////

// <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      
//       <Link to="/signin">
//         <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
//           <div className="flex justify-center items-center">
//             <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

//             <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
//           </div>
//           <p className="text-xs font-semibold font-titleFont">Profile</p>
//         </div>
//       </Link>

//       <Link to="/cart">
//         <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
//           <div className="flex justify-center items-center">
//             <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

//             <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
//           </div> 
//           <p className="text-xs font-semibold font-titleFont">Buy Now</p>
//           {products.length > 0 && (
//             <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
//               {products.length}
//             </p>
//           )}
//         </div>
//       </Link>
      
//     </div>