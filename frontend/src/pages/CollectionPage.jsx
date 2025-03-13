import React, { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import ShortOption from "../components/Products/ShortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loadin, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = React.useRef(null);
  const [sideBarOpen, setSidebarOpen] = React.useState(false);


useEffect(() => {
  dispatch(fetchProductsByFilters({ collection, ...queryParams }));
}, [dispatch, collection, searchParams]);


  const toggleSideBar = () => {
    setSidebarOpen(!sideBarOpen);
  };

  const handalClickOutSide = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handalClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handalClickOutSide);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filter
      </button>

      {/* filter sideBar */}
      <div
        ref={sidebarRef}
        className={`${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
         fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collaction</h2>

        {/* shor Option */}
        <ShortOption />
        {/* product Grid */}
        <ProductGrid products={products} loading={loadin} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
