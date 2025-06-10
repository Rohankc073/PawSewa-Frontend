import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import logo from "../assets/PawLogo.png";
import ScrollToTopButton from "./scrolltotop";

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] px-8 md:px-16 py-16 text-gray-800 relative overflow-hidden">
      {/* Background Paw Prints */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-[100px] leading-none">
        <div className="absolute left-10 top-10">🐾</div>
        <div className="absolute right-16 top-20">🐾</div>
        <div className="absolute left-1/2 top-1/2">🐾</div>
        <div className="absolute left-1/4 bottom-10">🐾</div>
        <div className="absolute right-10 bottom-0">🐾</div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-10 z-10">
        {/* Logo & Description */}
        <div className="md:col-span-1 space-y-4">
          <img src={logo} alt="PawSewa Logo" className="h-28 ml-8" />
          <p className="text-[15px] leading-relaxed ml-3">
            Your trusted partner in complete pet care. From adoption to wellness, we’re here to make tails wag and whiskers purr.
          </p>
          <div className="flex space-x-4 text-xl pt-2 text-[#747134] ml-5">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {/* About */}
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Partnerships</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2">
              <li><a href="#">Pet Grooming</a></li>
              <li><a href="#">Veterinary Support</a></li>
              <li><a href="#">Pet Supplies</a></li>
              <li><a href="#">AI Insights</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Account Login</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p>Softwarica College,Dilibazar<br />Kathmandu</p>
            <p className="mt-2">+977 9800000000</p>
            <p>support@pawsewa.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative mt-12 text-center text-sm text-gray-500 z-10">
        © {new Date().getFullYear()} PawSewa. All rights reserved.
      </div>
      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;
