import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // เพิ่มการนำเข้า PropTypes
import Heading from "../Products/Heading";
import Product from "../Products/Product";
// import { SplOfferData } from "../../../constants";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SpecialOffers = () => { //{categoryId}

  // const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  console.log("products: ",products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { category, categoryId } = useParams();
  console.log("SpecialOffers category: ",category); //ตัวอย่างค่าที่ได้คือ electronics accessories
  

  // useEffect(() => {
  //   setData(SplOfferData);
  //   console.log(" SpecialOffers data: ",data);
  // }, [data]);

  useEffect(() => {
    // if (!categoryId) return;
    console.log("Log category: ",category); //ตัวอย่างค่าที่ได้: 
    console.log("Log categoryId: ",categoryId); //ตัวอย่างค่าที่ได้: 
  
    axios
      .get(`${BASE_URL}/api/products_specialOffers?categoryId=${categoryId}`,{
        headers: {
          'Cache-Control': 'no-cache',
          'ngrok-skip-browser-warning': 'true',
          //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
      })
      .then((response) => {
        setProducts(response.data);
        console.log("response.data: ",response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
    // axios
    //   .get(`${BASE_URL}/api/products_by_category?category_name=${category}`)
    //   .then((response) => {
    //     setProducts(response.data);
    //     console.log("response.data: ",response.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching products:", err);
    //     setError("Failed to load products.");
    //     setLoading(false);
    //   });
  }, [category,categoryId]);


  // const catData = products.filter((item) => item.category_name === category);
  // // const catData = products.filter((item) => item.category_name.toLowerCase() === category.category_name.toLowerCase());
  // console.log("catData: ",catData);


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;


  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {products.map((data) => (
          <Product
            key={data._id}
            _id={data._id}
            id={data.id}
            img={`${BASE_URL}/images/product/${data.image}`}
            productName={data.productName}
            name={data.name}
            price={data.price}
            color={data.color}
            badge={true}
            des={data.des}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
};

SpecialOffers.propTypes = {
  categoryId: PropTypes.string.isRequired,
}


export default SpecialOffers;
