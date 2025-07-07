import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const PaymentFailure = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
        <XCircle className="w-20 h-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-700 mb-6">
          Sorry, your payment could not be processed. Please try again later.
        </p>
        <Link
          to="/cart"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Go Back to Cart
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default PaymentFailure;
