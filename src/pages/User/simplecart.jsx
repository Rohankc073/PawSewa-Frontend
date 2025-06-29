import { useEffect, useState } from "react";

const SimpleCartTest = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user && token) {
      fetch(`http://localhost:5005/cart/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched cart:", data);
          setCartItems(data.items || []);
        })
        .catch((err) => console.error("Failed to fetch cart", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (!user) return <p>Please log in to view your cart.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User's Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product._id}>
              <strong>{item.product.name}</strong> — {item.product.manufacturer} — Rs. {item.product.price} × {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleCartTest;
