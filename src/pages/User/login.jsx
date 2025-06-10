import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import bgIcons from "../../assets/icons.png";
import cat from "../../assets/midcat.png";
import Navbar from "../../components/navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-6 md:px-20 py-16 grid md:grid-cols-2 items-center gap-12 relative overflow-hidden">
        {/* Background paw icons */}
        <img
  src={bgIcons}
  alt="Background Icons"
  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-20"
/>


        <div className="relative w-full h-[520px] md:h-[540px] flex justify-center md:justify-start items-center">
  {/* Dog 1 - Top Left */}
  <img
    src={dog1}
    alt="Dog 1"
    className="absolute top-[30px] left-[0px] md:left-[20px] w-[100px] md:w-[120px] z-10"
  />

  {/* Cat - Center */}
  <img
    src={cat}
    alt="Cat"
    className="relative z-20 w-[250px] md:w-[280px] mt-[40px] ml-[20px]"
  />

  {/* Dog 2 - Right of Cat */}
  <img
    src={dog2}
    alt="Dog 2"
    className="absolute top-[100px] left-[180px] md:left-[230px] w-[100px] md:w-[120px] z-10"
  />
</div>



        {/* Login Form */}
        <div className="bg-white shadow-md rounded-xl p-10 max-w-md w-full border border-gray-200 z-20 relative">
          <h2 className="text-2xl font-bold mb-2 text-[#1d1d48]">Log In Here</h2>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            View all of your reports and scheduled health exams in one location.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Mobile / Email ID"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#747134]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#747134]"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                Don’t have an account?{" "}
                <a href="#" className="text-[#747134] font-medium">Register</a>
              </span>
              <a href="#" className="text-[#747134] font-medium">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#747134] text-white py-2 rounded-md font-medium hover:bg-[#5f5e2a] transition"
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
