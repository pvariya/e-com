import React, { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import ShortOption from "../components/Products/ShortOption";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = React.useState([]);
  const sidebarRef = React.useRef(null);
  const [sideBarOpen, setSidebarOpen] = React.useState(false);
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
    return ()=>{
    document.removeEventListener("mousedown", handalClickOutSide);
    }
  },[]);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 2,
          name: "Product 2",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/500/500?random=3",
              alttext: "Product 1",
            },
          ],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/500/500?random=4",
              alttext: "Product 1",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/500/500?random=5",
              alttext: "Product 1",
            },
          ],
        },
        {
          _id: 5,
          name: "Product 5",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/500/500?random=6",
              alttext: "Product 1",
            },
          ],
        },
        {
          _id: 2,
          name: "Product 6",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/500/500?random=3",
              alttext: "Product 1",
            },
          ],
        },
        {
          _id: 3,
          name: "Product 7",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/500/500?random=4",
              alttext: "Product 1",
            },
          ],
        },
        {
          _id: 4,
          name: "Product 8",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/500/500?random=5",
              alttext: "Product 1",
            },
          ],
        },
        {
          _id: 5,
          name: "Product 9",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/500/500?random=6",
              alttext: "Product 1",
            },
          ],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
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
        <ProductGrid products={products}/>
      </div>
    </div>
  );
};

export default CollectionPage;
