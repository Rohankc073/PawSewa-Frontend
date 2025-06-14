

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// pages
import ContactUs from './pages/User/contactus';
import Home from "./pages/User/home";
import Login from "./pages/User/login";
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



        
      </Routes>
    </Router>
  );
}

export default App;
