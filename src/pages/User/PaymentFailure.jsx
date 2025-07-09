import { ArrowLeft, HelpCircle, RefreshCw, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const PaymentFailure = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-rose-50 px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
          {/* Failure Icon with Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          {/* Failure Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-2 text-lg">
            We couldn't process your payment
          </p>
          <p className="text-gray-500 mb-8 text-sm">
            Don't worry, your cart is still saved. Please check your payment method and try again.
          </p>

          {/* Error Details Card */}
          <div className="bg-red-50 rounded-xl p-4 mb-8 border border-red-200">
            <p className="text-sm text-red-700 font-medium mb-1">Common Issues</p>
            <p className="text-red-800 text-sm">Insufficient funds, expired card, or network error</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/cart"
              className="w-full bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back to Cart
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-white text-red-600 px-6 py-3 rounded-xl hover:bg-red-50 transition-all duration-200 font-semibold border-2 border-red-200 hover:border-red-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              to="/support"
              className="w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-5 h-5" />
              Contact Support
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-200 rounded-full opacity-20 blur-xl"></div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentFailure;