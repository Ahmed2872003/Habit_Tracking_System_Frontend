import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Signin.jsx";
import Register from "./components/Register.jsx";

const App = () => {
  useEffect(() => {
    console.log("Called");

    const cb = () => {
      navigator.sendBeacon();
    };

    addEventListener("beforeunload", cb);

    return () => {
      removeEventListener("beforeunload", cb);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white text-gray-800 font-sans">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
