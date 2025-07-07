import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../apis/api";

import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import Group2 from "../../assets/Group.png";
import Group1 from "../../assets/group1.png";
import cat from "../../assets/midcat.png";
import Navbar from "../../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(form);

      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        // localStorage.setItem("cart", JSON.stringify(response.cart));

        toast.success("Login successful 🎉");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error("Login failed. Try again.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login error";
      toast.error(errorMessage);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        setErrors({ email: "Invalid credentials", password: "Invalid credentials" });
      } else if (err.response?.status === 404) {
        setErrors({ email: "Account not found", password: "" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Enhanced Top Semicircle with gradient */}
      <div className="absolute -top-[50px] left-[200px] w-[220px] h-[120px] bg-gradient-to-b from-[#f0f0e8] to-[#e9e9d8] rounded-b-full z-[60] pointer-events-none shadow-sm" />

      <div className="min-h-screen bg-gradient-to-br from-[#fefefe] via-white to-[#f9f9f6] px-6 md:px-20 py-16 grid md:grid-cols-2 items-center gap-12 relative overflow-hidden">
        
        {/* Refined Paw Icons with better opacity and positioning */}
        <img src={Group1} alt="Decorative Paw 1" className="absolute left-[1%] bottom-[2%] w-[900px] opacity-40 z-0" />
        <img src={Group1} alt="Decorative Paw 1" className="absolute left-[18%] bottom-[12%] w-[800px] opacity-50 z-0" />
        <img src={Group2} alt="Decorative Paw 2" className="absolute top-[8%] right-[3%] w-[180px] opacity-60 z-0" />
        <img src={Group2} alt="Decorative Paw 2" className="absolute bottom-[10%] right-[10%] w-[160px] opacity-70 z-0" />
        <img src={Group2} alt="Decorative Paw 2" className="absolute bottom-[30%] right-[12%] w-[140px] opacity-60 z-0" />

        {/* Enhanced Animal Section */}
        <div className="relative w-full h-[700px] z-10 flex items-center justify-center">
          <img 
            src={dog1} 
            alt="Dog 1" 
            className="absolute left-[1%] top-[15%] w-[28%] h-auto object-cover rounded-[120px] shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300" 
          />
          <img 
            src={Group2} 
            alt="Decorative Paw 2" 
            className="absolute top-[50%] right-[80%] w-[180px] opacity-70 z-0" 
          />
          <img 
            src={cat} 
            alt="Cat" 
            className="absolute left-[26%] top-[32%] w-[50%] h-auto object-contain z-10 drop-shadow-lg" 
          />
          <img 
            src={Group2} 
            alt="Decorative Paw" 
            className="absolute left-[80%] top-[60%] w-[160px] opacity-70 z-0" 
          />
          <img 
            src={dog2} 
            alt="Dog 2" 
            className="absolute left-[75%] top-[10%] w-[28%] h-auto object-cover rounded-[120px] shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* Enhanced Login Form */}
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl px-12 pt-12 pb-14 max-w-md w-full border border-gray-100/50 z-20 relative translate-x-[30%] translate-y-[8%] hover:shadow-3xl transition-all duration-300">
          
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 text-[#1e1e4b] leading-tight">
              Welcome Back
            </h2>
            <p className="text-[15px] text-[#8b8a47] leading-relaxed font-medium">
              Access your pet's health reports and scheduled exams
            </p>
          </div>

          <form className="space-y-7" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative">
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full border-2 rounded-2xl px-6 py-4 text-base focus:outline-none transition-all duration-200 bg-white/80 hover:bg-white placeholder-gray-500 ${
                  errors.email 
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400/50 focus:border-red-400' 
                    : 'border-[#e5e5e5] focus:ring-2 focus:ring-[#8b8a47]/50 focus:border-[#8b8a47]'
                }`}
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full border-2 rounded-2xl px-6 py-4 pr-14 text-base focus:outline-none transition-all duration-200 bg-white/80 hover:bg-white placeholder-gray-500 ${
                  errors.password 
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400/50 focus:border-red-400' 
                    : 'border-[#e5e5e5] focus:ring-2 focus:ring-[#8b8a47]/50 focus:border-[#8b8a47]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl hover:text-[#8b8a47] transition-colors duration-200"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#8b8a47] to-[#9a9955] text-white hover:from-[#6d6a35] hover:to-[#7a7742] hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Links Section */}
            <div className="flex flex-col text-center space-y-3 pt-4">
              <span className="text-[#6b7280] text-sm">
                Don't have an account?{" "}
                <a 
                  href="/signup" 
                  className="text-[#8b8a47] font-semibold hover:text-[#6d6a35] transition-colors duration-200 hover:underline"
                >
                  Create Account
                </a>
              </span>
              <a 
                href="/forget-password" 
                className="text-[#8b8a47] font-semibold hover:text-[#6d6a35] transition-colors duration-200 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;