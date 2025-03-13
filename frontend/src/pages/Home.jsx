import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivel from "../components/Products/NewArrivel";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import { API } from "../config/url";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  
  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await API.get("/products/bestSeller");
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivel />

      <h2 className="text-3xl text-center font-bold mb-4 mt-20">Best Seller</h2>
      {bestSellerProduct && bestSellerProduct._id ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading Best Seller product...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl  text-center font-bold mb-4">
          Top Wears for women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
