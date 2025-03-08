import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartproduct = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 2,
      size: "m",
      color: "red",
      image: "https://picsum.photos/200?random=1",
    },
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 2,
      size: "m",
      color: "red",
      image: "https://picsum.photos/200?random=1",
    },
  ];
  return (
    <div>
      {cartproduct.map((product, index) => (
        <div className="flex items-start justify-between py-4" key={index}>
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-black">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="cursor-pointer border-white rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="cursor-pointer border-white rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <p>${product.price.toLocaleString()}</p>
            <button className="cursor-pointer">
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
