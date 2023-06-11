import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import LatestProducts from "../components/LatestProducts";
import Navbar from "../components/Navbar/Navbar";

function LandingPage() {
  return (
    <div className="bg-base-100">
      <Navbar />
      <Header />
      <LatestProducts />
      <Footer />
    </div>
  );
}

export default LandingPage;
