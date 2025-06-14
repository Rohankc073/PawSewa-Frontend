import { useState } from "react";
import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import Group2 from "../../assets/Group.png";
import Group1 from "../../assets/group1.png";
import cat from "../../assets/midcat.png";
import Navbar from "../../components/navbar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Navbar />
      <div className="h-screen bg-white px-6 md:px-20 py-16 grid md:grid-cols-2 items-start gap-12 relative overflow-hidden">

        
        {/* Background paw icons */}
      {/* Decorative Paw Icons */}
<img
  src={Group1}
  alt="Decorative Paw 1"
  className="absolute left-[1%] bottom-[2%] w-[1000px] opacity-60 z-0"
/>
<img
  src={Group1}
  alt="Decorative Paw 1"
  className="absolute left-[20%] bottom-[15%] w-[900px] opacity-80 z-0"
/>
<img
  src={Group2}
  alt="Decorative Paw 2"
  className="absolute top-[8%] right-[3%] w-[200px] opacity-100 z-0"
/>


<img
  src={Group2}
  alt="Decorative Paw 2"
  className="absolute bottom-[10%] right-[10%] w-[200px] opacity-100 z-0"
/>


<img
  src={Group2}
  alt="Decorative Paw 2"
  className="absolute bottom-[30%] right-[10%] w-[200px] opacity-100 z-0"
/>


        {/* Animal Section Responsive */}
<div className="relative w-full h-[800px] z-10">
  {/* Dog 1 (Left) */}
  <img
  src={dog1}
  alt="Dog 1"
  className="absolute left-[1%] top-[15%] w-[28%] h-auto object-cover rounded-[120px] shadow-md"
/>

<img
  src={Group2}
  alt="Decorative Paw 2"
  className="absolute top-[50%] right-[80%] w-[200px] opacity-100 z-0"
/>


 {/* Cat (Middle) */}
<img
  src={cat}
  alt="Cat"
  className="absolute left-[26%] top-[32%] w-[50%] h-auto object-contain z-10"
/>

<img
  src={Group2}
  alt="Decorative Paw"
  className="absolute left-[80%] top-[60%] w-[180px] opacity-100 z-0"
/>

  {/* Dog 2 (Right) */}
  <img
    src={dog2}
    alt="Dog 2"
    className="absolute left-[75%] top-[10%] w-[28%] h-auto object-cover rounded-[120px] shadow-md"
  />
</div>

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
        className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
      >
        {showPassword ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
          </svg>
        )}
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

export default Login;
