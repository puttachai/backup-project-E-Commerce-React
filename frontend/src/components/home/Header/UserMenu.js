// components/UserMenu.js
import React from 'react';
import { FaUser, FaCaretDown, FaShoppingCart } from 'react-icons/fa';
import { BsSuitHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types'; // Import PropTypes

const UserMenu = ({ showUser, setShowUser,userMenuRef, isLoggedIn, imageProfile, userName, handleLogout, isMobile, cartItemCount }) => {
  return (
    <div ref={userMenuRef} className={`flex gap-4 mt-2 hidden lg:flex lg:mt-0 items-center pr-6 cursor-pointer relative ${showUser ? "absolute right-4 top-4 lg:static" : "hidden lg:flex"}`}>
      <div className="flex items-center gap-2">
        {isLoggedIn && (
          <div className="flex items-center gap-2">
            <img src={imageProfile} className="rounded-full w-8 h-8 object-cover" alt="Profile" />
            <span>{userName}</span>
          </div>
        )}
      </div>

      <div onClick={() => setShowUser(!showUser)} className="flex items-center">
        <FaUser />
        <FaCaretDown />
      </div>

      {showUser && (
        <motion.ul initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={`absolute top-6 z-50 right-0 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6 ${isMobile ? "left-0" : "right-0"}`}>
          {isLoggedIn ? (
            <>
              <Link to="/profile"><li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">Profile</li></Link>
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

      <Link to="/cart">
        <div className="relative">
          <FaShoppingCart />
          <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{isLoggedIn ? (cartItemCount > 0 ? cartItemCount : 0) : 0}</span>
        </div>
      </Link>

      <Link to="/bssuitheartfill">
        <div className="relative">
          <BsSuitHeartFill />
          <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">{cartItemCount.length > 0 ? cartItemCount.length : 0}</span>
        </div>
      </Link>

    </div>
  );
};



// PropTypes validation
UserMenu.propTypes = {
  showUser: PropTypes.bool.isRequired,
  setShowUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userMenuRef:PropTypes.bool.isRequired,
  imageProfile: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  cartItemCount: PropTypes.number.isRequired
};

export default UserMenu;
