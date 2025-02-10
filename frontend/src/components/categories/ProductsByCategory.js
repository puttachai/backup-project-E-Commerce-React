import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from "../home/Products/Product"; // นำเข้าคอมโพเนนต์ Product
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const ProductsByCategory = () => {
  const { categories_id } = useParams(); // รับ category_id จาก URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(48);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // ดึงข้อมูลสินค้าตาม category_id
    axios
      .get(`${BASE_URL}/api/products-by-category/${categories_id}`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
        console.log("response.data: ", response.data);
        console.log("response: ", response);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [categories_id, BASE_URL]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products found in this category.</p>;

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>

        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          {/* <Pagination itemsPerPage={itemsPerPage} /> */}

          <div className="container">
            <h2 className="text-2xl font-bold mb-4">
              {/* Products in Category {products.name} */}
              Products in Category {products[0]?.categories_name || 'No Product Name'}
              {/* Products in Category {products.map(product => product.name).join(', ')} */}
            </h2>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {products.slice(0, itemsPerPage).map((product) => (
                <div key={product.id} className="w-full">
                  <Product
                    id={product.id}
                    barcode={product.barcode}
                    name={product.product_name}
                    price={product.price}
                    qty={product.qty}
                    img={`${BASE_URL}/images/product/${product.image}`}
                    description={product.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>

    // <div className="container">
    //   <h2 className="text-2xl font-bold mb-4">Products in Category {categories_id}</h2>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //     {products.map((product) => (
    //       <div key={product.id} className="w-full">
    //         <Product
    //           id={product.id}
    //           barcode={product.barcode}
    //           name={product.name}
    //           price={product.price}
    //           qty={product.qty}
    //           img={`${BASE_URL}/images/product/${product.image}`}
    //           description={product.description}
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ProductsByCategory;
