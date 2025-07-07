import CryptoJS from "crypto-js";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import doctorHero from "../../assets/docDetail.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const generateEsewaSignature = ({ total_amount, transaction_uuid, product_code }) => {
  const signedFieldNames = "total_amount,transaction_uuid,product_code";
  const secret = "8gBm/:&EnhH.1/q"; // UAT secret
  const signatureString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const signature = CryptoJS.HmacSHA256(signatureString, secret).toString(CryptoJS.enc.Base64);
  return { signedFieldNames, signature };
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("Nepal");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const esewaFormRef = useRef(null);

  const navigate = useNavigate();
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
    const shipping = 120;
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

  const handleEsewaSubmit = (e) => {
    e.preventDefault();
    if (!address || !phone || !country) {
      alert("Please fill in all delivery fields.");
      return;
    }

    esewaFormRef.current?.submit();
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Hero Section */}
        <section
          className="w-full h-[350px] bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url(${doctorHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          <div className="text-center z-10">
            <h1 className="text-6xl font-bold text-white mb-4 tracking-wide drop-shadow-lg">My Cart</h1>
            <p className="text-xl text-white/90 font-light">Review and manage your selected items</p>
          </div>
        </section>

        {/* Cart Section */}
        <section className="px-4 md:px-8 lg:px-20 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
            {/* Left: Cart Items */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1d1d48] to-[#2d2d5a] p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                      <p className="text-white/80 mt-1">
                        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {cartItems.length > 0 ? (
                    <div className="space-y-8">
                      {cartItems.map(({ productId, name, price, quantity, image }) => (
                        <div
                          key={productId}
                          className="group bg-gray-50/50 hover:bg-gray-50 transition-all duration-300 p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg"
                        >
                          <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-40 h-40 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                              <img src={getImageUrl(image)} alt={name} className="w-full h-full object-contain p-4" />
                            </div>
                            <div className="flex-1 space-y-4">
                              <h3 className="text-xl font-bold text-[#1d1d48]">{name}</h3>
                              <div className="text-sm text-gray-500">
                                NPR {price.toLocaleString()} × {quantity}
                              </div>
                              <div className="text-2xl font-bold text-red-600">
                                NPR {(price * quantity).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button onClick={() => updateQuantity(productId, -1)}><Minus /></button>
                              <span>{quantity}</span>
                              <button onClick={() => updateQuantity(productId, 1)}><Plus /></button>
                              <button onClick={() => removeFromCart(productId)}><Trash2 /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Summary & Payment */}
            <div className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-[#1d1d48]">Order Summary</h2>

              <input type="text" placeholder="Delivery Address" className="w-full border border-gray-300 px-4 py-3 rounded-lg" value={address} onChange={(e) => setAddress(e.target.value)} />
              <input type="text" placeholder="Phone Number" className="w-full border border-gray-300 px-4 py-3 rounded-lg" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <select className="w-full border border-gray-300 px-4 py-3 rounded-lg" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option>Cash on Delivery</option>
                <option>eSewa</option>
              </select>

              <div className="text-sm space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>Rs. {totals.subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>Rs. {totals.shipping}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>Rs. {totals.tax.toFixed(0)}</span></div>
                <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span>Rs. {Math.round(totals.total).toLocaleString()}</span></div>
              </div>

              {/* Cash Option */}
              {paymentMethod === "Cash on Delivery" && (
                <button onClick={() => navigate("/checkout")} className="w-full bg-black text-white py-3 rounded-lg">Proceed to Checkout</button>
              )}

              {/* eSewa Form */}
              {paymentMethod === "eSewa" && cartItems.length > 0 && (() => {
                const transaction_uuid = uuidv4();
                const subtotal = Math.round(totals.subtotal);
                const delivery = Math.round(totals.shipping);
                const tax = Math.round(totals.tax);
                const total_amount = subtotal + delivery + tax;

                const { signedFieldNames, signature } = generateEsewaSignature({
                  total_amount,
                  transaction_uuid,
                  product_code: "EPAYTEST",
                });

                return (
                  <form ref={esewaFormRef} onSubmit={handleEsewaSubmit} action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                    <input type="hidden" name="amount" value={subtotal} />
                    <input type="hidden" name="tax_amount" value={tax} />
                    <input type="hidden" name="total_amount" value={total_amount} />
                    <input type="hidden" name="transaction_uuid" value={transaction_uuid} />
                    <input type="hidden" name="product_code" value="EPAYTEST" />
                    <input type="hidden" name="product_service_charge" value="0" />
                    <input type="hidden" name="product_delivery_charge" value={delivery} />
                    <input type="hidden" name="success_url" value="http://localhost:5173/paymentsuccess" />
                    <input type="hidden" name="failure_url" value="http://localhost:5173/paymentfailure" />
                    <input type="hidden" name="signed_field_names" value={signedFieldNames} />
                    <input type="hidden" name="signature" value={signature} />
                    <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg">Pay with eSewa</button>
                  </form>
                );
              })()}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
