

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// pages
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



        
      </Routes>
    </Router>
  );
}

export default App;
