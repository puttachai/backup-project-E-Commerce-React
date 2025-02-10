// import React, { useState } from "react";
// // import { FaPlus } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { ImPlus } from "react-icons/im";
// import NavTitle from "./NavTitle";
// // import { useDispatch, useSelector } from "react-redux";
// // import { toggleCategory } from "../../../../redux/orebiSlice";

// // const Category = () => {
//   // const [showSubCatOne, setShowSubCatOne] = useState(false);

//   // const checkedCategorys = useSelector(
//   //   (state) => state.orebiReducer.checkedCategorys
//   // );
//   // const dispatch = useDispatch();

// //   const category = [
// //     {
// //       _id: 9006,
// //       title: "Imprimante",
// //     },
// //     {
// //       _id: 9007,
// //       title: "Encre",
// //     },
// //     {
// //       _id: 9008,
// //       title: "Ruban",
// //     },
// //     {
// //       _id: 9009,
// //       title: "Bac de dechet",
// //     },
// //   ];

//   // const handleToggleCategory = (category) => {
//   //   dispatch(toggleCategory(category));
//   // };


//   const Category = () => {
//     const [showSubCatOne, setShowSubCatOne] = useState(true);
  
//     const category = [
//       {
//         _id: 9006,
//         title: "Imprimante",
//       },
//       {
//         _id: 9007,
//         title: "Encre",
//       },
//       {
//         _id: 9008,
//         title: "Ruban",
//       },
//       {
//         _id: 9009,
//         title: "Bac de dechet",
//       },
//     ];


//   return (
//     <div 
//       onClick={() => setShowSubCatOne(!showSubCatOne)}
//       className="w-full cursor-pointer"
//     >
//       <NavTitle title="Shop by Category" icons={true} />
//       <div>
//       {showSubCatOne && (
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >

//         <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
//           {category.map((item) => (
//             <li
//               key={item._id}
//               className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
//             >
//               <input
//                 type="checkbox"
//                 id={item._id}
//                 checked={checkedCategorys.some((b) => b._id === item._id)}
//                 onChange={() => handleToggleCategory(item)}
//               />
//               {item.title}
//               {item.icons && (
//                 <span
//                   onClick={() => setShowSubCatOne(!showSubCatOne)}
//                   className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
//                 >
//                   <ImPlus />
//                 </span>
//               )}
//             </li>
//           ))}
//           {/*li onClick={() => console.log(checkedCategorys)}>test</li>*/}
//         </ul>
//         </motion.div>
//       )}
//       </div>
//     </div>
//   );
// };

// export default Category;





import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategoryData } from "../../../../redux/orebiSlice"; // นำเข้า action ที่จะใช้
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(true);
  const [categorydata, setcategorydata] = useState([]); 
  console.log("categorydata: ",categorydata);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ดึง checkedCategorys จาก Redux
  const checkedCategorysData = useSelector((state) => state.orebiReducer.checkedCategorysData);
  const dispatch = useDispatch();

  const categorytest = [
    {
      _id: 9006,
      title: "Imprimante",
    },
    {
      _id: 9007,
      title: "Encre",
    },
    {
      _id: 9008,
      title: "Ruban",
    },
    {
      _id: 9009,
      title: "Bac de dechet",
    },
  ];
  
  console.log(!categorytest);

  useEffect(() => {
      // if (!categoryId) return;
      axios
        .get(`${BASE_URL}/api/products_by_category`, {
          headers: {
            //'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',// ห้ามแคช
          },
        })
        .then((response) => {
          // setProducts(response.data);
          setcategorydata(response.data);
          console.log("response.data: ",response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setError("Failed to load products.");
          setLoading(false);
        });
    }, []); //categoryId

  // ฟังก์ชันสำหรับการ toggle category
  // const handleToggleCategory = (categorydata) => {
  //   dispatch(toggleCategoryData(categorydata));
  //   console.log("handleToggleCategory: ",handleToggleCategory);
  //   console.log("handleToggleCategory(category): ",handleToggleCategory(categorydata));
  // };
  const handleToggleCategory = (categorydata) => {
    // Check if the category is already in the checked list
    const isCategoryChecked = checkedCategorysData.some(
      (b) => b.categories_id === categorydata.categories_id
    );
    console.log("isCategoryChecked: ",isCategoryChecked);
  
    // Dispatch the action to toggle the category, whether it's checked or unchecked
    dispatch(toggleCategoryData(categorydata));
  };
  
  // const handleToggleCategory = (category) => {
  //   dispatch(toggleCategoryData(category));
  //   console.log("handleToggleCategory: ",handleToggleCategory);
  //   console.log("handleToggleCategory(category): ",handleToggleCategory(category));
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;


  return (
  <div>
    <div 
      onClick={() => setShowSubCatOne(!showSubCatOne)}
      className="w-full cursor-pointer"
    >
      <NavTitle title="Shop by Category" icons={true} />
      </div>
      {showSubCatOne && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {categorydata.map((item) => (
              <li
                key={item.id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  id={item.categories_id}
                  checked={checkedCategorysData.some((b) => b.categories_id === item.categories_id)}
                  // checked={checkedCategorys.some((b) => b._id === item._id)}
                  onChange={() => handleToggleCategory(item)}
                />
                {item.category_name}
                {item.icons && (
                  <span
                    onClick={() => setShowSubCatOne(!showSubCatOne)}
                    className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                  >
                    <ImPlus />
                  </span>
                )}
              </li>
            ))}
            {/*li onClick={() => console.log(checkedCategorys)}>test</li>*/}
          </ul>
        </motion.div>
      )}
      
    </div>
  );
};

export default Category;


// {showSubCatOne && (
//   <motion.div
//     initial={{ y: -20, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ duration: 0.5 }}
//   >
//     <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
//       {category.map((item) => (
//         <li
//           key={item._id}
//           className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
//         >
//           <input
//             type="checkbox"
//             id={item._id}
//             checked={checkedCategorys.some((b) => b._id === item._id)}
//             onChange={() => handleToggleCategory(item)}
//           />
//           {item.title}
//           {item.icons && (
//             <span
//               onClick={() => setShowSubCatOne(!showSubCatOne)}
//               className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
//             >
//               <ImPlus />
//             </span>
//           )}
//         </li>
//       ))}