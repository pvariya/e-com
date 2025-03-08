import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
const NewArrivel = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, serStratX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const newArrivel = [
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      img: [
        { url: "https://picsum.photos/500/500?random=1", alttext: "Product 1" },
      ],
    },
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      img: [
        { url: "https://picsum.photos/500/500?random=2", alttext: "Product 1" },
      ],
    },
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      img: [
        { url: "https://picsum.photos/500/500?random=3", alttext: "Product 1" },
      ],
    },
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      img: [
        { url: "https://picsum.photos/500/500?random=4", alttext: "Product 1" },
      ],
    },
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      img: [
        { url: "https://picsum.photos/500/500?random=5", alttext: "Product 1" },
      ],
    },
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      img: [
        { url: "https://picsum.photos/500/500?random=6", alttext: "Product 1" },
      ],
    },
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      img: [
        { url: "https://picsum.photos/500/500?random=7", alttext: "Product 1" },
      ],
    },
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      img: [
        { url: "https://picsum.photos/500/500?random=8", alttext: "Product 1" },
      ],
    },
  ];

  const handalMouseDown = (e) => {
    setIsDragging(true);
    serStratX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handalMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handalMouseUporLeave = () => {
    setIsDragging(false);
  };

  const scroll = (diracion) => {
    const scrollAmount = diracion === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollBtn = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollLable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollLable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollBtn);
      updateScrollBtn();
      return () => container.removeEventListener("scroll", updateScrollBtn);
    }
  },[]);
  return (
    <section className="py-16 px-4 lg:py-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest style straight off runway, freshly added to keep
          wardrobe on the cutting edge of fashion.
        </p>

        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded  ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded  ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handalMouseDown}
        onMouseMove={handalMouseMove}
        onMouseUp={handalMouseUporLeave}
        onMouseLeave={handalMouseUporLeave}
      >
        {newArrivel.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative  "
          >
            <img
              src={product.img[0]?.url}
              alt={product.img[0]?.alttext || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`}>
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivel;
