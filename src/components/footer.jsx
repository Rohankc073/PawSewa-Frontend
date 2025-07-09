import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import logo from "../assets/PawLogo.png";
import ScrollToTopButton from "./Scrolltotop";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] px-8 md:px-16 py-20 text-gray-800 relative overflow-hidden">
      {/* Enhanced Background Paw Prints */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute left-10 top-10 text-[120px] text-[#747134] animate-pulse">🐾</div>
        <div className="absolute right-16 top-20 text-[80px] text-[#8b7355] rotate-12">🐾</div>
        <div className="absolute left-1/2 top-1/2 text-[150px] text-[#747134] -rotate-12">🐾</div>
        <div className="absolute left-1/4 bottom-20 text-[100px] text-[#8b7355] rotate-45">🐾</div>
        <div className="absolute right-10 bottom-10 text-[90px] text-[#747134]">🐾</div>
        <div className="absolute left-1/3 top-1/4 text-[60px] text-[#8b7355] rotate-90">🐾</div>
        <div className="absolute right-1/3 bottom-1/3 text-[70px] text-[#747134] -rotate-45">🐾</div>
      </div>

      {/* Subtle decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#747134] via-[#8b7355] to-[#747134]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="PawSewa Logo" className="h-20 w-20 object-contain" />
              <div>
                <h3 className="text-2xl font-bold text-[#747134]">PawSewa</h3>
                <p className="text-sm text-gray-600">Complete Pet Care</p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed max-w-md">
              Your trusted partner in complete pet care. From adoption to wellness, we're here to make tails wag and whiskers purr with love and dedication.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="group">
                <div className="w-10 h-10 bg-[#747134] text-white rounded-full flex items-center justify-center group-hover:bg-[#8b7355] transition-all duration-300 group-hover:scale-110">
                  <FaFacebookF className="text-sm" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-[#747134] text-white rounded-full flex items-center justify-center group-hover:bg-[#8b7355] transition-all duration-300 group-hover:scale-110">
                  <FaInstagram className="text-sm" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-[#747134] text-white rounded-full flex items-center justify-center group-hover:bg-[#8b7355] transition-all duration-300 group-hover:scale-110">
                  <FaXTwitter className="text-sm" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-[#747134] text-white rounded-full flex items-center justify-center group-hover:bg-[#8b7355] transition-all duration-300 group-hover:scale-110">
                  <FaYoutube className="text-sm" />
                </div>
              </a>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Explore */}
            <div>
              <h4 className="font-bold text-[#747134] mb-4 text-lg relative">
                Explore
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#8b7355] mt-2"></div>
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Our Story</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Team</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Partnerships</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Blog</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-[#747134] mb-4 text-lg relative">
                Services
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#8b7355] mt-2"></div>
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Pet Grooming</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Veterinary Support</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Pet Supplies</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">AI Insights</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-[#747134] mb-4 text-lg relative">
                Support
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#8b7355] mt-2"></div>
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">FAQs</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-[#747134] transition-colors duration-200 hover:translate-x-1 transform inline-block">Account Login</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="border-t border-gray-300 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#747134] text-white rounded-full flex items-center justify-center">
                <FaLocationDot className="text-sm" />
              </div>
              <div>
                <p className="text-gray-700">Softwarica College, Dilibazar</p>
                <p className="text-gray-700">Kathmandu, Nepal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#747134] text-white rounded-full flex items-center justify-center">
                <FaPhone className="text-sm" />
              </div>
              <div>
                <p className="text-gray-700">+977 9800000000</p>
                <p className="text-sm text-gray-500">24/7 Support</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#747134] text-white rounded-full flex items-center justify-center">
                <FaEnvelope className="text-sm" />
              </div>
              <div>
                <p className="text-gray-700">support@pawsewa.com</p>
                <p className="text-sm text-gray-500">Quick Response</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} PawSewa. All rights reserved. Made with ❤️ for pets.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-gray-600 hover:text-[#747134] transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-[#747134] transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-[#747134] transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
      
      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;