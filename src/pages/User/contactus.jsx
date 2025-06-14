import contactImg from "../../assets/contactus.jpg";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-6 md:px-20 pt-28 pb-16 mt-20">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Left Form Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 leading-snug">
              Connecting You with Care for<br />Your Beloved Pets
            </h2>
            <p className="text-gray-700 mb-10">
              We’re here to answer your questions and provide support.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block mb-1 font-semibold text-[#1e1e4b]">Your Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-[#f5f5f5] px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8b8a47]"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-[#1e1e4b]">Your Email Address</label>
                <input
                  type="email"
                  placeholder="gmail.com"
                  className="w-full bg-[#f5f5f5] px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8b8a47]"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-[#1e1e4b]">Message</label>
                <textarea
                  rows="4"
                  placeholder="Enter your message"
                  className="w-full bg-[#f5f5f5] px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8b8a47]"
                >

                </textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-[200px] bg-[#8b8a47] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#6d6a35] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Image Section */}
          <div className="hidden md:block">
            <img
              src={contactImg}
              alt="Dog Hug"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
