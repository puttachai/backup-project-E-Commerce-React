/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Heading from "../Products/Heading";
// import Product from "../Products/Product";
// import Slider from "react-slick";

// const ShowProduct = () => {
//     const [showProductset, setshowProductset] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const BASE_URL = process.env.REACT_APP_BASE_URL;

//     // ดึงข้อมูลสินค้ามาใหม่จากฐานข้อมูล
//     useEffect(() => {
//       axios.get(`${BASE_URL}/api/show-product-images`, {
//         method: 'GET',
//         headers: {
//           'Cache-Control': 'no-cache',
//           'ngrok-skip-browser-warning': 'true',
//           //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
//         }
//       })
//         .then(response => {
//           console.log(response.data); // Check the data structure here
//           setshowProductset(response.data);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error('Failed to fetch showProduct:', err);
//           setError('Failed to load showProduct.');
//           setLoading(false);
//         });
//     }, [BASE_URL]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;



//     const settings = {
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         // nextArrow: <SampleNextArrow onClick={() => {}} />,
//         // prevArrow: <SamplePrevArrow onClick={() => {}} />,
//         responsive: [
//           {
//             breakpoint: 1025,
//             settings: {
//               slidesToShow: 3,
//               slidesToScroll: 1,
//               infinite: true,
//             },
//           },
//           {
//             breakpoint: 769,
//             settings: {
//               slidesToShow: 2,
//               slidesToScroll: 2,
//               infinite: true,
//             },
//           },
//           {
//             breakpoint: 480,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               infinite: true,
//             },
//           },
//         ],
//       };

// const products = [
//     {
//       id: 1,
//       name: 'Earthen Bottle',
//       href: '#',
//       price: '$48',
//       imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
//       imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
//     },
//     {
//       id: 2,
//       name: 'Nomad Tumbler',
//       href: '#',
//       price: '$35',
//       imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
//       imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
//     },
//     {
//       id: 3,
//       name: 'Focus Paper Refill',
//       href: '#',
//       price: '$89',
//       imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
//       imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
//     },
//     {
//       id: 4,
//       name: 'Machined Mechanical Pencil',
//       href: '#',
//       price: '$35',
//       imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
//       imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//     },
//     // More products...
//   ]
  
 // export default function Example() {
//     return (
//         <div className="bg-white pt-4 pb-10">
//         <Heading heading="Product" />
//         <div className="mx-auto px-4 pt-2.5 pb-24 sm:px-6 sm:py-4 lg:px-8">
//           <Slider {...settings}>
//             {showProductset.map((product) => (
//               <div className="px-2" key={product.id}>
//                 <Product
//                   _id={product.id}
//                 //   img={product.imageSrc}
//                   img={`${BASE_URL}/images/product/${product.image}`} // ใช้ฟิลด์ image2 จากฐานข้อมูล http://localhost:5000
//                   productName={product.name.length > 13 ? `${product.name.substring(0, 13)}...` : product.name}
//                   price={product.price}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     )
//   }


//   export default ShowProduct;

/**/

//   <div className="bg-white pt-4 pb-10">
//   <div>
//   <Heading heading="Product" />
//   </div>
//   <div className=" mx-auto px-4 pt-2.5 pb-24 sm:px-6 sm:py-4 lg:px-8" >{/* max-w-2xl lg:max-w-7xl    mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8*/}
  
//    {/* <h2 className="sr-only">Products</h2>* */}
//     <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
//     <Slider {...settings}>
//           {showProductset.map((showProductset) => (
//           <a key={showProductset.id} href={showProductset.href} className="group">
//               <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
//               <img
//                   alt={showProductset.imageAlt}
//                   src={showProductset.imageSrc}
//                   className="h-full w-full object-cover object-center group-hover:opacity-75"
//               />
//               </div>
//               <h3 className="mt-4 text-sm text-gray-700">{showProductset.name.length > 13 ? `${showProductset.name.substring(0, 13)}...` : showProductset.name}</h3>{/*{product.name}*/}
//               <p className="mt-1 text-lg font-medium text-gray-900">{showProductset.price}</p>
//           </a>
//           ))}
//       </Slider>
//     </div>
//   </div>
// </div>



