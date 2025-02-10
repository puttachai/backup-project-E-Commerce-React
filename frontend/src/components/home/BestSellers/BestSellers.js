// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import Heading from "../Products/Heading";
// import Product from "../Products/Product";
// import {
//   bestSellerOne,
//   bestSellerTwo,
//   bestSellerThree,
//   bestSellerFour,
// } from "../../../assets/images/index";
// //import axios from "axios";


// // const BestSellers = () => {

// //   const [bestSeller, setBastSellers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     axios.get('http://localhost:5000/api/best-sellers-images')
// //     .then(response => {
// //       setBastSellers(response.data);
// //       setLoading(false);
// //     })
// //     .catch(err => {
// //       console.error('Failed to fetch best sellers:', err);
// //       setError('Failed to load best sellers.');
// //       setLoading(false);
// //     });
// //   },[]);

// //   if(loading) return <p>Loading...</p>
// //   if(error) return <p>{error}</p>

// const BestSellers = () => {

//   return (
//     <div className="w-full pb-20">
//       <Heading heading="Our Bestsellers" />
//       <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
//         <Product
//           _id="1011"

//           img={bestSellerOne}
//           //bestSeller = {bestSeller[1] && <Image className="h-full w-full object-cover" imgSrc={`http://localhost:5000/images/saleimage/${bestSeller[1].image2}`} />} 
//           productName="Flower Base"
//           price="35.00"
//           color="Blank and White"
//           badge={true}
//           des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//         />
//         <Product
//           _id="1012"
//           img={bestSellerTwo}
//           productName="New Backpack"
//           price="180.00"
//           color="Gray"
//           badge={false}
//           des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//         />
//         <Product
//           _id="1013"
//           img={bestSellerThree}
//           productName="Household materials"
//           price="25.00"
//           color="Mixed"
//           badge={true}
//           des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//         />
//         <Product
//           _id="1014"
//           img={bestSellerFour}
//           productName="Travel Bag"
//           price="220.00"
//           color="Black"
//           badge={false}
//           des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
//         />
//       </div>
//     </div>
//   );
// //};
// };

// export default BestSellers;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // ดึงข้อมูลรูปภาพและรายละเอียดสินค้าขายดีจากฐานข้อมูล
  useEffect(() => {
    axios.get(`${BASE_URL}/api/best-sellers-images`, {//http://localhost:5000
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'ngrok-skip-browser-warning': 'true',
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    })
      .then(response => {
        setBestSellers(response.data); // คาดว่าข้อมูลที่ดึงมาเป็นรูปภาพและข้อมูลสินค้า
        console.log("response.data: ",response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch best sellers:', err);
        setError('Failed to load best sellers.');
        setLoading(false);
      });
  }, [BASE_URL]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {bestSellers.map((bestSeller, index) => (
          <Product
            key={bestSeller.id || index}
            id={bestSeller.id}
            img={`${BASE_URL}/images/bestsale/${bestSeller.image}`} // ใช้ฟิลด์ image2 จากฐานข้อมูล http://localhost:5000
            //productName={bestSeller.productName}
            name={bestSeller.name} // Check here bestSeller.name || 
            price={bestSeller.price}
            color={bestSeller.color}
            badge={bestSeller.badge}
            des={bestSeller.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;

