import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5005/order/user/${user._id}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-28 pb-16 px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1d1d48] mb-4">My Orders</h1>
          <p className="text-gray-600 text-lg">Track and manage your pet care orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d48] mb-2">No Orders Yet</h3>
              <p className="text-gray-600">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div key={index} className="bg-white shadow-xl rounded-2xl overflow-hidden border-l-4 border-[#1d1d48] hover:shadow-2xl transition-all duration-300">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-[#1d1d48] to-[#2d2d58] text-white p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold">Order #{order._id.slice(-8)}</h2>
                      <p className="text-gray-200 text-sm">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <div className="text-right">
                        <p className="text-2xl font-bold">Rs {order.totalAmount}</p>
                        <p className="text-gray-200 text-sm">Total Amount</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Delivery Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-[#1d1d48] mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Delivery Information
                      </h3>
                      <p className="text-gray-700 mb-2">
                        <span className="font-medium">Location:</span> {order.location}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Phone:</span> {order.phone}
                      </p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-[#1d1d48] mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Order Summary
                      </h3>
                      <p className="text-gray-700 mb-2">
                        <span className="font-medium">Items:</span> {order.items.length} product{order.items.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Products Section */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-[#1d1d48] mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Products Ordered
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              <img
                                src={item.productId?.image ? `http://localhost:5005/${item.productId.image.replace(/\\/g, "/")}` : "/placeholder.png"}
                                alt={item.name}
                                className="w-20 h-20 object-contain border rounded-lg shadow-sm"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-[#1d1d48] mb-1">{item.name}</h4>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                  Rs {item.price}
                                </span>
                                <span className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                  </svg>
                                  Qty: {item.quantity}
                                </span>
                                <span className="flex items-center font-medium text-[#1d1d48]">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                  Subtotal: Rs {item.price * item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Order ID: {order._id}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {order.items.reduce((total, item) => total + item.quantity, 0)} items
                      </span>
                      <span className="text-lg font-bold text-[#1d1d48]">
                        Total: Rs {order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;