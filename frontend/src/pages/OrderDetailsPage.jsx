import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);
  useEffect(() => {
    console.log("Dispatching fetchOrderDetails...");
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order Details Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p
                className="
              text-gray-600"
              >
                {new Date(orderDetails.creatAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "text-green-500 bg-green-100"
                    : "text-red-700 bg-red-200"
                } px-3 py-1 rounded-full   text-sm font-semibold mb-2 `}
              >
                {orderDetails.isPaid ? "Approved" : "pending"}
              </span>

              <span
                className={`${
                  orderDetails.isDelivered
                    ? "text-green-500 bg-green-100"
                    : "text-yellow-700 bg-yellow-100"
                } px-3 py-1 rounded-full   text-sm font-semibold mb-2 `}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  mb-8 ">
            <div>
              <h4 className="text-lg font-sans mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>

            <div>
              <h4 className="text-lg font-sans mb-2">Sgipping Info</h4>
              <p>Spping Method: {orderDetails.shippingMethod}</p>
              <p>
                Address: {""}
                {`${orderDetails.shippingAddress.city},${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((items) => (
                  <tr key={items.productId} className="border-b text-center">
                    <td className="py-2 px-4 flex items-center ">
                      <img
                        src={items.image}
                        alt={items.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${items.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {items.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">{items.price.toFixed(2)}</td>
                    <td className="py-2 px-4">{items.quantity}</td>
                    <td className="py-2 px-4">
                      {items.price * items.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/my-order" className="text-blue-500 hover:underline">
            Back to my order
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
