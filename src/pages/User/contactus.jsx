import contactImg from "../../assets/contactus.jpg";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Header Section */}
          <div className="text-center mb-16 mt-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d48] mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're here to help you and your beloved pets. Reach out to us for any questions, support, or inquiries about our services.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Form Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#747134] to-[#5a5628] rounded-t-3xl"></div>
              
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d48] mb-4 leading-snug">
                  Connecting You with Care for Your Beloved Pets
                </h2>
                <p className="text-gray-600 text-lg">
                  We're here to answer your questions and provide support for all your pet care needs.
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold text-[#1d1d48] text-sm">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-[#1d1d48] text-sm">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@gmail.com"
                    className="w-full bg-gray-50 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-[#1d1d48] text-sm">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    className="w-full bg-gray-50 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-[#1d1d48] text-sm">
                    How can we help you?
                  </label>
                  <select className="w-full bg-gray-50 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 hover:bg-gray-100">
                    <option value="">Select a topic</option>
                    <option value="adoption">Pet Adoption</option>
                    <option value="products">Pet Products</option>
                    <option value="appointment">Veterinary Services</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-[#1d1d48] text-sm">
                    Your Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Tell us more about how we can help you and your pet..."
                    className="w-full bg-gray-50 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 hover:bg-gray-100 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#747134] to-[#5a5628] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-[#5a5628] hover:to-[#747134] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Content Section */}
            <div className="space-y-8">
              {/* Hero Image */}
              <div className="relative group">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
                  <img
                    src={contactImg}
                    alt="Happy pet owner with dog"
                    className="rounded-2xl w-full h-[400px] object-cover"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-[#747134] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    We're Here for You!
                  </div>
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#747134]/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#1d1d48]">Email Us</h3>
                  </div>
                  <p className="text-gray-600 text-sm">info@pawsewa.com</p>
                  <p className="text-gray-600 text-sm">support@pawsewa.com</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#747134]/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#1d1d48]">Call Us</h3>
                  </div>
                  <p className="text-gray-600 text-sm">+977 98XXXXXXXX</p>
                  <p className="text-gray-600 text-sm">+977 01XXXXXXX</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#747134]/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#1d1d48]">Visit Us</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Kathmandu, Nepal</p>
                  <p className="text-gray-600 text-sm">Bagmati Province</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#747134]/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#1d1d48]">Office Hours</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 text-sm">Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-[#747134]/10 to-[#5a5628]/10 rounded-2xl p-6 border border-[#747134]/20">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold text-[#1d1d48]">Need Immediate Help?</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  For urgent pet care matters or emergencies, please call us directly or visit our emergency services.
                </p>
                <button className="px-4 py-2 bg-[#747134] text-white rounded-lg text-sm font-medium hover:bg-[#5a5628] transition-colors duration-200">
                  Emergency Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;