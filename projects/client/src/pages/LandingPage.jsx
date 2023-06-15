import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import LatestProducts from "../components/LatestProducts";
import Navbar from "../components/Navbar";
import CarouselLatestProducts from "../components/CarouselLatestProducts";
import CarouselCard from "../components/CarouselCard";
import DisplayProduct from "../components/DisplayProduct";

function Home() {
  return (
    <div className="bg-base-100">
      <Navbar />
      <Header />
      <LatestProducts />
      <DisplayProduct />
      <Footer />
    </div>
  );
}

export default Home;
