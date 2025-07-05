import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ add this
import doctorHero from "../../assets/docDetail.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ initialize navigate
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const fetchCart = async () => {
      if (user && token) {
        try {
          const res = await fetch(`http://localhost:5005/cart/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const cartData = await res.json();

          const enrichedItems = [];
          for (const item of cartData.items || []) {
            await delay(100);
            enrichedItems.push({ ...item, image: item.image || "" });
          }

          setCartItems(enrichedItems);
        } catch (err) {
          console.error("Failed to load cart:", err);
        }
      }
      setLoading(false);
    };

    fetchCart();
  }, [user, token]);

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const shipping = 600;
    const tax = 0.13 * subtotal;
    const total = subtotal + shipping + tax;
    setTotals({ subtotal, shipping, tax, total });
  }, [cartItems]);

  const updateQuantity = async (productId, amount) => {
    const updated = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCartItems(updated);
    await fetch("http://localhost:5005/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user._id,
        productId,
        quantity: updated.find(i => i.productId === productId).quantity,
      }),
    });
  };

  const removeFromCart = async (productId) => {
    const filtered = cartItems.filter(item => item.productId !== productId);
    setCartItems(filtered);
    await fetch("http://localhost:5005/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: user._id, productId }),
    });
  };

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";
    return `http://localhost:5005/${image.replace(/\\/g, "/")}`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 text-center text-[#1d1d48]">Loading your cart...</main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="pt-24 text-center text-[#1d1d48] text-xl font-semibold">
          Please log in to view your cart.
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-50 min-h-screen">
        <section className="w-full h-[300px] bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: `url(${doctorHero})` }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <h1 className="text-5xl font-bold text-white z-10 tracking-wide">My Cart</h1>
        </section>

        <section className="px-4 md:px-8 lg:px-20 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-[#1d1d48] mb-6 border-b border-gray-200 pb-3">
                  Shopping Cart ({cartItems.length} items)
                </h2>

                {cartItems.length > 0 ? (
                  <div className="space-y-6">
                    {cartItems.map(({ productId, name, price, manufacturer, quantity, image }) => (
                      <div key={productId} className="group hover:bg-gray-50 transition p-4 rounded-lg border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-shrink-0">
                            <img
                              src={getImageUrl(image)}
                              alt={name}
                              className="w-32 h-32 object-contain bg-white rounded-lg border border-gray-200 shadow-sm"
                            />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-lg font-semibold text-[#1d1d48]">{name}</h3>
                              {manufacturer && (
                                <p className="text-gray-600 text-sm mt-1">by {manufacturer}</p>
                              )}
                            </div>
                            <div className="flex justify-between flex-wrap gap-4">
                              <div className="text-2xl font-bold text-red-600">
                                NPR {(price * quantity).toLocaleString()}
                                <span className="text-sm text-gray-500 ml-2">(NPR {price.toLocaleString()} each)</span>
                              </div>
                              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                                <button onClick={() => updateQuantity(productId, -1)} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white">
                                  <Minus size={14} className="text-gray-600" />
                                </button>
                                <span className="w-12 text-center font-semibold text-[#1d1d48]">{quantity}</span>
                                <button onClick={() => updateQuantity(productId, 1)} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white">
                                  <Plus size={14} className="text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(productId)} className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">Your cart is empty</div>
                )}
              </div>
            </div>

            <div className="lg:sticky lg:top-8 h-fit">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#1d1d48] to-[#2d2d5a] p-6">
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold text-[#1d1d48]">Rs. {totals.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-semibold text-[#1d1d48]">Rs. {totals.shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (13%):</span>
                      <span className="font-semibold text-[#1d1d48]">Rs. {totals.tax.toFixed(0)}</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between py-3 bg-gray-50 -mx-6 px-6 rounded-lg">
                      <span className="text-xl font-bold text-[#1d1d48]">Total:</span>
                      <span className="text-2xl font-bold text-red-600">Rs. {Math.round(totals.total).toLocaleString()}</span>
                    </div>
                  </div>

                  {cartItems.length > 0 && (
                    <button
                      onClick={() => navigate("/checkout")}
                      className="w-full bg-gradient-to-r from-[#747134] to-[#8a8543] text-white py-4 rounded-lg font-semibold text-lg hover:from-[#5f5e2a] hover:to-[#6d6b35] transition"
                    >
                      Proceed to Checkout
                    </button>
                  )}

                  <p className="text-xs text-gray-500 text-center mt-4">Secure checkout with 256-bit SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
