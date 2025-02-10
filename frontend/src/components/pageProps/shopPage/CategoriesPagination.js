import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// This is the component you were rendering with map and filter
const CategoriesPagination = ({ currentItems = [], selectedBrands = [], selectedCategories = [] }) => {
  // Filter items based on selected brands and categories
  const filteredPagination = currentItems.filter((pagination) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.title === pagination.brand);

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.title === pagination.cat);

    return isBrandSelected && isCategorySelected;
  });

  return (
    <>
      {filteredPagination.map((paginationCat) => (
        <div key={paginationCat.id} className="w-full">
          {/*<div key={pagination._id} className="w-full"></div> */}
          <Product
            // _id={pagination._id}
            // // img={pagination.img}
            // img={`http://localhost:5000/images/product/${pagination.image2}`} // ใช้ฟิลด์ image2 จากฐานข้อมูล
            // productName={pagination.productName}
            // price={pagination.price}
            // color={pagination.color}
            // badge={pagination.badge}
            // des={pagination.des}

            id={paginationCat.id}
            // img={pagination.img}
            barcode={paginationCat.barcode}
            //productName={pagination.productName}
            name={paginationCat.name}
            price={paginationCat.price}
            qty={paginationCat.qty}
            img={`${BASE_URL}/images/product/${paginationCat.image}`} // ใช้ฟิลด์ image2 จากฐานข้อมูล http://localhost:5000
            description={paginationCat.description}
          />
        </div>
        
      ))}
    </>
  );
};

// The main pagination component that handles API fetch and pagination logic
const Paginations = ({ itemsPerPage }) => {
  const [pagination, setPagination] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/Pagination')
  //     .then(response => {
  //       setPagination(response.data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error('Failed to fetch Pagination:', err);
  //       setError('Failed to load Pagination.');
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    axios.get(`${BASE_URL}/api/Pagination_categories`, { //http://localhost:5000
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'ngrok-skip-browser-warning': 'true',
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    })
      .then(response => {
        setPagination(response.data);
        setLoading(false);
        console.log("response.data: ", response.data);
      })
      .catch(err => {
        console.error('Failed to fetch Pagination:', err);
        setError('Failed to load Pagination.');
        setLoading(false);
      });
  }, [BASE_URL]);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = pagination.slice(itemOffset, endOffset);
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const pageCount = Math.ceil(pagination.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pagination.length;
    const newStart = newOffset + 1;
    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Pagination
          currentItems={currentItems}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
        />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
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
          Products from {itemStart} to {Math.min(endOffset, pagination.length)} of{" "}
          {pagination.length}
        </p>
      </div>
    </div>
  );
};

// propTypes for Pagination component
Pagination.propTypes = {
  currentItems: PropTypes.array.isRequired,
  selectedBrands: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
};

// propTypes for Paginations component
Paginations.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,  // Ensure itemsPerPage is passed and is a number
};

export default CategoriesPagination;
