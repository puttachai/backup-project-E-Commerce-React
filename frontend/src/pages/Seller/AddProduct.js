import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("BASE_URL: ",BASE_URL); 

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState([]);
  // const [videoPreview, setVideoPreview] = useState(null);
  const [activeTab, setActiveTab] = useState([]);

  // const userId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    qty: "",
    description: "",
    category: "",
    brand: "",
    image: null,
  });

  // Image upload handler
  // const handleImageUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   setImagePreview(files.map((file) => URL.createObjectURL(file)));
  //   setFormData({
  //     ...formData,
  //     image: files[0], // Store the first image file
  //   });
  // };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log("Selected files: ", files);  // Debug log to check selected files
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
    setFormData({
      ...formData,
      image: files[0], // Store the first image file
    });
  };
  

  // Video upload handler
  // const handleVideoUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) setVideoPreview(URL.createObjectURL(file));
  // };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.name || !formData.price || !formData.qty || !formData.description || !formData.category || !formData.image) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return false;
    }
    if (isNaN(formData.price) || isNaN(formData.qty)) {
      alert("กรุณากรอกข้อมูลเป็นตัวเลขในช่องราคาและจำนวน!");
      return false;
    }
    return true;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const sellerId = localStorage.getItem("user_id");
    console.log("sellerId: ", sellerId);

    console.log("Form data before submit: ", formData);  // Debug log

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", parseFloat(formData.price));
    form.append("qty", parseInt(formData.qty, 10));
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("brand", formData.brand);
    form.append("sellerId", sellerId);

    console.log("formData.image: ", formData.image);
    form.append("image", formData.image);

    console.log("sellerId: ", sellerId);
    console.log("formData.image: ", formData.image);

    console.log("BASE_URL:",BASE_URL); 

    try {
      const response = await axios.post(`${BASE_URL}/api/sellers-add-product`, form, {
        // params:{sellerId},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response: ", response);
      console.log("BASE_URL:",BASE_URL); 
      alert("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        qty: "",
        description: "",
        category: "",
        brand: "",
        image: null,
      });
      setImagePreview([]);
      // setVideoPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="w-full py-4 px-2 pl-6">
      {/* Navbar */}
      <div className="text-sm text-gray-600 mb-4">
        หน้าหลัก &gt; สินค้าของฉัน &gt; เพิ่มสินค้าใหม่
      </div>

      {/* Page Header */}
      <div className="w-full rounded-2xl pl-4 pr-4 pt-3 pb-1 bg-gray-100 mb-2">
        <h1 className="text-2xl font-bold mb-4">เพิ่มสินค้าชิ้นใหม่</h1>

        {/* Tab Menu */}
        <div className="flex gap-4 mb-6">
          {["ข้อมูลทั่วไป", "ข้อมูลการขาย", "การจัดส่ง", "อื่น ๆ"].map(
            (tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === tab
                    ? "bg-white font-bold"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      <div className="w-full rounded-2xl p-6 bg-gray-100 pb-6">
        {/* Left Sidebar */}
        <div className="flex h-full">
          <div className="w-1/4 h-full bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">การปรับปรุงที่แนะนำ</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>เพิ่มรูปภาพอย่างน้อย 3 รูป</li>
              <li>เพิ่มวิดีโอ</li>
              <li>ตั้งชื่อสินค้าให้ความยาวระหว่าง 25-100 ตัวอักษร</li>
              <li>ระบุรายละเอียดสินค้าอย่างน้อย 100 ตัวอักษรเพื่อปรับปรุงข้อมูลสินค้า</li>
            </ul>
          </div>

          {/* Main Form */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 ml-4">
            <h2 className="text-xl font-bold mb-4">ข้อมูลทั่วไป</h2>

            {/* Upload Images */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                รูปภาพสินค้า *
              </label>
              <div className="flex space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg w-24 h-24 cursor-pointer"
                >
                  <span className="text-gray-500">เพิ่มรูปภาพ</span>
                </label>
                {imagePreview.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    // alt="Preview"
                    alt={`Product Preview ${index + 1}`}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Upload Video */}
            {/* <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                วิดีโอสินค้า
              </label>
              <div className="flex space-x-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="videoUpload"
                />
                <label
                  htmlFor="videoUpload"
                  className="flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg w-24 h-24 cursor-pointer"
                >
                  <span className="text-gray-500">เพิ่มวิดีโอ</span>
                </label>
                {videoPreview && (
                  <video
                    src={videoPreview}
                    controls
                    className="w-64 h-36 rounded-lg mt-4"
                  ></video>
                )}
              </div>
            </div> */}

            {/* Product Details */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">ชื่อสินค้า *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ชื่อแบรนด์ + ประเภทสินค้า + คุณลักษณะพิเศษ"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* Price and Quantity */}
            <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                  ราคา Price *
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="ราคาสินค้า"
                  className="block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="qty" className="block text-gray-700 font-bold mb-2">
                  จำนวนสินค้า *
                </label>
                <input
                  type="text"
                  name="qty"
                  id="qty"
                  value={formData.qty}
                  onChange={handleChange}
                  placeholder="จำนวนสินค้า"
                  className="block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Brand */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="ชื่อแบรนด์"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">หมวดหมู่ *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="" disabled>
                  กรุณาเลือกหมวดหมู่สินค้า
                </option>
                <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
                <option value="มือถือ">มือถือ</option>
                <option value="นาฬิกา">นาฬิกา</option>
                <option value="กล้อง">กล้อง</option>
                <option value="Electronics Accessories">Electronics Accessories</option>
                <option value="Home Living">Home Living</option>
                <option value="Men Clothes">Men Clothes</option>
                <option value="Men Shoes">Men Shoes</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Bags">Bags</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Fashion Accessories">Fashion Accessories</option>
                <option value="Women Shoes">Women Shoes</option>
                <option value="Baby & Toys">Baby & Toys</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">รายละเอียดสินค้า *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="กรุณาใส่รายละเอียดสินค้า เช่น น้ำหนัก, วัสดุที่ใช้, วิธีใช้งาน"
                className="w-full border border-gray-300 rounded-md p-2 h-32"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button className="bg-gray-200 text-black">บันทึกร่าง</Button>
              <Button onClick={handleSubmit} className="bg-red-500 text-white">บันทึกและเผยแพร่</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;



////////////////เชื่อมต่อ Database /////////////////
// import React, { useState } from "react";
// import axios from "axios";
// import { Button } from "../../components/ui/button";

// const AddProduct = () => {
//   const [imagePreview, setImagePreview] = useState([]);
//   const [formData, setFormData] = useState({
//     barcode: "",
//     name: "",
//     price: "",
//     qty: "",
//     description: "",
//     category: "",
//     brand: "",
//     image: null,
//   });

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setImagePreview(URL.createObjectURL(file));
//     setFormData({ ...formData, image: file });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("barcode", formData.barcode);
//     form.append("name", formData.name);
//     form.append("price", formData.price);
//     form.append("qty", formData.qty);
//     form.append("description", formData.description);
//     form.append("category", formData.category);
//     form.append("brand", formData.brand);
//     form.append("image", formData.image);

//     try {
//       const response = await axios.post("/api/add-product", form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("response: ",response);
//       alert("Product added successfully!");
//       setFormData({
//         barcode: "",
//         name: "",
//         price: "",
//         qty: "",
//         description: "",
//         category: "",
//         brand: "",
//         image: null,
//       });
//       setImagePreview([]);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product.");
//     }
//   };

//   return (
//     <div className="w-full py-4 px-2 pl-6">
//       <h1 className="text-2xl font-bold mb-4">เพิ่มสินค้าชิ้นใหม่</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-gray-700">ชื่อสินค้า</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>a
//           <label className="block text-gray-700">ราคา</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700">จำนวน</label>
//           <input
//             type="number"
//             name="qty"
//             value={formData.qty}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700">บาร์โค้ด</label>
//           <input
//             type="text"
//             name="barcode"
//             value={formData.barcode}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700">รายละเอียดสินค้า</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700">หมวดหมู่</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           >
//             <option value="">กรุณาเลือกหมวดหมู่</option>
//             <option value="category1">หมวดหมู่ 1</option>
//             <option value="category2">หมวดหมู่ 2</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700">แบรนด์</label>
//           <input
//             type="text"
//             name="brand"
//             value={formData.brand}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700">รูปภาพสินค้า</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="mt-4 w-24 h-24 rounded-lg object-cover"
//             />
//           )}
//         </div>

//         <Button type="submit" className="bg-blue-500 text-white">เพิ่มสินค้า</Button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;



//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "ข้อมูลทั่วไป":
//         return (
//           <div>
//             {/* Upload Images */}
//             <div className="mb-6">
//               <label className="block text-gray-700 font-bold mb-2">
//                 รูปภาพสินค้า *
//               </label>
//               <div className="flex space-x-4">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   id="imageUpload"
//                 />
//                 <label
//                   htmlFor="imageUpload"
//                   className="flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg w-24 h-24 cursor-pointer"
//                 >
//                   <span className="text-gray-500">เพิ่มรูปภาพ</span>
//                 </label>
//                 {imagePreview.map((src, index) => (
//                   <img
//                     key={index}
//                     src={src}
//                     alt="Preview"
//                     className="w-24 h-24 rounded-lg object-cover"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Upload Video */}
//             <div className="mb-6">
//               <label className="block text-gray-700 font-bold mb-2">
//                 วิดีโอสินค้า
//               </label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleVideoUpload}
//                 className="hidden"
//                 id="videoUpload"
//               />
//               <label
//                 htmlFor="videoUpload"
//                 className="flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg w-24 h-24 cursor-pointer"
//               >
//                 <span className="text-gray-500">เพิ่มวิดีโอ</span>
//               </label>
//               {videoPreview && (
//                 <video
//                   src={videoPreview}
//                   controls
//                   className="w-64 h-36 rounded-lg mt-4"
//                 ></video>
//               )}
//             </div>

//             {/* Product Details */}
//             <div className="mb-6">
//               <label className="block text-gray-700 font-bold mb-2">ชื่อสินค้า *</label>
//               <input
//                 type="text"
//                 placeholder="ชื่อแบรนด์ + ประเภทสินค้า + คุณลักษณะพิเศษ"
//                 maxLength={120}
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//             </div>

//             {/* Category */}
//             <div className="mb-6">
//               <label className="block text-gray-700 font-bold mb-2">หมวดหมู่ *</label>
//               <select className="w-full border border-gray-300 rounded-md p-2">
//                 <option value="" disabled>
//                   กรุณาเลือกหมวดหมู่สินค้า
//                 </option>
//                 <option value="หมวดหมู่1">หมวดหมู่ 1</option>
//                 <option value="หมวดหมู่2">หมวดหมู่ 2</option>
//               </select>
//             </div>

//             {/* Product Description */}
//             <div className="mb-6">
//               <label className="block text-gray-700 font-bold mb-2">
//                 รายละเอียดสินค้า *
//               </label>
//               <textarea
//                 placeholder="กรุณาใส่รายละเอียดสินค้า เช่น น้ำหนัก, วัสดุที่ใช้, วิธีใช้งาน"
//                 maxLength={5000}
//                 className="w-full border border-gray-300 rounded-md p-2 h-32"
//               ></textarea>
//             </div>
//           </div>
//         );
//       case "ข้อมูลการขาย":
//         return <div>ฟอร์มข้อมูลการขาย (กำลังพัฒนา)</div>;
//       case "การจัดส่ง":
//         return <div>ฟอร์มการจัดส่ง (กำลังพัฒนา)</div>;
//       case "อื่น ๆ":
//         return <div>ฟอร์มข้อมูลอื่น ๆ (กำลังพัฒนา)</div>;
//       default:
//         return null;
//     }
//   };