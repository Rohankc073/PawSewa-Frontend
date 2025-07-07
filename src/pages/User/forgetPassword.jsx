import axios from "axios";
import { useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaEnvelope, FaLock } from "react-icons/fa";
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5005/auth/reset-password-request", {
        email,
      });

      toast.success("Reset link sent! Check your email.", {
        position: "top-right",
        autoClose: 3000,
      });
      setSent(true);
    } catch (err) {
      console.error("Reset error:", err);
      toast.error(err.response?.data?.message || "Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.history.back();
  };

  return (
    <>
      <Navbar />

      {/* Top Semicircle */}
      <div className="absolute -top-[50px] left-[200px] w-[220px] h-[120px] bg-[#e9e9d8] rounded-b-full z-[60] pointer-events-none" />

      <div className="h-screen bg-white px-6 md:px-20 py-16 grid md:grid-cols-2 items-start gap-12 relative overflow-hidden">
        {/* Paw Icons */}
        <img src={Group1} alt="Decorative Paw 1" className="absolute left-[1%] bottom-[2%] w-[1000px] opacity-60 z-0" />
        <img src={Group1} alt="Decorative Paw 1" className="absolute left-[20%] bottom-[15%] w-[900px] opacity-80 z-0" />
        <img src={Group2} alt="Decorative Paw 2" className="absolute top-[8%] right-[3%] w-[200px] opacity-100 z-0" />
        <img src={Group2} alt="Decorative Paw 2" className="absolute bottom-[10%] right-[10%] w-[200px] opacity-100 z-0" />
        <img src={Group2} alt="Decorative Paw 2" className="absolute bottom-[30%] right-[10%] w-[200px] opacity-100 z-0" />

        {/* Animal Section */}
        <div className="relative w-full h-[800px] z-10">
          <img src={dog1} alt="Dog 1" className="absolute left-[1%] top-[15%] w-[28%] h-auto object-cover rounded-[120px] shadow-md" />
          <img src={Group2} alt="Decorative Paw 2" className="absolute top-[50%] right-[80%] w-[200px] opacity-100 z-0" />
          <img src={cat} alt="Cat" className="absolute left-[26%] top-[32%] w-[50%] h-auto object-contain z-10" />
          <img src={Group2} alt="Decorative Paw" className="absolute left-[80%] top-[60%] w-[180px] opacity-100 z-0" />
          <img src={dog2} alt="Dog 2" className="absolute left-[75%] top-[10%] w-[28%] h-auto object-cover rounded-[120px] shadow-md" />
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white shadow-lg rounded-2xl px-10 pt-10 pb-12 max-w-md w-full border border-gray-100 z-20 relative translate-x-[30%] translate-y-[30%]">
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#e9e9d8] rounded-full blur-sm opacity-60"></div>
              <div className="relative rounded-full bg-[#e9e9d8] p-4 shadow-lg ring-1 ring-[#8b8a47] ring-opacity-20">
                {sent ? (
                  <FaCheckCircle className="h-8 w-8 text-[#8b8a47] animate-pulse" />
                ) : (
                  <FaLock className="h-8 w-8 text-[#8b8a47]" />
                )}
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-black">
              {sent ? "Check Your Email" : "Forgot Password?"}
            </h2>
            <p className="text-[14px] text-[#8b8a47] leading-snug">
              {sent 
                ? `We've sent password reset instructions to ${email}. Please check your inbox and follow the link.`
                : "Don't worry! Enter your email address and we'll send you instructions to reset your password."
              }
            </p>
          </div>

          {!sent ? (
            <form className="space-y-6 text-[14px]" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4 text-[#8b8a47]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full border-[1px] border-[#1e1e4b] rounded-xl pl-12 pr-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#8b8a47] focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8b8a47] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#6d6a35] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Reset Link...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full flex justify-center items-center py-3 px-4 border border-[#8b8a47] rounded-xl text-[#8b8a47] font-semibold hover:bg-[#8b8a47] hover:text-white transition-all duration-200"
                >
                  <FaArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 text-[14px]">
              <div className="bg-[#e9e9d8] bg-opacity-50 border border-[#8b8a47] border-opacity-30 rounded-xl p-4">
                <p className="text-[#1e1e4b] text-sm text-center">
                  <span className="font-semibold">Email sent successfully!</span><br/>
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  className="w-full border border-[#8b8a47] text-[#8b8a47] py-3 rounded-xl font-semibold hover:bg-[#8b8a47] hover:text-white transition-all duration-200"
                >
                  Try Different Email
                </button>
                
                <button
                  onClick={handleBackToLogin}
                  className="w-full flex justify-center items-center bg-[#8b8a47] text-white py-3 rounded-xl font-semibold hover:bg-[#6d6a35] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FaArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Additional Help Section */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#8b8a47]">
              Still having trouble?{' '}
              <a href="#" className="font-semibold text-[#1e1e4b] hover:text-[#8b8a47] transition-colors duration-200 underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ForgotPassword;