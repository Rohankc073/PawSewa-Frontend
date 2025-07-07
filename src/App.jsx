import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import AdoptionForm from "./pages/User/AdoptionForm";
import Appointment from "./pages/User/appointment";
import AppointmentForm from "./pages/User/AppointmentForm";
import CartPage from "./pages/User/Cart";
import CheckoutPage from "./pages/User/CheckoutPage";
import ContactUs from './pages/User/contactus';
import DoctorDetail from "./pages/User/DoctorDetail";
import Home from "./pages/User/home";
import Login from "./pages/User/login";
import PetAdoption from "./pages/User/PetAdoption";
import PetDetailPage from "./pages/User/PetDetail";
import Products from './pages/User/Product';
import ProductDetail from "./pages/User/ProductDetail";
import Profile from "./pages/User/Profile";

import ForgotPassword from "./pages/User/ForgetPassword";
import MyAdoptions from "./pages/User/MyAdoption";
import MyAppointment from "./pages/User/MyAppointment";
import MyOrders from "./pages/User/MyOrder";
import PaymentFailure from "./pages/User/PaymentFailure";
import PaymentSuccess from "./pages/User/PaymentSuccess";
import ResetPassword from "./pages/User/ResetPassword";
import Signup from "./pages/User/signup";

function App() {
  return (
    <Router>
      <>
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/product" element={<Products />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

<Route path="/paymentsuccess" element={<PaymentSuccess />} />
<Route path="/paymentfailure" element={<PaymentFailure />} />
     
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adopt" element={<PetAdoption />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/adoption/:petId" element={<PetDetailPage />} />
          <Route path="/my-adoptions" element={<MyAdoptions />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/doctor/:id" element={<DoctorDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/appointment-booking/:id" element={<AppointmentForm />} />
          <Route path="/adoption-form/:petId" element={<AdoptionForm />} />
          <Route path="/my-appointments" element={<MyAppointment />} />


          
        </Routes>
      </>
    </Router>
  );
}

export default App;
