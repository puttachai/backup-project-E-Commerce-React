import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePosition, setImagePosition] = useState(0);
  console.log("imagePosition: ",imagePosition);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const userId = localStorage.getItem("user_id"); // กำหนด userId ที่ต้องการ (อาจมาจาก Context หรือ LocalStorage)

  console.log("userId: ", userId);
  console.log("selectedImage: ", selectedImage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/seller-showMyproduct?userId=${userId}`,{
          headers: {
            'Cache-Control': 'no-cache', // ห้ามแคช
            "Content-Type": "multipart/form-data",
          },
        });
        const data = await response.json();

        console.log("data: ",data);
        console.log("response: ",response);

        if (response.ok) {
          setProducts(data);
          console.log("response: ",response);
          console.log("response.ok: ",response.ok);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchProducts();
  }, [userId]);


  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

//   useEffect(() => {

//     const handleScroll = () => setImagePosition(window.scrollY);
//     const s = window.addEventListener("scroll", handleScroll);

//     const scrollY = s;
//     setImagePosition(`translateY(${scrollY}px)`);
//     console.log("scrollY: ",scrollY);
//     console.log("setImagePosition: ",setImagePosition);
  
//   // handleScroll();
//   console.log("handleScroll: ",handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);


useEffect(() => {
  const handleScroll = () => {
    // เมื่อมีการ scroll จะปรับค่าตำแหน่ง
    setImagePosition(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  

  // useEffect(() => {
  //   if (selectedImage) {
  //     document.body.style.overflow = "hidden"; // ปิดการเลื่อน
  //   } else {
  //     document.body.style.overflow = "auto"; // เปิดการเลื่อนปกติ
  //   }
  
  //   return () => {
  //     document.body.style.overflow = "auto"; // เปิดการเลื่อนเมื่อปิด Pop-up
  //   };
  // }, [selectedImage]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollPosition(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);


  return (

      <div className="flex w-full h-full px-4 py-4 ml-4 mr-6">
        <div className="w-full p-6 rounded-2xl  bg-gray-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">สินค้าของฉัน</h1>
            <div className="space-x-2">
              <Button className="bg-gray-200 text-white">ตั้งค่าสินค้า</Button>
              <Button className="bg-gray-200 text-black">ทำแบบชุด</Button>
              <Link to="/seller/addproduct">
                <Button className="bg-red-500 text-white">เพิ่มสินค้าใหม่</Button>
              </Link>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg">สินค้าทั้งหมด</h2>
              <div className="flex items-center">
                <span className="text-gray-500">{products.length} รายการ</span>
              </div>
            </div>

            {/* ใช้ overflow-x-auto สำหรับการเลื่อนตารางในขนาดหน้าจอเล็ก */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">สินค้า</th>
                    <th className="py-2 text-center">ยอดขาย</th>
                    <th className="py-2 text-center">ราคา</th>
                    <th className="py-2 text-center">คลัง</th>
                    <th className="py-2 text-center">คุณภาพรายการสินค้า</th>
                    <th className="py-2">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.product_id} className="border-b">
                        {/* <td className="py-2 flex items-center space-x-2">
                          <img
                            src={`/images/product/${product.image}`}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span className="text-gray-500">
                            {product.name.length > 50
                              ? product.name.slice(0, 50) + "..."
                              : product.name}
                          </span>
                        </td> */}
                        <td className="w-[150px] py-2 flex flex-col items-start space-y-2"> {/* max-w-[150px]  */}
                          <img
                            src={`/images/product/${product.image}`}
                            alt={product.name}
                            className="w-20 h-20 cursor-pointer object-cover rounded"
                            onClick={() => {
                              console.log("Image clicked:", `/images/product/${product.image}`);
                              setSelectedImage(`/images/product/${product.image}`)}
                            }
                          />
                          <span className="text-gray-500 text-start">
                            {product.name.length > 35
                              ? product.name.slice(0, 35) + "..."
                              : product.name}
                          </span>
                        </td>
                        <td className="py-2 text-center">0</td> {/* สมมติยอดขายยังไม่มี */}
                        <td className="py-2 text-center">{product.price} บาท</td>
                        <td className="py-2 text-center">{product.qty} ชิ้น</td>
                        <td className="py-2 text-gray-500 ">
                          {product.description.length > 50
                            ? product.description.slice(0, 50) + "..."
                            : product.description}
                        </td>
                        <td className="py-2">
                          <Button className="bg-yellow-500 text-white">แก้ไข</Button>
                          <Button className="bg-red-500 text-white ml-2">ลบ</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-4 text-center" colSpan="6">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full mb-2"></div>
                          <p className="text-gray-500">ไม่พบสินค้า</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>


      {/* Popup แสดงรูปภาพเมื่อคลิก */}
        {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto" 
          onClick={() => setSelectedImage(null)}
          
        >
          <div>
            <div className="imagescroll relative bg-white p-4 rounded-lg mt-10 " //transition-transform duration-300 ease-out hover:scale-105
              // style={{ top: `${scrollY + 100}px` }} // เลื่อนตาม Scroll
              // style={{ transform: ImagePosition }}
              style={{ transform: `translateY(${imagePosition}px)`, marginTop: "250px" }} // เลื่อนตาม scrollY
            > 
              <button
                className="absolute top-2 right-2 text-black text-xl font-bold"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
              <img 
                src={selectedImage} 
                alt="Product" 
                className="max-w-[vw] max-h-[50vh] object-contain rounded-lg " 
              />
            </div>
          </div>
        </div>
      )}


      </div>
  );
};

export default ProductManagement;




// {/* Popup แสดงรูปภาพเมื่อคลิก */}
// {selectedImage && (
//   // <div className="bg-black bg-opacity-50">
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" //{/* fixed, w-full fixed top-5 botton-0 left-0 bg-black bg-opacity-50 flex justify-center items-center z-50 */}
//       onClick={() => setSelectedImage(null)}
//     >
//       <div className="relative bg-white p-4 rounded-lg"> {/* relative */}
//         <button
//           className="absolute top-2 right-2 text-black text-xl font-bold" //{/* absolute */}
//           onClick={() => setSelectedImage(null)}
//         >
//           ✕
//         </button>
//         <img src={selectedImage} alt="Product" className="max-w-[full] max-h-[50vh] object-contain rounded-lg" />
//       </div>
//     </div>
//   // </div>
// )}



    // <div className="flex w-full h-full px-4 py-4 ml-4 mr-6">
    //   <div className="w-full p-6 rounded-2xl bg-gray-100">
    //     {/* Header */}
    //     <div className="flex justify-between items-center mb-4">
    //       <h1 className="text-2xl font-bold">สินค้าของฉัน</h1>
    //       <div className="space-x-2">
    //         <Button className="bg-gray-200 text-white">ตั้งค่าสินค้า</Button>
    //         <Button className="bg-gray-200 text-black">ทำแบบชุด</Button>
    //         <Link to="/seller/addproduct">
    //           <Button className="bg-red-500 text-white">เพิ่มสินค้าใหม่</Button>
    //         </Link>
    //       </div>
    //     </div>

    //     {/* Product Table */}
    //     <div className="bg-white p-4 shadow rounded-lg">
    //       <div className="flex justify-between items-center mb-2">
    //         <h2 className="font-bold text-lg">สินค้าทั้งหมด</h2>
    //         <div className="flex items-center">
    //           <span className="text-gray-500">{products.length} รายการ</span>
    //         </div>
    //       </div>
    //       <table className="w-full text-left border-collapse">
    //         <thead>
    //           <tr className="border-b">
    //             <th className="py-2">สินค้า</th>
    //             <th className="py-2">ยอดขาย</th>
    //             <th className="py-2">ราคา</th>
    //             <th className="py-2">คลัง</th>
    //             {/* <th className="py-2">คำอธิบาย</th> */}
    //             <th className="py-2">คุณภาพรายการสินค้า</th>
    //             <th className="py-2">การดำเนินการ</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {products.length > 0 ? (
    //             products.map((product) => (
    //               <tr key={product.product_id} className="border-b">
    //                 {/* <td className="py-2 flex items-center space-x-2">
    //                   <img
    //                     src={`/images/product/${product.image}`}
    //                     alt={product.name}
    //                     className="w-12 h-12 object-cover rounded"
    //                   />
    //                   <span>{product.name}</span>
    //                 </td> */}
    //                 <td className="py-2 flex items-center space-x-2">
    //                     <img
    //                       src={`/images/product/${product.image}`}
    //                       alt={product.name}
    //                       className="w-12 h-12 object-cover rounded"
    //                     />
    //                     <span className="text-gray-500">
    //                       {product.name.length > 50 
    //                         ? product.name.slice(0, 50) + "..." 
    //                         : product.name}
    //                     </span>
    //                   </td>
    //                 <td className="py-2">0</td> {/* สมมติยอดขายยังไม่มี */}
    //                 <td className="py-2">{product.price} บาท</td>
    //                 <td className="py-2">{product.qty}</td>
    //                 {/* <td className="py-2">{product.description}</td>
    //                  */}
    //                  <td className="py-2 text-gray-500">
    //                     {product.description.length > 50 
    //                       ? product.description.slice(0, 50) + "..." 
    //                       : product.description}
    //                  </td>
    //                  {/* <td className="py-2 text-gray-700 break-words whitespace-pre-line">
    //                     {product.description}
    //                   </td> */}
    //                   {/* <td className="py-2 text-gray-700 whitespace-pre-line">
    //                     {product.description.match(/.{1,150}/g).join("\n")}
    //                   </td> */}
    //                 <td className="py-2">
    //                   <Button className="bg-yellow-500 text-white">แก้ไข</Button>
    //                   <Button className="bg-red-500 text-white ml-2">ลบ</Button>
    //                 </td>
    //               </tr>
    //             ))
    //           ) : (
    //             <tr>
    //               <td className="py-4 text-center" colSpan="6">
    //                 <div className="flex flex-col items-center">
    //                   <div className="w-16 h-16 bg-gray-100 rounded-full mb-2"></div>
    //                   <p className="text-gray-500">ไม่พบสินค้า</p>
    //                 </div>
    //               </td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

// import React from "react";
// import { Button } from "../../components/ui/button";
// import { Link } from "react-router-dom";

// const ProductManagement = () => {
//   return (
//     <div className="flex w-full h-full px-4 py-4 ml-4 mr-6">

//     <div className="w-full p-6 rounded-2xl bg-gray-100 "> {/* min-h-screen */}
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">สินค้าของฉัน</h1>
//         <div className="space-x-2">
//           <Button className="bg-gray-200 text-white hover:bg-gray-750  hover:dark:text-white">ตั้งค่าสินค้า</Button>
//           <Button className="bg-gray-200 text-black">ทำแบบชุด</Button>
//           <Link to="/seller/addproduct"><Button className="bg-red-500 text-white">เพิ่มสินค้าใหม่</Button></Link>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-4 border-b pb-2 mb-4">
//         {["ทั้งหมด", "ขายอยู่ (0)", "การละเมิด (0)", "อยู่ระหว่างตรวจสอบ (0)", "ยังไม่ลงขาย (0)"].map((tab, index) => (
//           <button
//             key={index}
//             className="text-gray-600 hover:text-red-500 border-red-500 pb-2 focus:outline-none"
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Filter Section */}
//       <div className="bg-white p-4 shadow rounded-lg mb-4">
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="ค้นหาด้วย ชื่อสินค้า, Parent SKU, เลข SKU, รหัสสินค้า"
//             className="border border-gray-300 rounded-md p-2 w-1/3"
//           />
//           <select
//             className="border border-gray-300 rounded-md p-2 w-1/4"
//             defaultValue=""
//           >
//             <option value="" disabled>
//               ค้นหาด้วยหมวดหมู่สินค้า
//             </option>
//             <option value="หมวดหมู่1">หมวดหมู่1</option>
//             <option value="หมวดหมู่2">หมวดหมู่2</option>
//           </select>
//           <Button className="bg-blue-500 text-white">ยืนยัน</Button>
//           <Button className="bg-gray-200 text-black">รีเซ็ต</Button>
//         </div>
//       </div>

//       {/* Product Table */}
//       <div className="bg-white p-4 shadow rounded-lg">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="font-bold text-lg">สินค้าทั้งหมด</h2>
//           <div className="flex items-center">
//             <span className="text-gray-500">0 รายการ</span>
//           </div>
//         </div>
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b">
//               <th className="py-2">สินค้า</th>
//               <th className="py-2">ยอดขาย</th>
//               <th className="py-2">ราคา</th>
//               <th className="py-2">คลัง</th>
//               <th className="py-2">คุณภาพรายการสินค้า</th>
//               <th className="py-2">การดำเนินการ</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="py-4 text-center" colSpan="6">
//                 <div className="flex flex-col items-center">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full mb-2"></div>
//                   <p className="text-gray-500">ไม่พบสินค้า</p>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default  ProductManagement;