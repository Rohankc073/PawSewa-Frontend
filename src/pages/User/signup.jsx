import { useState } from "react";
import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import Group2 from "../../assets/Group.png";
import Group1 from "../../assets/group1.png";
import cat from "../../assets/midcat.png";
import Navbar from "../../components/navbar";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Navbar />
      
      {/* Top Semicircle */}
      <div className="absolute -top-[50px] left-[200px] w-[220px] h-[120px] bg-[#e9e9d8] rounded-b-full z-[60] pointer-events-none" />

      <div className="h-screen bg-white px-6 md:px-20 py-16 grid md:grid-cols-2 items-start gap-12 relative overflow-hidden">
        
        {/* Decorative Paw Icons */}
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

        {/* Bottom Left Circle */}
        <div className="absolute bottom-0 left-0 w-[220px] h-[220px] bg-[#e9e9d8] rounded-full z-0 translate-x-[-30%] translate-y-[25%]" />

        {/* Login Form */}
        <div className="bg-white shadow-lg rounded-2xl px-10 pt-10 pb-12 max-w-md w-full border border-gray-100 z-20 relative translate-x-[30%] translate-y-[30%]">
          <h2 className="text-3xl font-bold mb-2 text-black">Log In Here</h2>
          <p className="text-[14px] text-[#8b8a47] mb-8 leading-snug">
            View all of your reports and scheduled health exams in one location.
          </p>

          <form className="space-y-6 text-[14px]">
            <div>
              <input
                type="text"
                placeholder="Mobile / Email ID"
                className="w-full border-[1px] border-[#1e1e4b] rounded-xl px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#8b8a47] focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border-[1px] border-[#1e1e4b] rounded-xl px-5 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-[#8b8a47] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "🐶" : "🐾"}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm text-[#1e1e4b]">
              <span>
                Do not have an account?{" "}
                <a href="#" className="text-[#8b8a47] font hover:text-[#6d6a35]">
                  Register
                </a>
              </span>
              <a href="#" className="text-[#8b8a47] font hover:text-[#6d6a35]">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-[130px] bg-[#8b8a47] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#6d6a35] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
