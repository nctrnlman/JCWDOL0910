import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import LatestProducts from "../components/LatestProducts";
import Navbar from "../components/Navbar";
import CarouselLatestProducts from "../components/CarouselLatestProducts";
import CarouselCard from "../components/CarouselCard";

function Home() {
    return (
        <>
            <Navbar />
            <Header />
            <LatestProducts />
            <Footer />

        </>
    );
}

export default Home;