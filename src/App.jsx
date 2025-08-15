// src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Details from "./pages/Details";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/details/:id" element={<Details />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("redirect");
    if (redirectPath && redirectPath !== location.pathname) {
      window.history.replaceState({}, "", redirectPath);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}

function App() {
  return (
    <Router basename="/DashBoard-React">
      {" "}
      {/* استبدل "my-project" باسم مستودعك */}
      <AppContent />
    </Router>
  );
}

export default App;




