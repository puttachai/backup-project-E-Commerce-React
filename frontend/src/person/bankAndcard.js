// import React, { useState } from "react"; //useEffect
 import { useSelector } from "react-redux"; //useSelector
import { Link } from "react-router-dom"; // Import Link for routing
import { motion } from "framer-motion"; // Import motion for animation
import emptyCart from "../../src/assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)

const BanksAndCards = () => {

    const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login

  return (
    <>
    {isLoggedIn ? (
    <div className="bg-white w-full flex flex-col gap-2 px-3 lg:px-28 md:flex-row text-[#161931]"> {/* md:px-16 */}
        <main className="flex flex-col mt-6 mb-6 items-center w-full  "> {/* min-h-screen */}

            {/* Profile Section */}
            <section className="flex flex-col items-center w-full px-6 py-8 mt-8 bg-white rounded-lg shadow sm:max-w-4xl">
  <div className="p-6 w-full bg-white rounded-md shadow-md">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Banks & Cards</h2>

    {/* บัตรเครดิต / บัตรเดบิต */}
    <div className="mb-6">
      <div className="flex flex-col smls:flex-row smls:justify-between sm:items-center">
        <h3 className="text-md font-medium text-gray-700 mb-2 sm:mb-0">บัตรเครดิต / บัตรเดบิต</h3>
        <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition">
          เพิ่มบัตรใหม่
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-500">คุณยังไม่ได้เพิ่มบัตร</p>
    </div>

    {/* Points */}
    <div className="mb-6">
      <div className="flex flex-col smls:flex-row smls:justify-between sm:items-center">
        <h3 className="text-md font-medium text-gray-700 mb-2 sm:mb-0">Points</h3>
        <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition">
          ผูกบัตรเครดิตใหม่
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-500">คุณยังไม่ได้เพิ่มบัตร</p>
    </div>

    {/* บัญชีธนาคาร */}
    <div>
      <div className="flex flex-col smls:flex-row smls:justify-between sm:items-center">
        <h3 className="text-md font-medium text-gray-700 mb-2 sm:mb-0">บัญชีธนาคารของฉัน</h3>
        <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition">
          เพิ่มบัญชีธนาคาร
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between bg-gray-100 p-4 rounded">
        <div>
          <p className="text-gray-700 font-medium">กรุงไทย (KTB)</p>
          <p className="text-sm text-gray-500">สิ้นสุดด้วย *6423</p>
        </div>
        <button className="text-sm text-indigo-600 hover:underline">ลบ</button>
      </div>
    </div>
  </div>
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

export default BanksAndCards;
