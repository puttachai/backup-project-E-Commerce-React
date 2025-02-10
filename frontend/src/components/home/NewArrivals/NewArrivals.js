// import React from "react";
// import Slider from "react-slick";
// import Heading from "../Products/Heading";
// import Product from "../Products/Product";
// import {
//   newArrOne,
//   newArrTwo,
//   newArrThree,
//   newArrFour,
// } from "../../../assets/images/index";
// import SampleNextArrow from "./SampleNextArrow";
// import SamplePrevArrow from "./SamplePrevArrow";

// const NewArrivals = () => {
//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1025,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 769,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };
//   return (
//     <div className="w-full pb-16">
//       <Heading heading="New Arrivals" />
//       <Slider {...settings}>
//         <div className="px-2">
//           <Product
//             _id="100001"
//             img={newArrOne}
//             productName="Round Table Clock"
//             price="44.00"
//             color="Black"
//             badge={true}
//             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//           />
//         </div>
//         <div className="px-2">
//           <Product
//             _id="100002"
//             img={newArrTwo}
//             productName="Smart Watch"
//             price="250.00"
//             color="Black"
//             badge={true}
//             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//           />
//         </div>
//         <div className="px-2">
//           <Product
//             _id="100003"
//             img={newArrThree}
//             productName="cloth Basket"
//             price="80.00"
//             color="Mixed"
//             badge={true}
//             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//           />
//         </div>
//         <div className="px-2">
//           <Product
//             _id="100004"
//             img={newArrFour}
//             productName="Funny toys for babies"
//             price="60.00"
//             color="Mixed"
//             badge={false}
//             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//           />
//         </div>
//         <div className="px-2">
//           <Product
//             _id="100005"
//             img={newArrTwo}
//             productName="Funny toys for babies"
//             price="60.00"
//             color="Mixed"
//             badge={false}
//             des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//           />
//         </div>
//       </Slider>
//     </div>
//   );
// };

// export default NewArrivals;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log("BASE_URL: ",BASE_URL);

  // ดึงข้อมูลสินค้ามาใหม่จากฐานข้อมูล
  useEffect(() => {
    axios.get(`${BASE_URL}/api/new-arrivals-images`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'ngrok-skip-browser-warning': 'true',
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    })
      .then(response => {
        setNewArrivals(response.data);
        console.log("response.data: ",response.data); // Check the data structure here
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch new arrivals:', err);
        setError('Failed to load new arrivals.');
        setLoading(false);
      });
  }, [BASE_URL]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // const formattedArrivals = newArrivals.map(item => ({
  //   _id: String(item._id), // Ensure _id is a string
  //   name: item.name || 'Unnamed Product', // Provide a default name
  //   badge: String(item.badge), // Ensure badge is a string
  //   price: Number(item.price), // Convert price to a number
  // }));

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {newArrivals.map((newArrival) => (
          // <div className="px-2" key={newArrival._id}>
          <div className="px-2" key={newArrival.id}>
            <Product
              // _id={newArrival._id}
              id={newArrival.id}
              img={`${BASE_URL}/images/NewArrivals/${newArrival.image}`} // ใช้ฟิลด์ image2 จากฐานข้อมูล
              //productName={newArrival.productName}
              productName={newArrival.name} // Check here || newArrival.productName
              price={newArrival.price}
              color={newArrival.color}
              badge={newArrival.badge}
              des={newArrival.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Slider from "react-slick";
// import Heading from "../Products/Heading";
// import Product from "../Products/Product";
// import SampleNextArrow from "./SampleNextArrow";
// import SamplePrevArrow from "./SamplePrevArrow";

// const NewArrivals = () => {
//   const [newArrivals, setNewArrivals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   // ดึงข้อมูลสินค้ามาใหม่จากฐานข้อมูล
//   useEffect(() => {
//     axios.get(`${BASE_URL}/api/new-arrivals-images`) // เปลี่ยนเป็น endpoint ของคุณ http://localhost:5000
//       .then(response => {
//         setNewArrivals(response.data); // คาดว่าข้อมูลที่ดึงมาเป็นรูปภาพและข้อมูลสินค้า
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Failed to fetch new arrivals:', err);
//         setError('Failed to load new arrivals.');
//         setLoading(false);
//       });
//   }, [BASE_URL]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1025,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 769,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="w-full pb-16">
//       <Heading heading="New Arrivals" />
//       <Slider {...settings}>
//         {newArrivals.map((newArrival) => (
//           <div className="px-2" key={newArrival._id}>
//             <Product
//               _id={newArrival._id}
//               img={`${BASE_URL}/images/NewArrivals/${newArrival.image2}`} // ใช้ฟิลด์ image2 จากฐานข้อมูล http://localhost:5000
//               productName={newArrival.productName}
//               price={newArrival.price}
//               color={newArrival.color}
//               badge={newArrival.badge}
//               des={newArrival.des}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default NewArrivals;
