// import React, { useEffect, useState } from "react";
// import { HiOutlineChevronRight } from "react-icons/hi";
// import { useLocation } from "react-router-dom";
// import PropTypes from "prop-types";

// const Breadcrumbs = ({ prevLocation, title }) => {
//   const location = useLocation();
//   const [locationPath, setLocationPath] = useState("");
//   useEffect(() => {
//     setLocationPath(location.pathname.split("/")[1]);
//   }, [location]);

//   return (
//     <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
//       <h1 className="text-5xl text-primeColor font-titleFont font-bold">
//         {title}
//       </h1>
//       <p className="text-sm font-normal text-lightText capitalize flex items-center">
//         <span> {prevLocation === "" ? "Home" : prevLocation}</span>

//         <span className="px-1">
//           <HiOutlineChevronRight />
//         </span>
//         <span className="capitalize font-semibold text-primeColor">
//           {locationPath}
//         </span>
//       </p>
//     </div>
//   );
// };

// Breadcrumbs.propTypes = {
//   prevLocation: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired
// };

// export default Breadcrumbs;


import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumbs = ({ prevLocation = "Home", title , categories_id}) => {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setLocationPath(path || title.toLowerCase()); // fallback to title if no path exists
  }, [location, title]);
  
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setLocationPath(path || categories_id.toLowerCase()); // fallback to title if no path exists
  }, [location, categories_id]);
  

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <span>{prevLocation}</span>
        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor">
          {locationPath}
        </span>
      </p>
    </div>
  );
};

Breadcrumbs.propTypes = {
  prevLocation: PropTypes.string,
  title: PropTypes.string.isRequired,
  categories_id: PropTypes.number.isRequired,
};

export default Breadcrumbs;
