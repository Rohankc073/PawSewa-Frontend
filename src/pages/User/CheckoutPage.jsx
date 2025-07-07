import {
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  ShoppingBag,
  Truck,
  User
} from "lucide-react";
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    
    if (form.paymentMethod === "eSewa") {
      navigate("/esewa-payment", {
        state: { ...form, cartItems, totalAmount: totals.total },
      });
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";
    return `http://localhost:5005/${image.replace(/\\/g, "/")}`;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-4 sm:px-6 lg:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 mt-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1d1d48] to-[#2d2d5a] rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-[#1d1d48]">Checkout</h1>
            </div>
            <p className="text-gray-600 text-lg">Complete your order details below</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#747134] rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <span className="ml-3 text-sm font-medium text-[#1d1d48]">Delivery Info</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#747134] rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <span className="ml-3 text-sm font-medium text-[#1d1d48]">Review Order</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">
                  3
                </div>
                <span className="ml-3 text-sm font-medium text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
            {/* Form Section */}
            <div className="space-y-8">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#1d1d48] to-[#2d2d5a] p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Delivery Information</h2>
                      <p className="text-white/80 mt-1">Please provide your delivery details</p>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8 space-y-8">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin className="w-4 h-4" />
                      Delivery Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="Enter your complete address"
                      value={form.location}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                    />
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MessageSquare className="w-4 h-4" />
                      Additional Instructions
                    </label>
                    <textarea
                      name="additionalInfo"
                      rows="4"
                      placeholder="Any special delivery instructions..."
                      value={form.additionalInfo}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent bg-gray-50 focus:bg-white resize-none transition-all duration-200"
                    ></textarea>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <CreditCard className="w-4 h-4" />
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={form.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#747134] focus:border-transparent text-lg"
                    >
                      <option value="Cash">Cash on Delivery</option>
                      <option value="eSewa">eSewa</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#747134] to-[#8a8543] text-white py-5 px-6 rounded-xl hover:from-[#5a5628] hover:to-[#6d6b35] transform hover:scale-[1.02] transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </form>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1d1d48]">Secure Checkout</h3>
                      <p className="text-sm text-gray-500">SSL encrypted</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1d1d48]">Fast Delivery</h3>
                      <p className="text-sm text-gray-500">2-3 business days</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1d1d48]">24/7 Support</h3>
                      <p className="text-sm text-gray-500">Always available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-8 h-fit">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Summary Header */}
                <div className="bg-gradient-to-r from-[#1d1d48] to-[#2d2d5a] p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                      <p className="text-white/80 mt-1">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your order
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-8">
                  {cartItems.length > 0 ? (
                    <div className="space-y-4 mb-8 max-h-80 overflow-y-auto">
                      {cartItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex-shrink-0 overflow-hidden">
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-[#1d1d48] truncate">{item.name}</h4>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#1d1d48]">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Subtotal</span>
                      <span className="font-semibold text-[#1d1d48]">Rs. {totals.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Shipping</span>
                      <span className="font-semibold text-[#1d1d48]">Rs. {totals.shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Tax (13%)</span>
                      <span className="font-semibold text-[#1d1d48]">Rs. {totals.tax.toFixed(0)}</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 -mx-8 px-8 py-6 rounded-2xl">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-[#1d1d48]">Total Amount</span>
                        <span className="text-2xl font-bold text-red-600">
                          Rs. {totals.total.toFixed(0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Secure Checkout</p>
                        <p className="text-sm text-green-600">Your order and payment are protected</p>
                      </div>
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