import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/PawLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Function to fetch cart count
  const fetchCartCount = async (userId) => {
    if (!userId) return;
    
    try {
      const res = await axios.get(`http://localhost:5005/cart/${userId}`);
      setCartCount(res.data.items?.length || 0);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartCount(0);
    }
  };

  // Initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchCartCount(parsedUser._id);
    }
  }, []);

  // Update cart count when route changes (detects navigation)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchCartCount(parsedUser._id);
    }
  }, [location.pathname]); // Runs when user navigates to different pages

  // Poll for cart updates every 5 seconds when user is active
  useEffect(() => {
    if (!user?._id) return;

    const interval = setInterval(() => {
      // Only fetch if the tab is visible (user is active)
      if (!document.hidden) {
        fetchCartCount(user._id);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [user]);

  // Listen for custom events from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      if (user?._id) {
        fetchCartCount(user._id);
      }
    };

    // Listen for custom cart update events
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Listen for storage changes (in case cart is updated in another tab)
    window.addEventListener('storage', (e) => {
      if (e.key === 'cartUpdated') {
        handleCartUpdate();
      }
    });

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [user]);

  // Listen for focus events (when user returns to tab)
  useEffect(() => {
    const handleFocus = () => {
      if (user?._id) {
        fetchCartCount(user._id);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm py-3 px-6 md:px-12 flex items-center justify-between text-[15px]">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="PawSewa Logo" className="h-[78px] object-contain ml-8" />
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center space-x-10 font-medium text-[#1d1d48]">
        <a href="/" className="hover:text-[#747134] transition-colors">Home</a>
        <a href="/product" className="hover:text-[#747134] transition-colors">Products</a>
        <a href="/appointment" className="hover:text-[#747134] transition-colors">Appointment</a>
        <a href="adopt" className="hover:text-[#747134] transition-colors">Adoption</a>
        <a href="/contactus" className="hover:text-[#747134] transition-colors">About Us</a>
      </nav>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Cart Button - Only when logged in */}
        {user && (
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart className="w-7 h-7 text-[#747134]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#1e1e4b] text-white rounded-full text-xs px-2 py-0.5 min-w-[20px] text-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
        )}

        {/* Profile OR Auth Buttons */}
        {user ? (
          <div
            className="flex items-center space-x-2 border border-[#747134] rounded-full px-4 py-1 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-[#747134] font-semibold">{user.name}</span>
          </div>
        ) : (
          <>
            <button
              className="px-6 py-1.5 border border-[#b1b05e] text-[#b1b05e] rounded-md text-sm font-medium hover:bg-[#f8f8f1]"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
            <button
              className="px-6 py-1.5 bg-[#747134] text-white rounded-md text-sm font-medium hover:bg-[#5f5e2a]"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;