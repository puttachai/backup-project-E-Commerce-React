// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   saleImgOne,
//   saleImgTwo,
//   saleImgThree,
// } from "../../../assets/images/index";
// import Image from "../../designLayouts/Image";
// import ShopNow from "../../designLayouts/buttons/ShopNow";

// const Sale = () => {
//   return (
//     <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">

//       <div className="bg-[#f3f3f3] w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center text-black">
//       {/*coluamsSale1*/}
//       {/*imageSale1*/}
//         <div className="aspect-w-4 aspect-h-3 w-full mb-4">
//           <Image className="h-full w-full object-cover" imgSrc={saleImgOne} />
//         </div>

//         <div className="text-left h-140 md:h-200 lg:h-260 w-full mx-4 ">
//           <div className="mx-8">
//             <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
//               Imprimante sales
//             </h2>
//             <p className="text-lg md:text-xl lg:text-2xl mb-6">
//               Up to{" "}
//               <span className="text-4xl md:text-5xl lg:text-5xl font-bold">
//                 30%
//               </span>{" "}
//               sales for all impriamnte{" "}
//             </p>
//             <div className=" mb-8">
//               <ShopNow />
//             </div>
//           </div>
//         </div>

//       </div>

//         {/*coluamsSale2*/}

//       <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
//         {/*imageSale2*/}
//         <div className="h-1/2 w-full">
//           <Link to="/shop">
//             <Image className="h-full w-full object-cover" imgSrc={saleImgTwo} />
//           </Link>
//         </div>
//         {/*imageSale3*/}
//         <div className="h-1/2 w-full">
//           <Link to="/shop">
//             <Image
//               className="h-full w-full object-cover"
//               imgSrc={saleImgThree}
//             />
//           </Link>
//         </div>
//       </div>

//       {/*EndSale*/}

//     </div>
//   );
// };

// export default Sale;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Image from "../../designLayouts/Image";
import ShopNow from "../../designLayouts/buttons/ShopNow";

const Sale = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [currentImages, setCurrentImages] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(8);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch images using axios
  useEffect(() => {
    axios.get(`${BASE_URL}/api/sale-images`, {
      headers: {
        'Cache-Control': 'no-cache',
        'ngrok-skip-browser-warning': 'true',
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    })
    .then(response => {
      setImages(response.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch images (axios):', err);
      setError('Failed to load images.');
      setLoading(false);
    });
  }, [BASE_URL]);

  // Fetch images using fetch
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sale-images`, {
          //method: 'GET',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'ngrok-skip-browser-warning': 'true',
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        //const data = await response.json();
        //setCurrentImages(data);
      } catch (error) {
        console.error('Error fetching images (fetch):', error);
      }
    };

    fetchImages();
  }, [BASE_URL]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
          <div className="bg-[#f3f3f3] w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center text-black">
            
            <div className="aspect-w-4 aspect-h-3 w-full mb-4">
              {images[0] && <Image className="h-full w-full object-cover" imgSrc={`${BASE_URL}/images/${images[0].image2}`} />} {/* Image 1 http://localhost:5000/images/${images[0].image2}*/}
            </div>
    
            <div className="text-left h-140 md:h-200 lg:h-260 w-full mx-4">
              <div className="mx-8">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
                  Imprimante sales
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl mb-6">
                  ลดสูงสุดถึง <span className="text-4xl md:text-5xl lg:text-5xl font-bold">30%</span> สำหรับสินค้าทั้งหมด
                </p>
                <div className="mb-8">
                  {/* มีนา */}
                  <ShopNow />
                </div>
              </div>
            </div>

          </div>
    
          <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
            
            <div className="h-1/2 w-full">
              <Link to="/shop">
                {images[1] && <Image className="h-full w-full object-cover" imgSrc={`${BASE_URL}/images/${images[1].image2}`} />} {/* Image 2 http://localhost:5000/images/${images[1].image2*/}
              </Link>
            </div>
            
            <div className="h-1/2 w-full">
              <Link to="/shop">
                {images[2] && <Image className="h-full w-full object-cover" imgSrc={`${BASE_URL}/images/${images[2].image2}`} />} {/* Image 3 http://localhost:5000/images/${images[2].image3*/}
              </Link>
            </div>

          </div>

        </div>
      );
};

export default Sale;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import Image from "../../designLayouts/Image";
// import ShopNow from "../../designLayouts/buttons/ShopNow";

// const Sale = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   useEffect(() => {
//     axios.get(`${BASE_URL}/api/sale-images`)//http://localhost:5000
//       .then(response => {
//         setImages(response.data); // Assuming response.data is an array of image objects
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Failed to fetch images:', err);
//         setError('Failed to load images.');
//         setLoading(false);
//       });
//   }, [BASE_URL]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
//       <div className="bg-[#f3f3f3] w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center text-black">
//         <div className="aspect-w-4 aspect-h-3 w-full mb-4">
//           {images[0] && <Image className="h-full w-full object-cover" imgSrc={`${BASE_URL}/images/${images[0].image2}`} />} {/* Image 1 http://localhost:5000/images/${images[0].image2}*/}
//         </div>

//         <div className="text-left h-140 md:h-200 lg:h-260 w-full mx-4">
//           <div className="mx-8">
//             <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
//               Imprimante sales
//             </h2>
//             <p className="text-lg md:text-xl lg:text-2xl mb-6">
//               ลดสูงสุดถึง <span className="text-4xl md:text-5xl lg:text-5xl font-bold">30%</span> สำหรับสินค้าทั้งหมด
//             </p>
//             <div className="mb-8">
//               <ShopNow />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
//         <div className="h-1/2 w-full">
//           <Link to="/shop">
//             {images[1] && <Image className="h-full w-full object-cover" imgSrc={`${BASE_URL}/images/${images[1].image2}`} />} {/* Image 2 http://localhost:5000/images/${images[1].image2*/}
//           </Link>
//         </div>
//         <div className="h-1/2 w-full">
//           <Link to="/shop">
//             {images[2] && <Image className="h-full w-full object-cover" imgSrc={`${BASE_URL}/images/${images[2].image2}`} />} {/* Image 3 http://localhost:5000/images/${images[2].image3*/}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sale;




