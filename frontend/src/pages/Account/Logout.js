import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ลบข้อมูลการล็อกอินจาก localStorage หรือ sessionStorage
    localStorage.removeItem('userToken'); // หรือ sessionStorage.removeItem('userToken');
    
    // รีไดเรกต์ผู้ใช้ไปที่หน้า SignIn
    navigate('/signin');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
