

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// pages
import Appointment from "./pages/User/appointment";
import ContactUs from './pages/User/contactus';
import ForgotPassword from "./pages/User/forgetPassword";
import Home from "./pages/User/home";
import Login from "./pages/User/login";
import Products from './pages/User/Product';
import ResetPassword from "./pages/User/resetPassword";
import Signup from "./pages/User/signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/product" element={<Products />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgotPassword />} />




        
      </Routes>
    </Router>
  );
}

export default App;
