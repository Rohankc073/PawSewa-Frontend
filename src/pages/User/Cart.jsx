import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const heroImage = "/assets/hero-cart.jpg"; // ✅ Make sure this image exists in public/assets

  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        try {
          const res = await fetch(`http://localhost:5005/cart/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setCartItems(data.items || []);
        } catch (err) {
          console.error("Failed to load cart:", err);
        }
      }
      setLoading(false);
    };

    fetchCart();
  }, [user, token]);

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
    const shipping = 600;
    const tax = 0.13 * subtotal;
    const total = subtotal + shipping + tax;
    setTotals({ subtotal, shipping, tax, total });
  }, [cartItems]);

  const updateQuantity = async (productId, amount) => {
    const updated = cartItems.map(item =>
      item.product?._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCartItems(updated);
    await fetch("http://localhost:5005/cart/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        userId: user._id,
        productId,
        quantity: updated.find(i => i.product?._id === productId).quantity,
      }),
    });
  };

  const removeFromCart = async (productId) => {
    const filtered = cartItems.filter(item => item.product?._id !== productId);
    setCartItems(filtered);
    await fetch("http://localhost:5005/cart/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId: user._id, productId }),
    });
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
      <main className="pt-24">
        {/* Hero Section */}
        <section
          className="w-full h-[300px] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <h1 className="text-4xl font-bold text-[#1d1d48] bg-white/70 px-6 py-2 rounded-lg">My Cart</h1>
        </section>

        {/* Cart Content */}
        <section className="px-6 md:px-20 py-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          {/* Cart Items */}
          <div className="space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map(({ product, quantity }) =>
                product && (
                  <div
                    key={product._id}
                    className="border rounded-xl flex p-4 gap-4 items-center shadow-sm bg-white"
                  >
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-contain" />
                    <div className="flex-1 space-y-2">
                      <h2 className="font-semibold text-[#1d1d48]">{product.name}</h2>
                      <p className="text-sm text-gray-500">{product.manufacturer}</p>
                      <p className="text-red-600 font-bold">NPR {product.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(product._id, -1)} className="border rounded p-1">
                          <Minus size={16} />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => updateQuantity(product._id, 1)} className="border rounded p-1">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-600 text-center">Your cart is empty.</p>
            )}
          </div>

          {/* Order Summary */}
          <div className="border p-6 rounded-xl shadow-md bg-white h-fit">
            <h2 className="font-bold text-lg mb-4 border-b pb-2 text-[#1d1d48]">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Sub Total:</span>
                <span>Rs. {totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping estimate:</span>
                <span>Rs. {totals.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax estimate:</span>
                <span>Rs. {totals.tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg text-[#1d1d48]">
                <span>Order Total:</span>
                <span>Rs. {totals.total.toFixed(2)}</span>
              </div>
              <button className="mt-4 w-full bg-[#747134] text-white py-2 rounded-md font-medium hover:bg-[#5f5e2a]">
                Checkout
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
