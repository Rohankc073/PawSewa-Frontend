import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import Appointment from "./pages/User/appointment";
import AppointmentForm from "./pages/User/AppointmentForm";
import CartPage from "./pages/User/Cart";
import ContactUs from './pages/User/contactus';
import DoctorDetail from "./pages/User/DoctorDetail";
import ForgotPassword from "./pages/User/forgetPassword";
import Home from "./pages/User/home";
import Login from "./pages/User/login";
import Products from './pages/User/Product';
import ProductDetail from "./pages/User/ProductDetail";
import Profile from "./pages/User/Profile";
import ResetPassword from "./pages/User/resetPassword";
import Signup from "./pages/User/signup";
import SimpleCartTest from "./pages/User/simplecart";

function App() {
  return (
    <Router>
      <>
        <ToastContainer position="top-center" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/product" element={<Products />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/simp-cart" element={<SimpleCartTest />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/doctor/:id" element={<DoctorDetail />} />

          <Route path="/appointment-booking/:id" element={<AppointmentForm />} />

          
        </Routes>
      </>
    </Router>
  );
}

export default App;
