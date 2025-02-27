import React from "react";
//import Banner from "../../components/Banner/Banner";
import BannerT from "../../components/Banner/BannerT";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import SpecialCase from "../../components/SpecialCase/Specialcase"
import YearProduct from "../../components/home/YearProduct/YearProduct";
import CategoriesP from "../../components/categories/CategoriesP";
import ShowProduct from "../../components/home/Products/showProduct";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      {/*<Banner />*/}
      <BannerT />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4 w-full">  {/*w-full*/}
        <CategoriesP />
        <Sale />
        <ShowProduct />
        <NewArrivals />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
        {/* <SpecialCase /> */}
        <div className="relative overflow-y-auto">
          <SpecialCase />
        </div>
      </div>
      {/* <SpecialCase /> */}
    </div>
  );
};

export default Home;
