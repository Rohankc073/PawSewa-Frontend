import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for redirect
import { toast } from "react-toastify"; // ✅ for toast
import { registerUser } from "../../apis/api"; // ✅ your API

import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import Group2 from "../../assets/Group.png";
import Group1 from "../../assets/group1.png";
import cat from "../../assets/midcat.png";
import Navbar from "../../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const response = await registerUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    if (response?.token) {
      localStorage.setItem("token", response.token);
      toast.success("Signup successful 🎉");
      setTimeout(() => navigate("/"), 2000);
    } else {
      toast.error("Signup failed: No token received.");
    }
  } catch (err) {
    const message =
      err.response?.data?.message || "Signup failed. Please try again.";
    toast.error(message);
  }
};


  return (
    <>
      <Navbar />

      <div className="absolute -top-[50px] left-[200px] w-[220px] h-[120px] bg-[#e9e9d8] rounded-b-full z-[60] pointer-events-none" />

      <div className="min-h-screen bg-white px-6 md:px-20 py-16 grid md:grid-cols-2 items-start gap-12 relative overflow-hidden">
        {/* Background Paw Icons */}
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

        {/* Signup Form */}
        <div className="bg-white shadow-lg rounded-2xl px-10 pt-10 pb-12 max-w-md w-full border border-gray-100 z-20 relative translate-x-[30%] translate-y-[10%]">
          <h2 className="text-3xl font-bold mb-2 text-black">Sign Up Here</h2>
          <p className="text-[14px] text-[#8b8a47] mb-8 leading-snug">
            View all of your reports and scheduled health exams in one location.
          </p>

          <form onSubmit={handleSignup} className="space-y-6 text-[14px]">
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-[#1e1e4b] rounded-xl px-5 py-3"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-[#1e1e4b] rounded-xl px-5 py-3"
            />

            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-[#1e1e4b] rounded-xl px-5 py-3"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-[#1e1e4b] rounded-xl px-5 py-3 pr-12"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {showPassword ? "🐶" : "🐾"}
              </button>
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border border-[#1e1e4b] rounded-xl px-5 py-3 pr-12"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {showConfirm ? "🐶" : "🐾"}
              </button>
            </div>

            <div className="text-sm text-[#1e1e4b]">
              Already have an account?{" "}
              <a href="/login" className="text-[#8b8a47] hover:text-[#6d6a35] font-semibold">
                Log In
              </a>
            </div>

            <button
              type="submit"
              className="w-[130px] bg-[#8b8a47] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#6d6a35] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
