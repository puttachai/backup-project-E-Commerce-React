import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
//import ProductInfo from "./components/pageProps/productDetails/ProductInfo";
import SpecialCase from "./components/SpecialCase/Specialcase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Logout from "./pages/Account/Logout";
import Profile from "./person/profile-page";
import Cart from "./pages/Cart/Cart";
//เพิ่ม
import Heartfill from "./pages/heartfill/heartfill"; // ตรวจสอบเส้นทางให้ถูกต้อง
//import Bssuitheartfill from "./pages/heartfill/heartfill";

import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Paymenttest";
import PaymentPage from "./pages/payment/payment-page";
import Payments from "./pages/payment/Payments";
import PaymentsInfo from "./pages/payment/PaymentInformation";
import PromptPayCheckout from "./pages/payment/PromptPayCheckout";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import History from "./person/History";
import BankAndCard from "./person/bankAndcard";
import AddressList from "./person/AddressList";
import Purchases from "./person/Purchases";
import ProductsByCategory from './components/categories/ProductsByCategory';

//import { CartProvider } from './components/pageProps/context/CartContext'
import Shop from "./pages/Shop/Shop";
import ShopCategories from "./pages/Shop/ShopCategories";
import Seller from "./pages/Seller/SellerCentreDashboard";
import Mdc from "./pages/Seller/MainDashboardContent";
import Pmg from "./pages/Seller/ProductManagement";
import SellerAddProduct from "./pages/Seller/AddProduct";
import SellerRegister from "./pages/Seller/registerSellers/RegisterSellers";
import './index.css'; // หรือไฟล์ CSS ที่มี .Toastify__toast-container
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const container = document.querySelector("#custom-toast-container");
  //     console.log("Container:", container); // ดูว่า container ถูกเลือกหรือไม่
  //     if (container) {
  //       container.style.transform = `translateY(${window.scrollY}px)`;
  //     }
  //   };
  
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
       <div
        id="custom-toast-container"
        style={{
          position: "absolute",
          top: `${scrollPosition}px`,
          right: "0px",
          zIndex: 9999,
        }}
      >
        <ToastContainer
          // containerId="custom-toast-container"
          className="toast-position"
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          // transition={Bounce}
        />
        </div>
      <Header />
      <HeaderBottom />
      {/* <ProductInfo /> */}
      {/* <CartProvider>
        <HeaderBottom />
        <ProductInfo />
      </CartProvider> */}
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/shopcategories" element={<ShopCategories />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        <Route path="/seller" element={<Seller />}>
          <Route path="/seller/mdc" element={<Mdc />}></Route>
          <Route path="/seller/pmg" element={<Pmg />}></Route>
          <Route path="/seller/addproduct" element={<SellerAddProduct />}></Route>
        </Route>
        <Route path="/sellerRegister" element={<SellerRegister />}></Route>
        <Route path="/pmg" element={<Pmg />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category/:categoryId" element={<Offer />}></Route>
        {/* <Route path="/reference/:reference" element={<Offer />}></Route> */}
        {/* <Route path="/category/:category" element={<Offer />}></Route> */}
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/products/category/:categories_id" element={<ProductsByCategory />} />

        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/history" element={<History />}></Route>
          <Route path="/profile/bankandcard" element={<BankAndCard />}></Route>
          <Route path="/profile/addresslist" element={<AddressList />}></Route>
          <Route path="/profile/purchases" element={<Purchases />}></Route>
        </Route>
        {/* <Route path="/history" element={<History />}></Route>
        <Route path="/bankandcard" element={<BankAndCard />}></Route> */}

        <Route path="/signinresize" element={<SignIn />}></Route>
        <Route path="/signupresize" element={<SignUp />}></Route>
        {/* <Route path="/bssuitheartfill" element={<Bssuitheartfill />}></Route> */}
        <Route path="/bssuitheartfill" element={<Heartfill />} />

        {/* <Route path="/profile/history" element={<History />}></Route>
        <Route path="/profile/bankandcard" element={<BankAndcard />}></Route> */}

        <Route path="/paymentgateway" element={<Payment />}></Route>
        <Route path="/promptpaycheckout" element={<PromptPayCheckout />}></Route>
        <Route path="/paymentpage" element={<PaymentPage />}></Route>
        <Route path="/payments" element={<Payments />}></Route>
        <Route path="/paymentInfo/:referenceNumber" element={<PaymentsInfo />}></Route>
        {/* <Route path="/paymentInfo" element={<PaymentsInfo />}></Route> */}

      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      
      <Route path="/logout" element={<Logout />}></Route>
    </Route>
  )
);

// ${isVisiblet ? "absolute left-4 lg:static justify-between" : "hidden"} `}

// useEffect(() => {
//   const handleResize = () => {
//     const clientWidth = document.documentElement.clientWidth;
//     console.log("Viewport Width (Client):", clientWidth);
//     setIsVisiblejustify(clientWidth < 960);
//   };

//   handleResize();

//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);

function App() {
  
  const [isVisiblejustify, setIsVisiblejustify] = useState(window.innerWidth >= 360);

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth;
      console.log("Viewport Width (Client):", clientWidth);
      setIsVisiblejustify(clientWidth < 360);
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //xs:w-[100%] sm:w-[100%] sml:w-[100%]
  
  return (
    <div className={`font-bodyFont  ${isVisiblejustify ? "w-full xs:w-[100%] sm:w-[100%] sml:w-[100%]" : ""} `}>
      <RouterProvider router={router} />
      {/* <RouterProvider router={0} /> */}
    </div>
  );
}

export default App;
