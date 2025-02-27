import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_BASE_URL;


const SellerRegister = () => {

  const navigate = useNavigate();

  const [isSeller, setIsSeller] = useState(false); // สถานะการเป็น seller
  const [errors, setErrors] = useState({});

  console.log("isSeller",isSeller);

  const [sellerData, setSellerData] = useState({
    shop_name: "",
    phone_number: "",
    pickup_address: "",
    email: "",
    thai_national_id: "",
    id_card_copy: null,
  });
  
  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    setSellerData({ ...sellerData, id_card_copy: e.target.files[0] });
  };

  const [step, setStep] = useState(1);

  // const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));

  const nextStep = () => {
    if (validateForm()) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


  // const prevStep = () => {
  //   if (validateForm()) {
  //     setStep((prev) => Math.max(prev - 1, 1));
  //   }
  // };

  const validateForm = () => {

    let newErrors = {};

    if (step === 1) {
      if (!sellerData.shop_name.trim()) {
        newErrors.shop_name = "กรุณากรอกชื่อร้านค้า";
      }
      if (!sellerData.email.trim()) {
        newErrors.email = "กรุณากรอกEmail";
      }
      if (!sellerData.pickup_address.trim()) {
        newErrors.pickup_address = "กรุณากรอกที่อยู่ในการเข้ารับสินค้า";
      }
      if (!sellerData.phone_number.trim()) {
        newErrors.phone_number = "กรุณากรอกหมายเลขเบอร์โทรศัพท์";
      }
    }
  
    if (step === 2) {
      if (!sellerData.thai_national_id.trim()) {
        newErrors.thai_national_id = "กรุณากรอกเลขบัตรประจำตัวประชาชน";
      }
      if (!sellerData.id_card_copy || sellerData.id_card_copy.length === 0) {
        newErrors.id_card_copy = "กรุณาแนบรูปภาพสำเนาบัตรประจำตัวประชาชน";
      }
    }

    setErrors(newErrors);
  
  

    // const requiredFields = ["ชื่อร้านค้า", "ที่อยู่ในการเข้ารับสินค้า", "email", "หมายเลขเบอร์โทรศัพท์", "เลขบัตรประจำตัวประชาชน"];
    // for (let field of requiredFields) {
    //   if (!sellerData[field] || sellerData[field].trim() === "" || /^\s/.test(sellerData[field])) {
    //     Swal.fire("Error", `กรุณากรอก ${field} ให้ครบถ้วนและไม่มีช่องว่างข้างหน้า`, "error");
    //     return false;
    //   }
    // }
    // if (!sellerData.id_card_copy) {
    //   Swal.fire("Error", "กรุณาอัปโหลดสำเนาบัตรประจำตัวประชาชน", "error");
    //   return false;
    // }
    // // return true;

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // เช็คสถานะผู้ใช้เมื่อ component โหลด
    const userId = localStorage.getItem('user_id');
    if (userId) { // && !isSeller
      axios.get(`${BASE_URL}/api/check-status-user_seller/${userId}`,{
        headers: {
          'Cache-Control': 'no-cache',// ห้ามแคช
        }
      })  // ทำการเรียก API เพื่อตรวจสอบสถานะ seller
        .then(response => {
          if (response.data.isSeller) {
            setIsSeller(true); // ถ้า user เป็น seller แล้ว
          }
          console.log("response check-status-user_seller: ",response);
        })
        .catch(error => {
          console.error("Error checking user status:", error);
        });
    }
  }, []); //isSeller

  useEffect (() => {
    if (isSeller) {
      // ให้แสดงการแจ้งเตือนด้วย SweetAlert
      Swal.fire({
        title: 'ไม่พบหน้าที่คุณต้องการ',
        text: 'กำลังพาคุณไปยังหน้าหลัก...',
        icon: 'error',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#007bff', // เปลี่ยนเป็นสีฟ้า
        // customClass: {
        //   popup: 'fullscreen-alert' // ใช้ class ที่กำหนดเอง
        // }
    }).then(() => {
        // หลังจากผู้ใช้คลิกตกลง ให้ทำการย้ายไปหน้าหลัก
        navigate('/seller/mdc');
    });
        // ถ้าเป็น seller แล้ว ให้ redirect ไปหน้าที่ต้องการ เช่น หน้าแดชบอร์ด
        // return navigate("/seller/mdc");
    } 
  }, [isSeller,navigate]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    const userId = localStorage.getItem('user_id');
    console.log("Check userId: ",userId);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("shop_name", sellerData.shop_name);
    formData.append("phone_number", sellerData.phone_number);
    formData.append("pickup_address", sellerData.pickup_address);
    formData.append("email", sellerData.email);
    formData.append("thai_national_id", sellerData.thai_national_id);
    formData.append("id_card_copy", sellerData.id_card_copy);

    // Log ข้อมูลที่ส่งไปยัง Backend
    console.log("FormData ที่ส่งไปยัง Backend:", {
      userId,
      shop_name: sellerData.shop_name,
      phone_number: sellerData.phone_number,
      pickup_address: sellerData.pickup_address,
      email: sellerData.email,
      thai_national_id: sellerData.thai_national_id,
      id_card_copy: sellerData.id_card_copy ? sellerData.id_card_copy.name : 'No file', // หากไม่มีไฟล์จะแสดง 'No file'
    });
  
    try {
      const response = await axios.post(`${BASE_URL}/api/sellers/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        Swal.fire("Success", "Registration successful!", "success");
        // navigate("/seller/mdc");
        navigate('/seller/mdc');
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };
  

  return (
    <div className="flex flex-col px-4 py-4 h-[70vh] justify-self-center w-screen items-center xs:w-[100vh] smls:w-[100vh] lg:w-[115vh] justify-center bg-gradient-to-b  "> {/* min-h-screen from-blue-800 to-pink-500 */}
    {/* <div className="flex flex-col px-4 py-4 h-[70vh] items-center smls:w-[100vh] lg:w-[115vh] justify-center bg-gradient-to-b "> min-h-screen from-blue-800 to-pink-500 */}
    {!isSeller && (
      <div className="bg-white p-10 rounded-lg shadow-lg w-[35%] h-[680px]">
      <div className="boxcenter justify-center items-center">
        <h2 className="text-2xl font-bold text-center mb-6">Sellers Form</h2>
        
        {/* Progress Bar */}
        <div className="flex justify-between mb-6">
          {["ข้อมูลร้านค้า", "ยืนยันตัวตน", "ข้อมูลเพิ่มเติม", "ส่งแบบฟอร์ม"].map((label, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <p className="text-sm font-medium">{label}</p>
              <div
                className={`h-6 w-6 flex items-center justify-center rounded-full border-2 ${
                  step > index ? "bg-pink-500 text-white" : "border-black"
                }`} 
              >
                {step > index ? "✔" : index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
              <div className="mb-4">
                <label className="block font-medium">ชื่อร้านค้า: </label>
                <input type="text" name="shop_name" onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.shop_name && <p className="text-red-500">{errors.shop_name}</p>}
              </div>
              <div className="mb-4">
                <label className="block font-medium">ที่อยู่ในการเข้ารับสินค้า: </label>
                <input type="text" name="pickup_address" onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.pickup_address && <p className="text-red-500">{errors.pickup_address}</p>}
              </div>
              <div className="mb-4">
                <label className="block font-medium">Email: </label>
                <input type="text" name="email" onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block font-medium">หมายเลขเบอร์โทรศัพท์: </label>
                <input type="text" name="phone_number" onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>}
              </div>
              <button onClick={nextStep} type="button" className="w-full bg-pink-500 text-white py-2 rounded">Next</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="mb-4">
                <label className="block font-medium">Thai National ID Card: </label>
                <label className="block text-red-500 text-sm font-medium">เลขบัตรประจำตัวประชาชน</label>
                <input type="number" name="thai_national_id" onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.thai_national_id && <p className="text-red-500">{errors.thai_national_id}</p>}
              </div>
              <div className="mb-4">
                <label className="block font-medium">สำเนาบัตรประจำตัวประชาชน:</label>
                <label className="block text-red-500 text-sm font-medium">แนบรูปภาพ</label>
                {/* <input type="number" className="w-full p-2 border rounded" /> */}
                <div className="mt-4"> {/* text-center */}
                  <input 
                    name="id_card_copy"
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    id="imageUpload" 
                    onChange={handleFileChange}
                  />
                  {errors.id_card_copy && <p className="text-red-500">{errors.id_card_copy}</p>}
                  <label htmlFor="imageUpload" className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700">
                    <i className="fas fa-upload"></i> Upload Slip
                  </label>
                </div>

              </div>
              <div className="flex justify-between mt-8">
                <button onClick={prevStep} type="button" className="bg-gray-300 px-4 py-2 rounded">Previous</button>
                <button onClick={nextStep} type="button" className="bg-pink-500 text-white px-4 py-2 rounded">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mt-6">
                  <h4 className="text-lg font-semibold">Seller Agreement</h4>
                  <p className="text-sm mt-2">
                    ข้อตกลงการใช้งานสำหรับผู้ขาย (Seller Agreement)
                  </p>
                  <div className="agreement-content max-h-80 overflow-y-auto">
                  <p className="text-sm mt-2">
                    ข้อตกลงนี้ (&quot;ข้อตกลง&quot;) เป็นข้อตกลงที่มีผลผูกพันระหว่างคุณ (&quot;ผู้ขาย&quot; หรือ &quot;คุณ&quot;) และเรา (&quot;บริษัท&quot; หรือ &quot;เรา&quot;) ซึ่งกำหนดข้อกำหนดในการเข้าร่วมเป็นผู้ขายในแพลตฟอร์มของเรา การใช้บริการและข้อกำหนดที่เกี่ยวข้องกับการซื้อขายสินค้าผ่านแพลตฟอร์ม
                  </p>

                  <h5 className="text-md font-semibold mt-4">1. การลงทะเบียนและการเปิดบัญชีผู้ขาย</h5>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>1.1 คุณต้องลงทะเบียนบัญชีผู้ขายในแพลตฟอร์มของเรา โดยกรอกข้อมูลที่จำเป็นทั้งหมดอย่างครบถ้วนและถูกต้อง</li>
                    <li>1.2 คุณต้องรับผิดชอบในการรักษาความปลอดภัยของข้อมูลบัญชีและรหัสผ่านของคุณเอง</li>
                    <li>1.3 การลงทะเบียนบัญชีผู้ขายต้องได้รับการอนุมัติจากบริษัท และบริษัทสามารถปฏิเสธการลงทะเบียนได้หากข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง</li>
                  </ul>

                  <h5 className="text-md font-semibold mt-4">2. การขายสินค้า</h5>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>2.1 ผู้ขายสามารถนำเสนอสินค้าที่ถูกต้องตามกฎหมายและไม่ได้ละเมิดสิทธิ์ทางปัญญาหรือทรัพย์สินของบุคคลที่สาม</li>
                    <li>2.2 ผู้ขายต้องให้ข้อมูลสินค้าอย่างครบถ้วน รวมถึงการบรรยายภาพถ่ายของสินค้า และข้อมูลที่เกี่ยวข้องอย่างชัดเจน</li>
                    <li>2.3 ผู้ขายต้องยืนยันราคาของสินค้า รวมถึงค่าจัดส่งและภาษีทั้งหมดให้ชัดเจนในเวลาที่ทำการขาย</li>
                  </ul>

                  <h5 className="text-md font-semibold mt-4">3. การชำระเงิน</h5>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>3.1 บริษัทจะทำการเก็บค่าคอมมิชชั่นตามอัตราที่กำหนดจากการขายสินค้าผ่านแพลตฟอร์ม</li>
                    <li>3.2 การชำระเงินสำหรับการขายจะได้รับการโอนเข้าบัญชีผู้ขายภายในเวลาที่กำหนดหลังจากที่ลูกค้าทำการชำระเงินสำเร็จ</li>
                    <li>3.3 ผู้ขายจะต้องรับผิดชอบในการจัดส่งสินค้าให้กับลูกค้าในเวลาที่กำหนด</li>
                  </ul>

                  <h5 className="text-md font-semibold mt-4">4. ข้อกำหนดการคืนสินค้าและการคืนเงิน</h5>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>4.1 บริษัทจะให้บริการคืนสินค้าและคืนเงินตามนโยบายที่กำหนดไว้ โดยผู้ขายต้องปฏิบัติตามข้อกำหนดเหล่านั้น</li>
                    <li>4.2 หากมีข้อพิพาทเกี่ยวกับสินค้า ผู้ขายต้องช่วยแก้ไขข้อพิพาทกับลูกค้าอย่างรวดเร็วและเต็มใจ</li>
                  </ul>

                  <h5 className="text-md font-semibold mt-4">5. การระงับหรือยกเลิกบัญชีผู้ขาย</h5>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>5.1 บริษัทมีสิทธิ์ในการระงับบัญชีผู้ขายหากพบว่ามีการละเมิดข้อกำหนดของข้อตกลงนี้ หรือมีการทำธุรกรรมที่ไม่สุจริต</li>
                    <li>5.2 ผู้ขายสามารถยกเลิกการเป็นผู้ขายได้ตลอดเวลาโดยการแจ้งให้บริษัททราบเป็นลายลักษณ์อักษร</li>
                  </ul>

                  <h5 className="text-md font-semibold mt-4">6. ความรับผิดชอบของผู้ขาย</h5>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>6.1 ผู้ขายต้องรับผิดชอบในการตรวจสอบและรับประกันคุณภาพของสินค้า รวมถึงการจัดการกับข้อร้องเรียนจากลูกค้า</li>
                    <li>6.2 ผู้ขายต้องปฏิบัติตามกฎหมายท้องถิ่นและนโยบายของแพลตฟอร์มเกี่ยวกับการขายสินค้า</li>
                  </ul>

                  <h5 className="text-md font-semibold mt-4">7. ข้อกำหนดการใช้งานทั่วไป</h5>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>7.1 ผู้ขายตกลงที่จะไม่ใช้แพลตฟอร์มนี้ในการกระทำที่ผิดกฎหมายหรือไม่เหมาะสม เช่น การหลอกลวงหรือการขโมยข้อมูล</li>
                    <li>7.2 บริษัทไม่รับผิดชอบต่อการกระทำที่เกิดขึ้นจากผู้ขายในระหว่างการทำธุรกรรมหรือการดำเนินการใด ๆ</li>
                  </ul>

                  <h5 className="text-md font-semibold mt-4">8. การยอมรับข้อตกลง</h5>
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    <li>8.1 เมื่อผู้ขายลงทะเบียนและเริ่มขายสินค้าในแพลตฟอร์มของเรา ถือว่าผู้ขายได้ยอมรับข้อตกลงนี้และข้อกำหนดทั้งหมดที่เกี่ยวข้อง</li>
                  </ul>
                  <p className="mt-4 text-sm">
                    หมายเหตุ: ข้อตกลงนี้สามารถเปลี่ยนแปลงได้ตามความเหมาะสม บริษัทจะแจ้งให้ผู้ขายทราบเกี่ยวกับการเปลี่ยนแปลงผ่านช่องทางที่ใช้ในการติดต่อ
                  </p>
                </div>
              <div className="flex justify-between mt-4">
                <button onClick={prevStep} type="button" className="bg-gray-300 px-4 py-2 rounded">Previous</button>
                <button onClick={nextStep} type="button" className="bg-pink-500 text-white px-4 py-2 rounded">Next</button>
              </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">ตรวจสอบและยืนยันการส่งแบบฟอร์ม</h3>
              <p className="mb-4 text-gray-600">กรุณาตรวจสอบข้อมูลของคุณให้ถูกต้องก่อนส่ง</p>

              {/* แสดงข้อมูลที่กรอกมาแล้ว */}
              <div className="mb-4 p-4 border rounded bg-gray-100">
                <p><strong>ชื่อร้านค้า:</strong> {sellerData.shop_name || "ยังไม่ระบุ"}</p>
                <p><strong>ที่อยู่รับสินค้า:</strong> {sellerData.pickup_address || "ยังไม่ระบุ"}</p>
                <p><strong>อีเมล:</strong> {sellerData.email || "ยังไม่ระบุ"}</p>
                <p><strong>เบอร์โทร:</strong> {sellerData.phone_number || "ยังไม่ระบุ"}</p>
                <p><strong>เลขบัตรประชาชน:</strong> {sellerData.thai_national_id || "ยังไม่ระบุ"}</p>
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} type="button" className="bg-gray-300 px-4 py-2 rounded">
                  Previous
                </button>
                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
                  Confirm & Submit
                </button>
              </div>
            </div>
          )}

        </form>

        </div>
      </div>
       )}
    </div>
  );
};

export default SellerRegister;


  // const [step, setStep] = useState(1);
  // const [sellerData, setSellerData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   shopName: "",
  //   shopDescription: "",
  // });

  
  // const handleChange = (e) => {
  //   setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  // };

  // const nextStep = () => setStep(step + 1);
  // const prevStep = () => setStep(step - 1);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // if (sellerData.password !== sellerData.confirmPassword) {
  //   //   Swal.fire("Error", "Passwords do not match!", "error");
  //   //   return;
  //   // }

  //   try {
  //     const response = await axios.post("/api/sellers/register", sellerData);
  //     if (response.data.success) {
  //       Swal.fire("Success", "Registration successful!", "success");
  //       navigate("/seller/login");
  //     } else {
  //       Swal.fire("Error", response.data.message, "error");
  //     }
  //   } catch (error) {
  //     Swal.fire("Error", "Something went wrong!", "error");
  //   }
  // };