/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import axios from "axios";
//import Heading from "../Products/Heading";
import Product from "../Products/Product";
import Heading from "../Products/Heading";
//import Slider from "react-slick";

const BASE_URL = process.env.REACT_APP_BASE_URL;
//Function แสดงข้อมูลสินค้า Product
const ShowProduct = ({ currentItems = [], selectedBrands = [], selectedCategories = [] }) => {

  console.log("ShowProduct: ",ShowProduct);
  // console.log("showproduct: ",showproduct);

    const filteredShowproduct = currentItems.filter((showproduct) => {
      console.log("showproduct: ",showproduct);
        const isBrandSelected =
          selectedBrands.length === 0 ||
          selectedBrands.some((brand) => brand.title === showproduct.brand);
          console.log("showproduct.brand: ",showproduct.brand);
          console.log("isBrandSelected: ",isBrandSelected);
    
        const isCategorySelected =
          selectedCategories.length === 0 ||
          selectedCategories.some((category) => category.title === showproduct.cat);

          console.log("isCategorySelected: ",isCategorySelected);
          console.log("showproduct.cat: ",showproduct.cat);
          // console.log("category: ",category);
    
        return isBrandSelected && isCategorySelected;
      });
      console.log("filteredShowproduct: ",filteredShowproduct);

      return (
        <>
          {filteredShowproduct.map((showproduct) => (
            <div key={showproduct.id} className="w-full"> {/*// เปลี่ยน id เป็น _id , grid*/}
              {/*<div key={pagination._id} className="w-full"></div> */}
              <Product
                id={showproduct.id} // เปลี่ยน id เป็น _id
                barcode={showproduct.barcode}
                name={showproduct.name}
                price={showproduct.price}
                qty={showproduct.qty}
                img={`${BASE_URL}/images/product/${showproduct.image}`} // ใช้ฟิลด์ image2 จากฐานข้อมูล http://localhost:5000
                description={showproduct.description}
              />
            </div>
            
          ))}
        </>
      );
    };


    // Function โครงสร้างหน้าการแสดงข้อมูลสินค้า
    const ShowProducts = ({ itemsPerPage = 8 }) => {
        const [showproduct, setshowProducts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        const BASE_URL = process.env.REACT_APP_BASE_URL;
    
        // Fetch products
        useEffect(() => {

          const token = localStorage.getItem('authToken'); // สมมติว่าโทเค็นถูกเก็บใน localStorage

            axios.get(`${BASE_URL}/api/show-product-images`,{
              headers: {
                //'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',// ห้ามแคช
                Authorization: `Bearer ${token}`,
              },
            })
                .then(response => {
                    setshowProducts(response.data);
                    console.log("response.data: ",response.data);
                    setLoading(false);
                })
                 .catch(err => { // or .catch(() => {
                console.error('Failed to fetch showProduct:', err);
                setError('Failed to load showProduct.');
                setLoading(false);
              });
        }, [BASE_URL]);
    
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = showproduct.slice(itemOffset, endOffset);
        console.log("currentItems295: ",currentItems);

        const selectedBrands = useSelector(state => state.orebiReducer.checkedBrands);
        console.log("selectedBrands294: ",selectedBrands);

        const selectedCategories = useSelector(state => state.orebiReducer.checkedCategorys);
        console.log("selectedCategories297: ",selectedCategories);

        const pageCount = itemsPerPage > 0 ? Math.ceil(showproduct.length / itemsPerPage) : 0;
    
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % showproduct.length;
            setItemOffset(newOffset);
        };
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
    
        const itemStart = itemOffset + 1;
        const itemEnd = Math.min(endOffset, showproduct.length || 0);
    
        return (
          <div className="">
            <Heading heading="Product" />
          
            <div className="flex flex-col justify-center items-center w-full h-full pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 mdl:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">{/* grid-cols-1 md:grid-cols-2 xl:grid-cols-3,    grid justify-center items-center object-cover grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 h-full w-full, grid-cols-3 */}
                    <ShowProduct
                        currentItems={currentItems}
                        selectedBrands={selectedBrands}
                        selectedCategories={selectedCategories}
                    />
                </div>
                <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
                    <ReactPaginate
                        nextLabel=""
                        onPageChange={handlePageClick}
                        breakLabel="..."
                        breakClassName="custom-break mr-6"
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel=""
                        pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                        pageClassName="mr-6"               
                        containerClassName="flex text-base font-semibold font-titleFont py-10"
                        activeClassName="bg-black text-white"
                    />
                    <p className="text-base font-normal text-lightText">
                        Products from {itemStart} to {itemEnd} of {showproduct.length}
                    </p>
                </div>
            </div>
            </div>
        );
    };
    
    ShowProducts.propTypes = {
        itemsPerPage: PropTypes.number//.isRequired,
    };
    ShowProduct.propTypes = {
        currentItems: PropTypes.array.isRequired,
        selectedBrands: PropTypes.array.isRequired,
        selectedCategories: PropTypes.array.isRequired,
    };

    // // propTypes for Paginations component
    // ShowProducts.propTypes = {
    //     itemsPerPage: PropTypes.number.isRequired,  // Ensure itemsPerPage is passed and is a number
    // };


