

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// pages
import Dashboard from "./pages/User/home";
import Login from "./pages/User/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />


        
      </Routes>
    </Router>
  );
}

export default App;
