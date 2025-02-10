// import React from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import React from "react"; //useState
import { Link, Outlet } from "react-router-dom";
import emptyCart from "../../assets/images/emptyCart.png"; // Define the emptyCart image (adjust the path as necessary)
import { useSelector } from "react-redux"; //useSelector
import { motion } from "framer-motion"; // Import motion for animation
// import Heading from "../../components/home/Products/Heading";

const SellerCentreDashboard = () => {
  // const [selectedImage, setSelectedImage] = useState(null);

  const isLoggedIn = useSelector(state => state.loginStatus); // ใช้ useSelector เพื่อตรวจสอบสถานะ login

    // const data = [
    //     { name: "Jan", sales: 4000, visitors: 2400, orders: 2400 },
    //     { name: "Feb", sales: 3000, visitors: 1398, orders: 2210 },
    //     { name: "Mar", sales: 2000, visitors: 9800, orders: 2290 },
    //     { name: "Apr", sales: 2780, visitors: 3908, orders: 2000 },
    //     { name: "May", sales: 1890, visitors: 4800, orders: 2181 },
    //     { name: "Jun", sales: 2390, visitors: 3800, orders: 2500 },
    //     { name: "Jul", sales: 3490, visitors: 4300, orders: 2100 },
    //   ];
      

  return (
    <>
    {/* <div className="bg-white rounded-lg shadow sm:max-w-4xl"> font-bold text-gray-800 */}
      {/* <Heading heading="Seller Centre" className="mx-4 mt-4 pb-0 ml-[35px] text-sky-300 text-2xl"/> */}
      <h1 className="mx-4 mt-4 pb-0 ml-[35px] font-bold  text-3xl text-sky-300 text-2xl bg-gradient-to-r from-[#092fc4] via-[#216ad9] to-[#38a4ee] text-transparent bg-clip-text">Seller Centre</h1>
    {/* </div> */}
    {isLoggedIn ? (
      
    <div className="flex h-full px-4 py-4 mb-4"> {/* px-4 py-4 */}
    {/* Sidebar Menu */}
    <aside className="w-64 pt-4 bg-white-100 border-r h-full">
      <nav className="p-4 space-y-2">
        <h2 className="font-bold text-lg">คำสั่งซื้อ</h2>
        <ul className="space-y-1">
        <Link to="/seller/mdc"><li className="hover:text-blue-500 pl-4">คำสั่งซื้อของฉัน</li></Link>
          <li><a href="#" className="hover:text-blue-500 pl-4">จัดส่งแบบชุด</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">พัสดุที่รอการส่งมอบ</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">ขอคืนเงิน/คืนสินค้า</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">ตั้งค่าการจัดส่ง</a></li>
        </ul>
        <h2 className="font-bold text-lg mt-4">สินค้า</h2>
        <ul className="space-y-1">
        <Link to="/seller/pmg"><li className="hover:text-blue-500 pl-4">สินค้าของฉัน</li></Link>
        <Link to="/seller/addproduct"><li className="hover:text-blue-500 pl-4">เพิ่มสินค้าชิ้นใหม่</li></Link>
        </ul>
        <h2 className="font-bold text-lg mt-4">Marketing Centre</h2>
        <ul className="space-y-1">
          <li><a href="#" className="hover:text-blue-500 pl-4">Marketing Centre</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">แคมเปญเสนอราคา</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">Shopee Ads</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">โปรโมทผ่านพาร์ทเนอร์</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">Live & Video</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">ส่วนลด</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">Flash Sale</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">โค้ดส่วนลด</a></li>
          <li><a href="#" className="hover:text-blue-500 pl-4">แคมเปญ</a></li>
        </ul>
      </nav>
    </aside>
    <Outlet />

    </div>
    ) : (
      // When user is not logged in
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
            You need to log in to access your seller.
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

export default SellerCentreDashboard;


    // {/* Main Dashboard Content */}
    // <main className="flex-1 bg-gray-50 p-6 px-4 py-4">
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    //     <Card className="shadow">
    //       <CardContent>
    //         <h3 className="text-lg font-bold">คำสั่งซื้อ</h3>
    //         <p className="text-2xl font-semibold">0</p>
    //       </CardContent>
    //     </Card>
    //     <Card className="shadow">
    //       <CardContent>
    //         <h3 className="text-lg font-bold">กำลังจัดส่ง</h3>
    //         <p className="text-2xl font-semibold">0</p>
    //       </CardContent>
    //     </Card>
    //     <Card className="shadow">
    //       <CardContent>
    //         <h3 className="text-lg font-bold">คำขอคืนเงิน/คืนสินค้า</h3>
    //         <p className="text-2xl font-semibold">0</p>
    //       </CardContent>
    //     </Card>
    //     <Card className="shadow">
    //       <CardContent>
    //         <h3 className="text-lg font-bold">สินค้าที่ถูกระงับ/ลดการโปรโมต</h3>
    //         <p className="text-2xl font-semibold">0</p>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   <div className="my-6">
    //     <h3 className="text-lg font-bold mb-4">Business Insights</h3>
    //     <LineChart
    //       width={800}
    //       height={300}
    //       data={data}
    //       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    //     >
    //       <CartesianGrid strokeDasharray="3 3" />
    //       <XAxis dataKey="name" />
    //       <YAxis />
    //       <Tooltip />
    //       <Legend />
    //       <Line type="monotone" dataKey="sales" stroke="#8884d8" />
    //       <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
    //       <Line type="monotone" dataKey="orders" stroke="#ffc658" />
    //     </LineChart>
    //   </div>

    //   <div>
    //     <h3 className="text-lg font-bold mb-4">GekkoShop Ads</h3>
    //     <Card className="shadow">
    //       <CardContent className="flex justify-between items-center">
    //         <p>เพิ่มยอดขายด้วย GekkoShop Ads</p>
    //         <Button className="bg-blue-500 text-white">เรียนรู้เพิ่มเติม</Button>
    //       </CardContent>
    //     </Card>
    //   </div>

    //    {/* ประกาศ */}
    //     <div className="mt-6">
    //     <Card className="border rounded-lg shadow-sm">
    //         <CardHeader>
    //         <h2 className="text-lg font-semibold">ประกาศ</h2>
    //         </CardHeader>
    //         <CardContent>
    //         <ul className="list-disc pl-5">
    //             <li>หนึ่งสือพิมพ์ผู้ขาย ฉบับ 20 ม.ค. 68</li>
    //             <li>GekkoShop Mentor 2025 เปิดรับสมัครแล้ว!</li>
    //         </ul>
    //         </CardContent>
    //     </Card>
    //     </div>

    // </main>
    


 {/* ประกาศ */}
//  <div className="mt-6">
//  <Card className="border rounded-lg shadow-sm">
//    <CardHeader>
//      <h2 className="text-lg font-semibold">ประกาศ</h2>
//    </CardHeader>
//    <CardContent>
//      <ul className="list-disc pl-5">
//        <li>หนึ่งสือพิมพ์ผู้ขาย ฉบับ 20 ม.ค. 68</li>
//        <li>Shopee Mentor 2025 เปิดรับสมัครแล้ว!</li>
//      </ul>
//    </CardContent>
//  </Card>
// </div>





///////////////


// {/* <div className="bg-gray-100 min-h-screen p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center pb-4">
//         <h1 className="text-2xl font-bold">Shopee Seller Centre</h1>
//         <Button className="bg-red-500 hover:bg-red-600 text-white">
//           ศึกษาเพิ่มเติม
//         </Button>
//       </div>

//       {/* Notification */}
//       <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-4">
//         <p>ขณะนี้ปุ่มเปิด-ปิดการผ่อนชำระด้วยบัตรเครดิตในหน้าตั้งค่าชำระเงินบน Seller Centre ไม่สามารถใช้งานได้...</p>
//       </div>

//       {/* Dashboard Sections */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {/* ที่ต้องทำ */}
//         <Card className="border rounded-lg shadow-sm">
//           <CardHeader>
//             <h2 className="text-lg font-semibold">ที่ต้องทำ</h2>
//           </CardHeader>
//           <CardContent>
//             <div className="text-center">
//               <p>0 ที่ต้องจัดส่ง</p>
//               <p>0 คำขอคืนเงิน/คืนสินค้า/ยกเลิก</p>
//               <p>0 สินค้าที่ถูกระงับ/ลดการโปรโมต</p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* สถิติร้านค้า */}
//         <Card className="border rounded-lg shadow-sm">
//           <CardHeader>
//             <h2 className="text-lg font-semibold">สถิติร้านค้า</h2>
//           </CardHeader>
//           <CardContent>
//             <p className="text-center">ข้อมูลสถิติจะปรากฏที่นี่</p>
//           </CardContent>
//         </Card>

//         {/* Business Insights */}
//         <Card className="border rounded-lg shadow-sm col-span-2">
//           <CardHeader>
//             <h2 className="text-lg font-semibold">Business Insights</h2>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-4 text-center gap-2">
//               <div>
//                 <p className="font-bold">ยอดขาย</p>
//                 <p>฿0</p>
//               </div>
//               <div>
//                 <p className="font-bold">จำนวนผู้เยี่ยมชม</p>
//                 <p>0</p>
//               </div>
//               <div>
//                 <p className="font-bold">ยอดเข้าชม</p>
//                 <p>0</p>
//               </div>
//               <div>
//                 <p className="font-bold">คำสั่งซื้อ</p>
//                 <p>0</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Shopee Ads */}
//       <div className="mt-6">
//         <Card className="border rounded-lg shadow-sm">
//           <CardHeader>
//             <h2 className="text-lg font-semibold">Shopee Ads</h2>
//           </CardHeader>
//           <CardContent>
//             <div className="text-center">
//               <p>เพิ่มยอดขายด้วย Shopee Ads</p>
//               <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">เรียนรู้เพิ่มเติม</Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

     
//     </div> */}