import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import LatestProducts from "../components/LatestProducts";
import Navbar from "../components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
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
