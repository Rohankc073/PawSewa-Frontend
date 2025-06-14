

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// pages
import Home from "./pages/User/home";
import Login from "./pages/User/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />


        
      </Routes>
    </Router>
  );
}

export default App;
