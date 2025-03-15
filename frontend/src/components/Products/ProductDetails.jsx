import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilerProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );

  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImg, setMainImg] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      console.log("productFetchId", productFetchId);
      dispatch(fetchSimilerProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handalQty = (qty) => {
    if (qty === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (qty === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handalAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 2000,
      });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then((res) => {
        console.log("Add to Cart Response:", res);
        toast.success("Product added To Cart.", { duration: 2000 });
      })
      .catch((err) => {
        console.error("Add to Cart Error:", err);
        toast.error("Failed to add product to cart.");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error :{error}</h2>;
  }

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct?.images?.map((images, index) => (
                <img
                  key={index}
                  src={images.url}
                  alt={images.alttext || `Thumbnail ${index}`}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                    mainImg === images.url
                      ? "border-1 border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImg(images.url)}
                />
              ))}
            </div>

            <div className="md:w-1/2 h-[auto]">
              <div className="mb-4 h-full">
                <img
                  src={mainImg}
                  alt="Main Product"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* mobile view */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
              {selectedProduct?.images.map((images, index) => (
                <img
                  key={index}
                  src={images.url}
                  alt={images.alttext || `Thumbnail ${index}`}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                    mainImg === images.url
                      ? "border-1 border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImg(images.url)}
                />
              ))}
            </div>

            {/* right side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>

              <p className="text-lg text-gray-500 mb-1 line-through">
                {selectedProduct.originalPrice &&
                  ` ${selectedProduct.originalPrice}`}
              </p>
              <p className="text-xl text-gray-500 mb-2">
                {selectedProduct.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>

              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      onClick={() => setSelectedColor(color)}
                      key={color}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "border-4 border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded border ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handalQty("minus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handalQty("plus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handalAddToCart}
                disabled={isButtonDisabled}
                className={`w-full py-2 px-6 mb-4 bg-black text-white rounded uppercase${
                  isButtonDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </button>

              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand -</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material -</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
