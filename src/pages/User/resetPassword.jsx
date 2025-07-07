import axios from "axios";
import { useState } from "react";
import { FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaPaw, FaShieldAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

// Import the same assets as login page
import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import Group2 from "../../assets/Group.png";
import Group1 from "../../assets/group1.png";
import cat from "../../assets/midcat.png";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5005/auth/reset-password", {
        token,
        newPassword,
      });

      toast.success("Password reset successfully! Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });

      setSuccess(true);
      localStorage.removeItem("token");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password.", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      {/* Top Semicircle with gradient */}
      <div className="absolute -top-[50px] left-[200px] w-[220px] h-[120px] bg-gradient-to-b from-[#8b8a47] to-[#e9e9d8] rounded-b-full z-[60] pointer-events-none opacity-80" />

      <div className="min-h-screen bg-gradient-to-br from-white via-[#fafaf8] to-[#f5f5f0] px-6 md:px-20 py-16 grid md:grid-cols-2 items-center gap-12 relative overflow-hidden">
        
        {/* Enhanced Paw Icons with animations */}
        <img src={Group1} alt="Decorative Paw 1" className="absolute left-[1%] bottom-[2%] w-[1000px] opacity-40 z-0 animate-pulse" />
        <img src={Group1} alt="Decorative Paw 1" className="absolute left-[20%] bottom-[15%] w-[900px] opacity-60 z-0" />
        <img src={Group2} alt="Decorative Paw 2" className="absolute top-[8%] right-[3%] w-[200px] opacity-80 z-0 animate-bounce" style={{animationDuration: '3s'}} />
        <img src={Group2} alt="Decorative Paw 2" className="absolute bottom-[10%] right-[10%] w-[200px] opacity-80 z-0" />
        <img src={Group2} alt="Decorative Paw 2" className="absolute bottom-[30%] right-[10%] w-[200px] opacity-80 z-0" />

        {/* Enhanced Animal Section with better positioning */}
        <div className="relative w-full h-[800px] z-10">
          {/* Floating decorative elements */}
          <div className="absolute left-[10%] top-[5%] w-16 h-16 bg-[#8b8a47] rounded-full opacity-20 animate-float"></div>
          <div className="absolute right-[15%] top-[25%] w-12 h-12 bg-[#e9e9d8] rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute left-[70%] bottom-[20%] w-8 h-8 bg-[#8b8a47] rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
          
          <img src={dog1} alt="Dog 1" className="absolute left-[1%] top-[15%] w-[28%] h-auto object-cover rounded-[120px] shadow-2xl transform hover:scale-105 transition-transform duration-300" />
          <img src={Group2} alt="Decorative Paw 2" className="absolute top-[50%] right-[80%] w-[200px] opacity-70 z-0 animate-spin" style={{animationDuration: '20s'}} />
          <img src={cat} alt="Cat" className="absolute left-[26%] top-[32%] w-[50%] h-auto object-contain z-10 transform hover:scale-110 transition-transform duration-300" />
          <img src={Group2} alt="Decorative Paw" className="absolute left-[80%] top-[60%] w-[180px] opacity-70 z-0" />
          <img src={dog2} alt="Dog 2" className="absolute left-[75%] top-[10%] w-[28%] h-auto object-cover rounded-[120px] shadow-2xl transform hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Enhanced Reset Password Form */}
        <div className="bg-white shadow-2xl rounded-3xl px-12 pt-12 pb-14 max-w-lg w-full border border-[#e9e9d8] z-20 relative translate-x-[20%] translate-y-[3%] backdrop-blur-sm">
          
          {/* Decorative header section */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-[#8b8a47] to-[#a8a658] rounded-full p-4 shadow-lg">
              {success ? (
                <FaCheckCircle className="h-8 w-8 text-white animate-bounce" />
              ) : (
                <FaShieldAlt className="h-8 w-8 text-white" />
              )}
            </div>
          </div>

          {/* Header with enhanced styling */}
          <div className="text-center mb-10 mt-6">
            <h2 className="text-4xl font-bold mb-4 text-[#1e1e4b] bg-gradient-to-r from-[#1e1e4b] to-[#8b8a47] bg-clip-text text-transparent">
              {success ? "Password Reset!" : "Reset Password"}
            </h2>
            <p className="text-[15px] text-[#8b8a47] leading-relaxed max-w-sm mx-auto">
              {success 
                ? "Your password has been successfully reset. You'll be redirected to login shortly."
                : "Enter your new password below to secure your account."
              }
            </p>
          </div>

          {!success ? (
            <form className="space-y-8 text-[15px]" onSubmit={handleSubmit}>
              {/* Enhanced password input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-[#8b8a47] group-focus-within:text-[#1e1e4b] transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  className="w-full border-2 border-[#e9e9d8] rounded-2xl pl-14 pr-14 py-4 text-base focus:outline-none focus:ring-4 focus:ring-[#8b8a47] focus:ring-opacity-20 focus:border-[#8b8a47] transition-all duration-200 bg-gradient-to-r from-white to-[#fafaf8] hover:shadow-md"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-[#8b8a47] hover:text-[#1e1e4b] transition-colors duration-200"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password strength indicator */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${newPassword.length >= 8 ? 'bg-[#8b8a47]' : 'bg-gray-300'}`}></div>
                  <span className={`${newPassword.length >= 8 ? 'text-[#8b8a47]' : 'text-gray-500'}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-[#8b8a47]' : 'bg-gray-300'}`}></div>
                  <span className={`${/[A-Z]/.test(newPassword) ? 'text-[#8b8a47]' : 'text-gray-500'}`}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-[#8b8a47]' : 'bg-gray-300'}`}></div>
                  <span className={`${/[0-9]/.test(newPassword) ? 'text-[#8b8a47]' : 'text-gray-500'}`}>
                    One number
                  </span>
                </div>
              </div>

              {/* Enhanced submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#8b8a47] to-[#a8a658] text-white py-4 rounded-2xl font-bold text-lg hover:from-[#6d6a35] hover:to-[#8b8a47] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {loading ? (
                  <div className="flex items-center justify-center relative z-10">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span className="animate-pulse">Resetting Password...</span>
                  </div>
                ) : (
                  <span className="relative z-10 flex items-center justify-center">
                    <FaPaw className="mr-2 animate-pulse" />
                    Reset Password
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-8 text-[15px]">
              {/* Enhanced success message */}
              <div className="bg-gradient-to-r from-[#e9e9d8] to-[#f5f5f0] border-2 border-[#8b8a47] border-opacity-30 rounded-2xl p-6 shadow-inner">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-[#8b8a47] rounded-full p-3">
                    <FaCheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-[#1e1e4b] text-center font-semibold mb-2">
                  Password Reset Successful!
                </p>
                <p className="text-[#8b8a47] text-center text-sm">
                  Your password has been updated. Redirecting to login...
                </p>
              </div>
              
              {/* Countdown or manual redirect */}
              <div className="text-center">
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#8b8a47] font-bold hover:text-[#1e1e4b] transition-colors duration-200 underline decoration-2 underline-offset-2"
                >
                  Go to Login Now
                </button>
              </div>
            </div>
          )}

          {/* Enhanced security note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#8b8a47] flex items-center justify-center">
              <FaShieldAlt className="mr-2" />
              Your account is protected and secure
            </p>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#8b8a47] rounded-full opacity-20"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#e9e9d8] rounded-full opacity-40"></div>
        </div>
      </div>
      
      <Footer />

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ResetPassword;