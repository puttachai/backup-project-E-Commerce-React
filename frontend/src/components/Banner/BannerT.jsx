
import { React } from 'react';//useRef
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import './BannerCss.css'; // ถ้าไฟล์อยู่ในโฟลเดอร์เดียวกัน

//import '..Banner/BannerCss.css';

// นำเข้ารูปภาพจากโฟลเดอร์ assets/images
import { salebannerImgOne, salebannerImgTwo, salebannerImgThree, rightbannerImgOne, rightbannerImgTwo } from "../../assets/images"; // bannerImgOne, bannerImgTwo, bannerImgThree, เพิ่มการนำเข้ารูปด้านขวา {/*rightImgOne, rightImgTwo*/}

//import { useRef } from 'react'; // ต้องการการ import useRef


const BannerT = () => {
  
  return (
     
          <div className="pt-12 px-4 w-full max-w-container min-w-[320px] mx-auto">
            <div className="flex justify-between h-full">
              
              <div className="relative overflow-hidden w-auto h-auto object-cover flex-2 mr-5">{/*h-auto*/}
                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  navigation={true}
                  pagination={{ clickable: true }}
                  className="mySwiper "//w-auto h-auto
                >
                  <SwiperSlide>
                    <img src={salebannerImgOne} alt="Banner 1" className="w-full h-auto object-cover" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={salebannerImgTwo} alt="Banner 2" className="w-full h-auto object-cover" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={salebannerImgThree} alt="Banner 3" className="w-full h-auto object-cover" />
                  </SwiperSlide>
                </Swiper>
              </div>

              
              <div className="flex flex-col h-auto w-full flex-2">
                <div className="flex flex-col gap-2 w-auto h-auto">
                  <img src={rightbannerImgOne} alt="Right Image 1" className="w-full h-full " />{/*h-[calc(50%-5px)]*/}
                  <img src={rightbannerImgTwo} alt="Right Image 2" className="w-full h-full " />
                </div>
              </div>
            </div>
          </div>


  );
};

export default BannerT;



// genarate Code Css to Tailwind

// {/* <div className = "pt-3 w-full max-w-container mx-auto px-4"  >{/*style={{ width: '100%', maxWidth: '1410px', height: 'auto', margin: '0 auto' }}  Container-banner*/}
// <div className="full-image" style={{ display: 'flex', justifyContent: 'space-between', height: 'auto' }}>  
//   {/* ลดขนาดความสูงลงจาก 100vh เป็น 70vh */}
//   <div className="banner-container relative overflow-hidden w-full h-full object-cover" style={{ flex: 2, marginRight: '20px', height: 'auto' }}>
//     <Swiper
//       modules={[Autoplay, Navigation, Pagination]}
//       spaceBetween={30}
//       centeredSlides={true}
//       autoplay={{
//         delay: 2500,
//         disableOnInteraction: false,
//       }}
//       navigation={true}
//       pagination={{ clickable: true }}
//       className="mySwiper"
//     >
//       <SwiperSlide>
//         <img src={salebannerImgOne} alt="Banner 1" className="w-full h-full object-cover" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={salebannerImgTwo} alt="Banner 2" className="w-full  h-full object-cover" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={salebannerImgThree} alt="Banner 3" className="w-full h-full object-cover" />{/*banner-image */}
//       </SwiperSlide>
//     </Swiper>
//   </div>

//   <div className="right-images-container" style={{ flex: 1, height: 'auto' }}>
//     <div className="right-image" style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: 'auto' }}>
//       <img src={rightbannerImgOne} alt="Right Image 1" className="right-image-item" />
//       <img src={rightbannerImgTwo} alt="Right Image 2" className="right-image-item" />
//     </div>
//   </div>
// </div>
// </div>   */}