import logo from "../assets/PawLogo.png";

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm py-3 px-6 md:px-12 flex items-center justify-between  text-[15px]">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="PawSewa Logo" className="h-[75px] object-contain ml-8" />

      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center space-x-10 font-medium text-[#1d1d48]">
        <a href="#" className="hover:text-[#747134] transition-colors">Home</a>
        <a href="#" className="hover:text-[#747134] transition-colors">Products</a>
        <a href="#" className="hover:text-[#747134] transition-colors">Appointment</a>
        <a href="#" className="hover:text-[#747134] transition-colors">Adoption</a>
        <a href="#" className="hover:text-[#747134] transition-colors">About Us</a>
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <button className="px-6 py-1.5 border border-[#b1b05e] text-[#b1b05e] rounded-md text-sm font-medium hover:bg-[#f8f8f1]">
          Signup
        </button>
        <button className="px-6 py-1.5 bg-[#747134] text-white rounded-md text-sm font-medium hover:bg-[#5f5e2a]">
          Login
        </button>
      </div>
    </header>
  );
};

export default Navbar;
