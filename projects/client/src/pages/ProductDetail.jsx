import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../features/products/productSlice";
import ProductDetailCard from "../components/Product/ProductDetailCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div className="hero min-h-screen bg-white overflow-auto pt-16 lg:pt-20">
      <div className="hero-content flex flex-col lg:flex-row justify-around lg:gap-6 lg:items-start lg:h-[600px] lg:w-[900px] bg-white shadow-2xl rounded-2xl pt-10">
        <ProductDetailCard product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
