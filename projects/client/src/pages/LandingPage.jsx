import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import LatestProducts from "../components/LatestProducts";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-base-100">
      <Navbar />
      <Header />
      <LatestProducts />
      <Footer />
    </div>
  );
}

export default Home;
