import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [sellerId, setSellerId] = useState(null);

  const [updatedImage, setUpdatedImage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedQty, setUpdatedQty] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false); // State to track if delete is confirmed

  const [salesData, setSalesData] = useState([]);
  const [businessInsights, setBusinessInsights] = useState([]);
  console.log("businessInsights: ", businessInsights);
  console.log("currentImage: ", currentImage);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePosition, setImagePosition] = useState(0);
  console.log("imagePosition: ", imagePosition);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const userId = localStorage.getItem("user_id"); // กำหนด userId ที่ต้องการ (อาจมาจาก Context หรือ LocalStorage)

  console.log("userId: ", userId);
  console.log("selectedImage: ", selectedImage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/seller-showMyproduct?sellerId=${sellerId}`,
          {
            headers: {
              "Cache-Control": "no-cache", // ห้ามแคช
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const data = await response.json();

        console.log("data: ", data);
        console.log("response: ", response);

        if (response.ok) {
          setProducts(data);
          console.log("response: ", response);
          console.log("response.ok: ", response.ok);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const handleEditClick = (product) => {
    console.log("Selected product:", product); // Log the product object
    setCurrentProduct(product);
    setCurrentImage(product.image);
    setUpdatedPrice(product.price);
    setUpdatedDescription(product.description);
    setUpdatedQty(product.qty);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   if (products.length > 0 && salesData.length > 0) {
  //     // ผูกข้อมูลยอดขายเข้ากับสินค้า
  //     const updatedProducts = products.map((product) => {
  //       const salesInfo = salesData.find((sale) => sale.product_id === product.product_id);
  //       return { ...product, total_revenue: salesInfo ? salesInfo.total_revenue : 0 };
  //     });
  //     setProducts(updatedProducts);
  //   }
  // }, [salesData, products]);

  useEffect(() => {
    console.log("userId :", userId);
    if (userId) {
      axios
        .get(`${BASE_URL}/api/get-seller-id/${userId}`, {
          headers: {
            "Cache-Control": "no-cache", // ห้ามแคช
          },
        })
        .then((response) => {
          console.log("response get-seller-id: ", response);
          if (response.data.sellerId) {
            setSellerId(response.data.sellerId);
          } else {
            console.error("Seller ID not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching seller ID:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    console.log("sellerId :", sellerId);
    if (sellerId) {
      fetch(`${BASE_URL}/api/pmg-seller-sales/${sellerId}`, {
        headers: {
          "Cache-Control": "no-cache", // ห้ามแคช
        },
      })
        .then((response) => response.json()) // แก้ไขให้ใช้ response.json()
        .then((data) => {
          setSalesData(data); // ดึงข้อมูล sales มาเก็บใน state
          // ฟังก์ชันแปลง "2024-01" เป็น "Jan"
          const formatMonth = (dateString) => {
            const date = new Date(dateString + "-01"); // แปลงเป็นวันที่
            return date.toLocaleString("en-US", { month: "short" }); // ได้ "Jan", "Feb" ฯลฯ
          };
          // แปลงข้อมูลเป็น chartData
          const formattedData = data.map((item) => ({
            name: formatMonth(item.month), // ใช้ชื่อเดือนจริง
            sales: item.total_revenue,
            visitors: item.total_sold,
            orders: item.total_orders,
          }));
          console.log("Log formattedData: ", formattedData);
          // แปลงข้อมูลเป็น chartData
          // const formattedData = data.map((item, index) => ({
          //   name: `Month ${index + 1}`, // หรือจะใช้เดือนจากข้อมูลจริงก็ได้
          //   sales: item.total_revenue,
          //   totalsold: item.total_sold,
          //   orders: item.total_orders,
          // }));
          setBusinessInsights(formattedData);
        })
        .catch((error) => console.error("Error fetching sales data:", error));
    }
  }, [sellerId]);

  const totalRevenue = salesData.reduce(
    (sum, item) => sum + parseInt(item.total_revenue, 10),
    0
  );

  // 5. จัดข้อมูลเป็น Array สำหรับ Pie Chart
  const aggregatedData = [{ name: "Total Revenue", value: totalRevenue }];

  console.log("aggregatedData: ", aggregatedData);

  useEffect(() => {
    const handleScroll = () => {
      // เมื่อมีการ scroll จะปรับค่าตำแหน่ง
      setImagePosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleSaveChanges = async () => {
  //   if (!currentProduct) return;

  //   try {
  //     const updatedProduct = {
  //       productId: currentProduct.product_id,
  //       price: updatedPrice,
  //       description: updatedDescription,
  //       qty: updatedQty,
  //     };
      
  //     console.log("updatedProduct: ",updatedProduct);

  //     const response = await axios.put(
  //       `${BASE_URL}/api/update-product`,
  //       updatedProduct
  //     );

  //     if (response.status === 200) {
  //       // Update the local product list to reflect the changes
  //       setProducts((prevProducts) =>
  //         prevProducts.map((product) =>
  //           product.product_id === currentProduct.product_id
  //             ? {
  //                 ...product,
  //                 price: updatedPrice,
  //                 description: updatedDescription,
  //                 qty: updatedQty,
  //               }
  //             : product
  //         )
  //       );

  //        // แสดงการแจ้งเตือนเมื่อสินค้าถูกลบสำเร็จ
  //        Swal.fire({
  //         icon: 'success',
  //         title: 'สำเร็จ!',
  //         text: 'สินค้าถูกแก้ไขเรียบร้อยแล้ว',
  //         confirmButtonText: 'ตกลง',
  //         confirmButtonColor: '#007bff', // สีฟ้า
  //       });
  //     } else {
  //       console.error("Failed to update product");

  //       // แสดงการแจ้งเตือนเมื่อเกิดข้อผิดพลาดในการลบ
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'ล้มเหลว',
  //         text: 'ไม่สามารถแก้ไขสินค้าได้',
  //         confirmButtonText: 'ตกลง',
  //         confirmButtonColor: '#007bff', // สีฟ้า
  //       });
  //     }

  //       handleCloseModal(); // Close the modal
  //     } catch (error) {
  //       console.error("Error deleting product:", error);
      
  //       // แสดงการแจ้งเตือนเมื่อเกิดข้อผิดพลาด
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'เกิดข้อผิดพลาด',
  //         text: 'ไม่สามารถแก้ไขสินค้าได้',
  //         confirmButtonText: 'ตกลง',
  //       });
  //     }
  //   };


  const handleSaveChanges = async () => {
    if (!currentProduct) return;
  
    try {
      const formData = new FormData();
      formData.append("productId", currentProduct.product_id);
      formData.append("price", updatedPrice);
      formData.append("description", updatedDescription);
      formData.append("qty", updatedQty);
  
      if (updatedImage) {
        formData.append("image", updatedImage);
      }
  
      const response = await axios.put(`${BASE_URL}/api/update-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        // อัปเดตข้อมูลสินค้าใน state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.product_id === currentProduct.product_id
              ? {
                  ...product,
                  price: updatedPrice,
                  description: updatedDescription,
                  qty: updatedQty,
                  image: updatedImage ? updatedImage.name : product.image, // อัปเดตรูปภาพ
                }
              : product
          )
        );
  
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "สินค้าถูกแก้ไขเรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#007bff",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ล้มเหลว",
          text: "ไม่สามารถแก้ไขสินค้าได้",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#007bff",
        });
      }
  
      handleCloseModal();
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขสินค้าได้",
        confirmButtonText: "ตกลง",
      });
    }
  };
  


  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };
  
  const handleDeleteConfirmation = async () => {
    if (!isDeleteConfirmed || !currentProduct) return;

    console.log("currentProduct.product_id: ",currentProduct.product_id);

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/delete-product/${currentProduct.product_id}`
      );

      console.log("response api/delete-product: ",response);

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.product_id !== currentProduct.product_id)
        );
        setIsDeleteModalOpen(false);

        // แสดงการแจ้งเตือนเมื่อสินค้าถูกลบสำเร็จ
          Swal.fire({
            icon: 'success',
            title: 'สำเร็จ!',
            text: 'สินค้าถูกลบเรียบร้อยแล้ว',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#007bff', // สีฟ้า
          });
        } else {
          console.error("Failed to delete product");

          // แสดงการแจ้งเตือนเมื่อเกิดข้อผิดพลาดในการลบ
          Swal.fire({
            icon: 'error',
            title: 'ล้มเหลว',
            text: 'ไม่สามารถลบสินค้าได้',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#007bff', // สีฟ้า
          });
        }

  } catch (error) {
    console.error("Error deleting product:", error);

    // แสดงการแจ้งเตือนเมื่อเกิดข้อผิดพลาด
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'ไม่สามารถลบสินค้าได้',
      confirmButtonText: 'ตกลง',
    });
  }
};


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
                      <td className="w-[150px] py-2 flex flex-col items-start space-y-2">
                        {" "}
                        {/* max-w-[150px]  */}
                        <img
                          src={`/images/product/${product.image}`}
                          alt={product.name}
                          className="w-20 h-20 cursor-pointer object-cover rounded"
                          onClick={() => {
                            console.log(
                              "Image clicked:",
                              `/images/product/${product.image}`
                            );
                            setSelectedImage(
                              `/images/product/${product.image}`
                            );
                          }}
                        />
                        <span className="text-gray-500 text-start">
                          {product.name.length > 35
                            ? product.name.slice(0, 35) + "..."
                            : product.name}
                        </span>
                      </td>
                      <td className="py-2 text-center">
                        {parseFloat(product.total_revenue)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>{" "}
                      {/* สมมติยอดขายยังไม่มี */}
                      <td className="py-2 text-center">
                        {parseFloat(product.price)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        บาท
                      </td>
                      <td className="py-2 text-center">{product.qty} ชิ้น</td>
                      <td className="py-2 text-gray-500 ">
                        {product.description.length > 50
                          ? product.description.slice(0, 50) + "..."
                          : product.description}
                      </td>
                      <td className="py-2">
                        <Button
                          onClick={() => handleEditClick(product)}
                          className="bg-yellow-500 text-white"
                        >
                          แก้ไข
                        </Button>
                        <Button className="bg-red-500 text-white ml-2"
                          onClick={() => handleDeleteClick(product)}
                        >
                          ลบ
                        </Button>
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
            <div
              className="imagescroll relative bg-white p-4 rounded-lg mt-10 " //transition-transform duration-300 ease-out hover:scale-105
              // style={{ top: `${scrollY + 100}px` }} // เลื่อนตาม Scroll
              // style={{ transform: ImagePosition }}
              style={{
                transform: `translateY(${imagePosition}px)`,
                marginTop: "250px",
              }} // เลื่อนตาม scrollY
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

       {/* Delete Confirmation Modal */}
       {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto">
          <div className="imagescroll bg-white p-6 rounded-lg max-w-md w-full"
            style={{
              transform: `translateY(${imagePosition}px)`,
              marginTop: "250px",
            }} // เลื่อนตาม scrollY
          >
            <h3 className="text-lg font-bold mb-4">ยืนยันการลบสินค้า</h3>
            <div className="mb-4">
              <input
                type="checkbox"
                checked={isDeleteConfirmed}
                onChange={() => setIsDeleteConfirmed(!isDeleteConfirmed)}
              />
              <label className="ml-2 text-sm">ฉันยืนยันว่าต้องการลบสินค้า</label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-red-500 text-white"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                ยกเลิก
              </Button>
              <Button
                className="bg-gray-300 text-black"
                onClick={handleDeleteConfirmation}
                disabled={!isDeleteConfirmed}
              >
                ตกลง
              </Button>
            </div>
          </div>
        </div>
      )}

    {/* Existing Modals for Edit Product */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto">
          <div
            className="imagescroll bg-white p-6 rounded-lg max-w-lg w-full"
            style={{
              transform: `translateY(${imagePosition}px)`,
              marginTop: "25px",
            }} // เลื่อนตาม scrollY
          >
            <button
              className="absolute top-2 right-2 text-black text-xl font-bold"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">แก้ไขรายละเอียดสินค้า</h2>

            {/* Product Image */}
            <div className="flex justify-center mb-4">
              {console.log("Current Product Image: ", currentProduct.image)}
              <img
                src={`/images/product/${currentProduct.image}`}
                alt={currentProduct.name}
                className="max-w-[200px] max-h-[200px] object-contain"
              />
            </div>

            {/* Product Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">อัปโหลดรูปภาพใหม่</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUpdatedImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">ชื่อสินค้า</label>
              <input
                type="text"
                value={currentProduct.name}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Edit Price */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">ราคา</label>
              <input
                type="number"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Edit Description */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">
                รายละเอียดสินค้า
              </label>
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Edit Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">
                จำนวนสินค้าในคลัง
              </label>
              <input
                type="number"
                value={updatedQty}
                onChange={(e) => setUpdatedQty(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-gray-300 text-black"
                onClick={handleCloseModal}
              >
                ยกเลิก
              </Button>
              <Button
                className="bg-blue-500 text-white"
                onClick={handleSaveChanges}
              >
                บันทึก
              </Button>
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
