import axios from "axios";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/PawLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to check if current path matches the nav item
  const isActivePage = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

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

  // Navigation items array for cleaner code
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/product", label: "Products" },
    { path: "/appointment", label: "Appointment" },
    { path: "/adopt", label: "Adoption" },
    { path: "/contactus", label: "About Us" }
  ];

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-lg py-3 px-6 md:px-12 flex items-center justify-between text-[15px] border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center cursor-pointer hover:opacity-90 transition-opacity duration-200" onClick={() => navigate("/")}>
          <img src={logo} alt="PawSewa Logo" className="h-[78px] object-contain ml-8 drop-shadow-sm" />
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-10 font-medium text-[#1d1d48]">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`transition-colors duration-200 relative group ${
                isActivePage(item.path)
                  ? 'text-[#747134] font-semibold'
                  : 'hover:text-[#747134]'
              }`}
            >
              {item.label}
              {/* Active page indicator */}
              <span 
                className={`absolute bottom-0 left-0 h-0.5 bg-[#747134] transition-all duration-300 ${
                  isActivePage(item.path) 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}
              ></span>

            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Cart Button - Only when logged in */}
          {user && (
            <div 
              className={`relative cursor-pointer p-2 rounded-full transition-colors duration-200 ${
                isActivePage('/cart') 
                  ? 'bg-[#747134] bg-opacity-10 ring-2 ring-[#747134] ring-opacity-20' 
                  : 'hover:bg-gray-50'
              }`} 
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className={`w-7 h-7 ${
                isActivePage('/cart') ? 'text-[#747134]' : 'text-[#747134]'
              }`} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1e1e4b] text-white rounded-full text-xs px-2 py-0.5 min-w-[20px] text-center animate-pulse shadow-lg">
                  {cartCount}
                </span>
              )}
            </div>
          )}

          {/* Profile OR Auth Buttons */}
          {user ? (
            <div
              className={`flex items-center space-x-2 border rounded-full px-4 py-1 cursor-pointer transition-all duration-200 shadow-sm ${
                isActivePage('/profile')
                  ? 'border-[#747134] bg-[#747134] bg-opacity-5 ring-2 ring-[#747134] ring-opacity-20'
                  : 'border-[#747134] hover:bg-gray-50 hover:border-[#1d1d48]'
              }`}
              onClick={() => navigate("/profile")}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
              />
              <span className={`font-semibold ${
                isActivePage('/profile') ? 'text-[#1d1d48]' : 'text-[#747134]'
              }`}>
                {user.name}
              </span>
            </div>
          ) : (
            <>
              <button
                className="px-6 py-1.5 border border-[#b1b05e] text-[#b1b05e] rounded-md text-sm font-medium hover:bg-[#f8f8f1] transition-all duration-200 shadow-sm"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
              <button
                className="px-6 py-1.5 bg-[#747134] text-white rounded-md text-sm font-medium hover:bg-[#5f5e2a] transition-all duration-200 shadow-sm"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#1d1d48]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1d1d48]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[94px] left-0 w-full bg-white shadow-lg border-b border-gray-200 z-40">
          <nav className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`block py-2 font-medium transition-colors duration-200 relative ${
                  isActivePage(item.path)
                    ? 'text-[#747134] font-semibold bg-[#747134] bg-opacity-5 px-3 py-3 rounded-lg border-l-4 border-[#747134]'
                    : 'text-[#1d1d48] hover:text-[#747134] hover:bg-gray-50 px-3 py-3 rounded-lg'
                }`}
              >
                {item.label}
                {/* Active indicator for mobile */}
                {isActivePage(item.path) && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#747134] rounded-full"></span>
                )}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;