import React, { useState, useEffect } from "react";//useEffect
import { BsCheckCircleFill } from "react-icons/bs";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
//import { setUser } from "../../redux/orebiSlice"; // Adjust the path as needed
//import { setCart } from '../../redux/cartSlice'; // เปลี่ยนเส้นทางตามตำแหน่งไฟล์
import { setLoginStatus } from '../../redux/logout'; // สมมติว่าเรามี action login ที่จัดการการเข้าสู่ระบบ
import { logoLight } from "../../assets/images";
import Swal from 'sweetalert2';
import { loginSuccess } from '../../redux/cartActions'; // นำเข้า action สำหรับล็อกอิน
//import {jwtDecode} from 'jwt-decode';
//import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SignIn = () => {
  // ============= Initial State Start here =============
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //const dispatch = useDispatch();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(login({ email, password }));
  // };
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

// Use the useNavigate hook
const navigate = useNavigate();

  // ============= Error Msg End here ===================
  //const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

//   useEffect(() => {
//   const token = localStorage.getItem("authToken"); // ใช้โทเค็นจาก localStorage
//   console.log(token);  // เช็คค่าของ token
//   if (token) {
//     fetch(`${BASE_URL}/api/cart`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Dispatch เพื่ออัปเดต Redux state
//         dispatch(setCart(data.cart));
//       })
//       .catch((error) => {
//         console.error("Error fetching cart:", error);
//       });
//   }
// }, [dispatch]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {//192.168.0.103
      //const token = localStorage.getItem('token'); // สมมติว่าโทเค็นถูกเก็บใน localStorage
      const response = await fetch(`${BASE_URL}/api/login/laravel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
      });

      // แปลง response เป็น JSON
      //const data = await response.json();

      // console.log("response.data",response.data);
      // console.log("response.data",response);
      // console.log("response.body",response.body);
       //console.log("response.data: ",data);

      // สมมุติว่า API ส่งข้อมูล user และ token กลับมา
      // const { user, token } = data;
    
      // // Dispatch action loginSuccess เพื่อเก็บข้อมูลผู้ใช้และ token ใน Redux
      // dispatch(loginSuccess(user, token));


      if (response.ok) {
        //const data = await response.json(); // รับ Token และข้อความตอบกลับ
        console.log('Login successful');
        
        const data = await response.json();
        const {user, token, expiresAt } = data;
        console.log("Show token line98: ", token);
        console.log("Show expiresAt line99: ", expiresAt);

        console.log('Full data received:', data);

        const { username, image_profile , id, product_id} = data.user;
        // ตรวจสอบค่า product_id ก่อน
      const validProductId = product_id !== null && !isNaN(product_id) ? product_id : null;

        // เก็บข้อมูลผู้ใช้ใน localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('expiresAt', expiresAt);
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', id);
        localStorage.setItem('image_profile', image_profile);
        localStorage.setItem('product_id', validProductId);
        // localStorage.setItem('authToken', token);
        // localStorage.setItem('expiresAt', expiresAt);
        // localStorage.setItem('username', username);
        // localStorage.setItem('user_id', id);
        // localStorage.setItem('image_profile', image_profile);
        // localStorage.setItem('product_id', validProductId);

        console.log('User data from backend:', data.user);  // ตรวจสอบว่า data.user มี id หรือไม่

         // บันทึก userId ใน Redux
        //dispatch(setUser({ userId: id }));

        // เก็บ JWT Token ใน Local Storage
      //localStorage.setItem('authToken', data.token);
        // Show SweetAlert2 success message
      Swal.fire({
        icon: 'success',
        title: 'Login successfully',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // อัปเดตสถานะการเข้าสู่ระบบใน Redux
        //dispatch(setLoginStatus(true));
        dispatch(setLoginStatus(true));  // ตั้งสถานะเป็น true เมื่อเข้าสู่ระบบสำเร็จ
        dispatch(loginSuccess(user, token));
        //setLoginStatus({ type: 'SET_LOGIN_STATUS', payload: true });
        navigate('/');  // Navigate to the desired route  //แก้เส้นทาง route ที่ต้องการจะไป
      });
        //navigate('/Dashboard');
      } else {
        console.error('Login failed');
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };



// ตรวจสอบ token เมื่อหน้าเว็บโหลด
useEffect(() => {
  const token = localStorage.getItem('authToken');
  const expiresAt = localStorage.getItem('expiresAt');
  console.log("Show token: ", token);
  console.log("Show expiresAt: ", expiresAt);

  if (token && expiresAt) {
    if (Date.now() > parseInt(expiresAt, 10)) {
      // ลบ token ถ้าหมดอายุ
      localStorage.removeItem('authToken');
      localStorage.removeItem('expiresAt');
      dispatch(setLoginStatus(false));
    } else {
      dispatch(setLoginStatus(true));
    }
  }
}, [dispatch]);


  // ============= Event Handler End here ===============
  // const handleSignUp = (e) => {
  //   e.preventDefault();

  //   if (!email) {
  //     setErrEmail("Enter your email");
  //   }

  //   if (!password) {
  //     setErrPassword("Create a password");
  //   }
  //   // ============== Getting the value ==============
  //   if (email && password) {
  //     setSuccessMsg(
  //       `Hello dear, Thank you for your attempt. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
  //     );
  //     setEmail("");
  //     setPassword("");
  //   }


  // };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with OREBI
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all OREBI services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                {/*© OREBI*/}
                GEKKO SHOP
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>

    



      {/*successMsg*/}
      <div className="w-full lgl:w-1/2 h-full">
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Sign in
            </h1>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Work Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="john@workemail.com"
                />
                {errEmail && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                </p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Create password"
                />
                {errPassword && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPassword}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
                Sign In
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Don,t have an Account?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default SignIn;





{/*
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
              tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email 
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Work Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password 
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Sign In
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    */}