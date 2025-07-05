import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    phone: "",
    location: "",
    additionalInfo: "",
    paymentMethod: "Cash",
  });
  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 600,
    tax: 0,
    total: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:5005/cart/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [user, token]);

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.13;
    const total = subtotal + totals.shipping + tax;
    setTotals((prev) => ({ ...prev, subtotal, tax, total }));
  }, [cartItems]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.paymentMethod === "eSewa") {
      navigate("/esewa-payment", {
        state: { ...form, cartItems, totalAmount: totals.total },
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5005/order/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          items: cartItems,
          ...form,
          totalAmount: totals.total,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Order placed successfully!");
        navigate("/");
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-4 sm:px-6 lg:px-20 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[#1d1d48] mb-2">Checkout</h2>
            <p className="text-gray-600">Complete your order details below</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-[#747134] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1d1d48]">
                    Delivery Information
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#747134] focus:border-transparent bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="Enter your complete address"
                      value={form.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#747134] focus:border-transparent bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Instructions
                    </label>
                    <textarea
                      name="additionalInfo"
                      rows="4"
                      placeholder="Any special delivery instructions..."
                      value={form.additionalInfo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#747134] focus:border-transparent bg-gray-50 focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={form.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#747134] focus:border-transparent"
                    >
                      <option value="Cash">Cash</option>
                      <option value="eSewa">eSewa</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-[#747134] text-white py-4 px-6 rounded-lg hover:bg-[#5a5628] transform hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg"
                >
                  Place Order
                </button>
              </form>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl sticky top-28">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-[#747134] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1d1d48]">Order Summary</h3>
                </div>

                {cartItems.length > 0 ? (
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium">{item.name}</span>
                          <span className="text-sm text-gray-500 ml-2">× {item.quantity}</span>
                        </div>
                        <span className="text-gray-800 font-semibold">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Your cart is empty</p>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {totals.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Rs. {totals.shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (13%)</span>
                    <span>Rs. {totals.tax.toFixed(0).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-[#1d1d48]">
                      <span>Total Amount</span>
                      <span className="text-red-600">
                        Rs. {totals.total.toFixed(0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Secure Checkout</p>
                      <p className="text-xs text-green-600">Your order is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
