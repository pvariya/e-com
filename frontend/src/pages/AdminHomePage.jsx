import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const order = [
    {
      _id: 123,
      user: {
        name: "purv variya",
      },
      totalPrice: 100,
      status: "processing",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin DashBoard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$1000</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">200</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Manage Orders
          </Link>
        </div>

        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">100</p>
          <Link to="/admin/producs" className="text-blue-500 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                    <th className="py-3 px-4">Order Id</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Total Price</th>
                    <th className="py-3 px-4">Status</th>
                </tr>
            </thead>
            <tbody>
                {order.length > 0 ? (order.map((order)=>(
                    <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                       <td className="py-3 px-4">{order._id}</td>
                        <td className="py-3 px-4">{order.user.name}</td>
                        <td className="py-3 px-4">{order.totalPrice}</td>
                        <td className="py-3 px-4">{order.status}</td>
                    </tr>
                ))):(
                    <tr colSpan={4} className="p-4 text-center text-gray-500">No Recent Order found</tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
