import React,{useState,useEffect} from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
// import {
//   // deleteItem,
//   drecreaseQuantity,
//   increaseQuantity,
// } from "../../redux/orebiSlice";
import PropTypes from "prop-types";
import axios from "axios";
//import { deleteItem } from "../../redux/cartActions";
import { deleteItem, increaseQuantity, decreaseQuantity } from "../../redux/cartActions";

const ItemCard = ({ item, handleSelectItem, isSelected }) => { //userId , handleSelectItem //isSelected
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

        //const [item, setshowProducts] = useState([]);
        const [cartItems, setCartItems] = useState([]);
       
        //const [cartItemsCheck, setCartItemsCheck] = useState([]); //ใช้
       
        const [images, setImages] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        // ใช้ useState เพื่อเก็บค่า quantity ของแต่ละสินค้า
        const [quantity, setQuantity] = useState(item.quantity);

        const [isMobile, setIsMobile] = useState(window.innerWidth < 350);

        // if (loading) return <p>Loading...</p>;
        // if (error) return <p>{error}</p>;
        // if (images.length === 0) return <p>No images found.</p>;



        const handleCheckboxChange = async (itemId, isSelected) => {
          try {
            const response = await axios.put(`${BASE_URL}/api/cart/update-selection`, {
              userId,
              product_id: itemId,
              is_selected: isSelected ? 1 : 0,
            });
        
            console.log('Updated selection successfully:', response.data);
          } catch (error) {
            console.error('Error updating selection:', error.response?.data || error.message);
          }
        };


        useEffect(() => {
          // ใช้ axios เพื่อดึงข้อมูลBASE_URL
          axios.get(`${BASE_URL}/api/show-product-images`, {//https://cc07-49-49-230-168.ngrok-free.app
            //method: 'get',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              //'ngrok-skip-browser-warning': '69420',//true
              //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
          })
          .then(response => {
            setImages(response.data); // Assuming response.data is an array of image objects
            console.log('Fetched images (axios):', response.data);
            setLoading(false);
          })
          .catch(err => {
            console.error('Failed to fetch images (axios):', err);
            setError('Failed to load images.');
            setLoading(false);
          });
        }, [BASE_URL]); // effect ที่ใช้ axios http://49.49.230.180:5000 ${BASE_URL}

        useEffect(() => {
          const fetchImages = async () => {
            try {
              const response = await fetch(`${BASE_URL}/api/cart-product`, { //https://cc07-49-49-230-168.ngrok-free.app/api/categories-images
                //method: 'GET',
                method: 'GET',
                headers: {
                  'Cache-Control': 'no-cache',
                  'ngrok-skip-browser-warning': 'true',
                  //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
              });
              
              console.log('Response Data (fetch):', response);
              
              // ตรวจสอบสถานะการตอบสนอง
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
        
              const data = await response.json();
              console.log('Fetched data (fetch):', data); // ตรวจสอบข้อมูลที่ได้รับ
              //setCurrentImages(data); // อัปเดต state ด้วยข้อมูลที่ดึงมา
            } catch (error) {
              console.error('Error fetching images (fetch):', error);
            }
          };
        
          fetchImages();
        }, [BASE_URL]); // effect ที่ใช้ fetch

        //////
        const userId = localStorage.getItem('user_id'); // หรือดึงจาก Context
        // ฟังก์ชันในการลบสินค้า
          const handleRemoveItem = async (productId) => {
            console.log("Product ID:", productId); // เพิ่มก่อนเรียก axios
            if (!productId) {
              console.error("Product ID is missing");
              return;
          }
            try {
              const response = await axios.delete(`${BASE_URL}/api/cart/delete`, {
                data: { userId, productId }, // ส่ง userId และ productId ไปใน request body
                headers: {
                  'Cache-Control': 'no-cache',// ห้ามแคช
                }
              });
              console.log("data: ", response.data);

              if (response.status === 200) {
                //addToCart({ userId, productId: id, quantity: 1 });
                dispatch(deleteItem({ _id: item._id, id: item.id }));//userId, productId: id,
                //toast.success("Product added to the cart");
                console.log('Item remove successfully',deleteItem);
              }
              console.log(response.data.message); // "Item removed from cart"
              // ลบสินค้าจาก state
              setCartItems(cartItems.filter(item => item.product_id !== productId));
            } catch (error) {
              console.error("Failed to remove item from cart:", error);
            }
          };

          //const quantity = item.quantity;
          //const product_id = localStorage.getItem('product_id'); // หรือดึงจาก Context
          const handleincreaseQuantity = async () => { //cartId , userId
            // ใช้ item.quantity แทนที่ quantity
            //const quantity = item.quantity;
            const newQuantity = quantity + 1;  // เพิ่มค่า quantity ขึ้น 1
            setQuantity(newQuantity);  // อัปเดต quantity ใน state ของ React

            // บันทึกลง localStorage
            // const updatedCart = JSON.parse(localStorage.getItem("cart")) || {};
            // updatedCart[item.id] = { ...item, quantity: newQuantity };
            // localStorage.setItem("cart", JSON.stringify(updatedCart));

            console.log("quantity: ", newQuantity); // เพิ่มก่อนเรียก axios

            if (newQuantity < 1) {
              console.error("Quantity must be greater than 0");
              return;
            }

            //const newquantity = quantity + 1;

            try {
              const response = await axios.put(`${BASE_URL}/api/cart/update`, {
                // data:{ cartId, quantity: newQuantity},
                userId, // cartId
                product_id: item.id, // ส่งค่า productId
                quantity: newQuantity,
                // product_id,
                headers: {
                  'Cache-Control': 'no-cache',// ห้ามแคช
                }
              });

              console.log("handleUpdateQuantity: ",response.data);

              if (response.status === 200){

                dispatch(increaseQuantity({ _id: item._id, id: item.id }))
                console.log('Item increase successfully',increaseQuantity);

              }

              console.log(response.data.message);
              // อัปเดต UI หรือรีเฟรชข้อมูล
            } catch (error) {
              console.error('Error updating cart:', error.response?.data || error.message);
            }
          };

          const handledecreaseQuantity = async () => {//cartId
            // ใช้ item.quantity แทนที่ quantity
            //const quantity = item.quantity;
            const newQuantity = quantity - 1;  // ลดค่า quantity ทีละ 1

            if (newQuantity < 1) {
              console.error("Quantity must be greater than 0");
              return;
            }
            setQuantity(newQuantity);  // อัปเดต quantity ใน state ของ React
            console.log("quantity after decrease: ", newQuantity); // แสดงค่าที่ลดแล้ว
            //console.log("quantity: ", newQuantity); // ลดค่าก่อนเรียก axios
            //const newquantity = quantity + 1;

            try {
              const token = localStorage.getItem('authToken'); // หรือดึงจาก Context
              const response = await axios.put(`${BASE_URL}/api/cart/update`, {
                // data:{ cartId, quantity: newQuantity},
                userId,
                product_id: item.id, // ส่งค่า productId
                quantity: newQuantity,
                headers: {
                  'Cache-Control': 'no-cache',// ห้ามแคช
                  Authorization: `Bearer ${token}`,
                }
              });

              console.log("decreaseQuantity: ",response);

              if (response.status === 200){

                dispatch(decreaseQuantity({ _id: item._id, id: item.id }))
                console.log('Item decrease successfully',decreaseQuantity);

              }

              console.log(response.data.message);
              // อัปเดต UI หรือรีเฟรชข้อมูล
            } catch (error) {
              console.error('Error updating cart:', error.response?.data || error.message);
            }
          };

          useEffect(() => {
            const handleResize = () => {
              const clientWidth = document.documentElement.clientWidth;
              console.log("Viewport Width (Client):", clientWidth);
              setIsMobile(clientWidth <= 350); //>
            };
          
            handleResize();
          
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
          }, []);
          
  

        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        if (images.length === 0) return <p>No images found.</p>;

        if (cartItems.length) return <p>No cart items found.</p>;
        //if (cartItemsCheck.length) return <p>No cart items found.</p>; // ใช้

        //mdl:col-span-2 , ${isMobile ?  "left-0":"right-0" }`} , sm:truncate max-w-[2000px]

        return (
          <div className="w-full grid grid-cols-5 mb-4 border py-2">
            <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
              {/* Move the checkbox before the ImCross icon */}
              {/* <input
                type="checkbox"
                checked={item.cartItemsCheck}
                // onChange={() => handleSelectItem(item.id)}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                className="form-checkbox mr-2 flex-shrink-0"
              /> */}
        
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  console.log("Item: ",); 
                  handleSelectItem(item.id);
                  handleCheckboxChange(item.id, e.target.checked); // อัปเดต database
                }}
                className="form-checkbox"
              />


              <ImCross
                onClick={() => {
                  console.log("Item:", item);
                  handleRemoveItem(item.id);
                }}
                className={`"text-primeColor hover:text-red-500 duration-300 cursor-pointer w-[16px] h-[16px] flex-shrink-0 ${isMobile ? "w-[10px] h-[10px]" : "" }`}
              />
        
              <img
                className="w-32 h-32"
                src={`${BASE_URL}/images/product/${item.image}`}
                alt="productImage"
              />
        
              <h1
                className={`font-titleFont font-semibold ${isMobile ? "truncate max-w-[2000px]" : "" }`}
              >
                {item.name}
              </h1>
              <h1 className="font-titleFont font-semibold">{item.productName}</h1>
            </div>
            <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
              {/* <div className="flex w-1/3 items-center text-lg font-semibold">
                {/* ${item.price} 
                ${item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div> */}
              <div className="flex w-1/3 items-center text-lg font-semibold">
                {item?.price !== undefined
                  ? `$${item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  : "Price not available"}
              </div>
              <div className="w-1/3 flex items-center gap-6 text-lg">
                <span
                  onClick={() => handledecreaseQuantity(item.id)}
                  className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                >
                  -
                </span>
                <p>
                  {console.log("Items Quantity:", item)}
                  {quantity}
                </p>
                <span
                  onClick={() => handleincreaseQuantity(item.id)}
                  className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                >
                  +
                </span>
              </div>
              <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
                {/* <p>${item.quantity * item.price}</p> */}
                <p>${(item.quantity * item.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
            </div>
          </div>
        );        
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    product_id: PropTypes.string.isRequired, // Add this
    cartItemsCheck: PropTypes.bool.isRequired,
    is_selected: PropTypes.bool.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired, // Add userId validation
  handleSelectItem: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default ItemCard;

/////////// Comment ///////////
     // useEffect(() => {
        //   // ฟังก์ชันสำหรับดึงข้อมูลตะกร้า
        //   const fetchCart = async () => {
        //     try {
        //       const response = await axios.get(`${BASE_URL}/api/cart`, { params: { userId } });//get
        //       //const response = await fetch(`${BASE_URL}/api/cart`, { method: 'GET', params: { userId } });//get
    
        //       console.log("response fetchCart: ", response);
    
        //       //const data = await response.json();
        //       //console.log('Fetched data (fetch):', data); // ตรวจสอบข้อมูลที่ได้รับ
              
        //       setCartItems(response.data); // อัปเดตข้อมูลใน state
        //       console.log("Fetched cart:", response.data);
        //       // ตรวจสอบว่า data หรือ cart ไม่เป็น undefined ก่อนการใช้งาน
        //         // if (data && Array.isArray(data)) {
        //         //   setCart(data); // อัปเดตข้อมูลตะกร้า
        //         // } else {
        //         //   setCart([]); // ถ้าข้อมูลไม่ถูกต้องให้ใช้ array ว่าง
        //         // }
        //     } catch (error) {
        //       console.error("Failed to fetch cart:", error);
        //     }
        //   };
    
        //   // ดึงข้อมูลทุกๆ 5 วินาที
        //   const interval = setInterval(fetchCart, 5000);
        //   console.log('interval: ',interval);
    
        //   fetchCart();
    
        //   return () => clearInterval(interval);
        
        //   // // ดึงข้อมูลครั้งแรก
        //   // if (userId) {
        //   //   fetchCart();
        //   // }
        
        // }, [userId, BASE_URL]);
        


        //

        // useEffect(() => {
        //   const fetchCartItems = async () => {
        //     try {
        //       const response = await axios.get(`${BASE_URL}/api/cart/${userId}`);
        //       console.log(response);
        //       if (response.status === 200) {
        //         setCartItems(response.data); // อัปเดต state cartItems
        //       }
        //     } catch (error) {
        //       console.error("Failed to fetch cart items:", error);
        //     }
        //   };
        //   fetchCartItems();
        // }, [BASE_URL, userId]);
        

        
          // const handleCheckboxChange = async (productId, isChecked) => {
          //   try {
          //     const token = localStorage.getItem('authToken'); // หรือดึงจาก Context
          //     await axios.put(`${BASE_URL}/api/cart-items/${productId}`, { is_selected: isChecked ? 1 : 0 },
          //       {
          //       headers: {
          //         'Cache-Control': 'no-cache',// ห้ามแคช
          //         Authorization: `Bearer ${token}`,
          //       }
          //   });
          //     console.log(`Product ${productId} updated successfully`);
          //     console.log(`Product ${productId} updated successfully status: ${isChecked}`);

          //     setCartItemsCheck((prevItems) =>
          //       prevItems.map((item) =>
          //         item.id === productId ? { ...item, isSelected: isChecked } : item
          //       )
          //     );

          //   } catch (error) {
          //     console.error('Failed to update cart item selection:', error);
          //   }
          // };


//////////// Test ใช้ได้เลย////////////

// return (
//   <div className="w-full grid grid-cols-5 mb-4 border py-2">
//     <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
//       {/* Move the checkbox before the ImCross icon */}
//       <input
//         type="checkbox"
//         checked={isSelected}
//         onChange={() => handleSelectItem(item.id)}
//         className="form-checkbox mr-2 flex-shrink-0"
//       />

//       <ImCross
//         onClick={() => {
//           console.log("Item:", item);
//           handleRemoveItem(item.id);
//         }}
//         className="text-primeColor hover:text-red-500 duration-300 cursor-pointer w-[16px] h-[16px] flex-shrink-0"
//       />

//       <img
//         className="w-32 h-32"
//         src={`${BASE_URL}/images/product/${item.image}`}
//         alt="productImage"
//       />

//       <h1
//         className={`font-titleFont font-semibold ${
//           isMobile ? "truncate max-w-[2000px]" : ""
//         }`}
//       >
//         {item.name}
//       </h1>
//       <h1 className="font-titleFont font-semibold">{item.productName}</h1>
//     </div>
//     <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
//       <div className="flex w-1/3 items-center text-lg font-semibold">
//         ${item.price}
//       </div>
//       <div className="w-1/3 flex items-center gap-6 text-lg">
//         <span
//           onClick={() => handledecreaseQuantity(item.id)}
//           className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//         >
//           -
//         </span>
//         <p>
//           {console.log("Items Quantity:", item)}
//           {quantity}
//         </p>
//         <span
//           onClick={() => handleincreaseQuantity(item.id)}
//           className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//         >
//           +
//         </span>
//       </div>
//       <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
//         <p>${item.quantity * item.price}</p>
//       </div>
//     </div>
//   </div>
// );




//////////// ตัวเก่าก่อนใช้ตัวใหม่ ครั้งที่ 1 06/01/2568 /////////////
// return (
//   <div className="w-full grid grid-cols-5 mb-4 border py-2">
//     <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4"> 
//       <ImCross
       
//         onClick={() => {console.log("Item:", item); handleRemoveItem(item.id);}}//item._id  , dispatch(clearCart({ _id: item._id, id: item.id }))
//         className="text-primeColor hover:text-red-500 duration-300 cursor-pointer w-[16px] h-[16px] flex-shrink-0"
//       />
//       {/* <img className="w-32 h-32" src={item.image} alt="productImage" /> */}
//       <img className="w-32 h-32" src={`${BASE_URL}/images/product/${item.image}`} />

//       {/* truncate max-w-[2000px] */}
//       <h1 className={`font-titleFont font-semibold ${isMobile ?  "truncate max-w-[2000px]":"" }`}>{item.name}</h1>
//       <h1 className="font-titleFont font-semibold">{item.productName}</h1>
//        {/* <h1 img={`${BASE_URL}/images/bestsale/${bestSeller.image2}`} ></h1>{ /* // ใช้ฟิลด์ image2 จากฐานข้อมูล http://localhost:5000 */} 
//     </div>
//     <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
//       <div className="flex w-1/3 items-center text-lg font-semibold">
//         ${item.price}
//       </div>
//       <div className="w-1/3 flex items-center gap-6 text-lg">
//         <span
//           onClick={() =>  handledecreaseQuantity(item.id) }//{ _id: item._id ,drecreaseQuantity} , dispatch(decreaseQuantity({ _id: item._id, id: item.id }))
//           className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//         >
//           -
//         </span>
//         <p>{console.log("Items Quantity:",item)}{quantity}</p> {/*item.*/}
//         <span
//           onClick={() =>  handleincreaseQuantity(item.id)}//{ _id: item._id } _id: item._id, id: item.id, dispatch(increaseQuantity({ _id: item._id, id: item.id }))
//           className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//         >
//           +
//         </span>
//       </div>
//       <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
//         <p>${item.quantity * item.price}</p>
//       </div>

//       <input
//         type="checkbox"
//         checked={isSelected}
//         onChange={() => handleSelectItem(item.id)}
//         className="form-checkbox mr-2"
//     />

//     </div>
//   </div>
// );


///////////////////////////
// export const fetchCartItems = async (userId, BASE_URL) => {
//   try {
//       const response = await axios.get(`${BASE_URL}/api/cart/${userId}`);
//       if (response.status === 200) {
//           return response.data; // คืนค่าข้อมูล cart items
//       }
//   } catch (error) {
//       console.error("Failed to fetch cart items:", error);
//       throw error;
//   }
// };


// import React from "react";
// import { ImCross } from "react-icons/im";
// import { useDispatch } from "react-redux";
// import {
//   deleteItem,
//   drecreaseQuantity,
//   increaseQuantity,
// } from "../../redux/orebiSlice";
// import PropTypes from "prop-types";

// const ItemCard = ({ item }) => {
//   const dispatch = useDispatch();
//   return (
//     <div className="w-full grid grid-cols-5 mb-4 border py-2">
//       <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
//         <ImCross
//           onClick={() => dispatch(deleteItem({ _id: item._id, id: item.id }))}//item._id
//           className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
//         />
//         <img className="w-32 h-32" src={item.image} alt="productImage" />
        
//         <h1 className="font-titleFont font-semibold">{item.name}</h1>
//         <h1 className="font-titleFont font-semibold">{item.productName}</h1>
      
//       </div>
//       <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
//         <div className="flex w-1/3 items-center text-lg font-semibold">
//           ${item.price}
//         </div>
//         <div className="w-1/3 flex items-center gap-6 text-lg">
//           <span
//             onClick={() => dispatch(drecreaseQuantity({ _id: item._id, id: item.id }))}//{ _id: item._id }
//             className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//           >
//             -
//           </span>
//           <p>{item.quantity}</p>
//           <span
//             onClick={() => dispatch(increaseQuantity({ _id: item._id, id: item.id }))}//{ _id: item._id }
//             className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
//           >
//             +
//           </span>
//         </div>
//         <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
//           <p>${item.quantity * item.price}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// ItemCard.propTypes = {
//   item: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     productName: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     quantity: PropTypes.number.isRequired,
//   }).isRequired
// };

// export default ItemCard;
