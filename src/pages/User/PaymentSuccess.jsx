import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-green-100">
          {/* Success Icon with Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-2 text-lg">
            Thank you for your purchase
          </p>
          <p className="text-gray-500 mb-8 text-sm">
            Your transaction was completed successfully. You'll receive a confirmation email shortly.
          </p>

          {/* Order Details Card */}
          <div className="bg-green-50 rounded-xl p-4 mb-8 border border-green-200">
            <p className="text-sm text-green-700 font-medium mb-1">Order Status</p>
            <p className="text-green-800 font-semibold">Processing</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </Link>
            <Link
              to="/orders"
              className="w-full bg-white text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition-all duration-200 font-semibold border-2 border-green-200 hover:border-green-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              View Orders
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;