export default ShowProducts;

//     const settings = {
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         // nextArrow: <SampleNextArrow onClick={() => {}} />,
//         // prevArrow: <SamplePrevArrow onClick={() => {}} />,
//         responsive: [
//           {
//             breakpoint: 1025,
//             settings: {
//               slidesToShow: 3,
//               slidesToScroll: 1,
//               infinite: true,
//             },
//           },
//           {
//             breakpoint: 769,
//             settings: {
//               slidesToShow: 2,
//               slidesToScroll: 2,
//               infinite: true,
//             },
//           },
//           {
//             breakpoint: 480,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               infinite: true,
//             },
//           },
//         ],
//       };

// // const products = [
// //     {
// //       id: 1,
// //       name: 'Earthen Bottle',
// //       href: '#',
// //       price: '$48',
// //       imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
// //       imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
// //     },
// //     {
// //       id: 2,
// //       name: 'Nomad Tumbler',
// //       href: '#',
// //       price: '$35',
// //       imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
// //       imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
// //     },
// //     {
// //       id: 3,
// //       name: 'Focus Paper Refill',
// //       href: '#',
// //       price: '$89',
// //       imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
// //       imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
// //     },
// //     {
// //       id: 4,
// //       name: 'Machined Mechanical Pencil',
// //       href: '#',
// //       price: '$35',
// //       imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
// //       imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
// //     },
// //     // More products...
// //   ]
  
//  // export default function Example() {
//     return (
//         <div className="bg-white pt-4 pb-10">
//         <Heading heading="Product" />
//         <div className="mx-auto px-4 pt-2.5 pb-24 sm:px-6 sm:py-4 lg:px-8">
//           <Slider {...settings}>
//             {showProductset.map((product) => (
//               <div className="px-2" key={product.id}>
//                 <Product
//                   _id={product.id}
//                 //   img={product.imageSrc}
//                   img={`${BASE_URL}/images/product/${product.image}`} // ใช้ฟิลด์ image2 จากฐานข้อมูล http://localhost:5000
//                   productName={product.name.length > 13 ? `${product.name.substring(0, 13)}...` : product.name}
//                   price={product.price}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     )
//   }


//   export default ShowProduct;

/**/

//   <div className="bg-white pt-4 pb-10">
//   <div>
//   <Heading heading="Product" />
//   </div>
//   <div className=" mx-auto px-4 pt-2.5 pb-24 sm:px-6 sm:py-4 lg:px-8" >{/* max-w-2xl lg:max-w-7xl    mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8*/}
  
//    {/* <h2 className="sr-only">Products</h2>* */}
//     <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
//     <Slider {...settings}>
//           {showProductset.map((showProductset) => (
//           <a key={showProductset.id} href={showProductset.href} className="group">
//               <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
//               <img
//                   alt={showProductset.imageAlt}
//                   src={showProductset.imageSrc}
//                   className="h-full w-full object-cover object-center group-hover:opacity-75"
//               />
//               </div>
//               <h3 className="mt-4 text-sm text-gray-700">{showProductset.name.length > 13 ? `${showProductset.name.substring(0, 13)}...` : showProductset.name}</h3>{/*{product.name}*/}
//               <p className="mt-1 text-lg font-medium text-gray-900">{showProductset.price}</p>
//           </a>
//           ))}
//       </Slider>
//     </div>
//   </div>
// </div>