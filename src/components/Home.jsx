import React, { useEffect, useState } from "react";
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AllHabits from "./AllHabits.jsx";
import Community from "./Community.jsx";
import Overlay from "./Overlay.jsx";

const Home = () => {
  const currentPath = useLocation().pathname;
  const [activeLink, setActiveLink] = useState(currentPath);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLink(currentPath);
    setIsMobileMenuOpen(false); // close mobile menu on route change
  }, [currentPath]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-purple-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Habit Builder</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-purple-700 text-white w-64 p-6 space-y-4 fixed top-0 left-0 z-40 transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static min-h-screen`}
      >
        <h1 className="text-2xl font-bold mb-6 hidden md:block">
          Habit Builder
        </h1>
        <nav className="space-y-2">
          <Link
            to="/habits"
            onClick={() => setActiveLink("/habits")}
            className={`block py-2 px-4 rounded transition duration-200 ${
              activeLink === "/habits" ? "bg-purple-600" : "hover:bg-purple-600"
            }`}
          >
            All Habits
          </Link>
          <Link
            to="/community"
            onClick={() => setActiveLink("/community")}
            className={`block py-2 px-4 rounded transition duration-200 ${
              activeLink === "/community"
                ? "bg-purple-600"
                : "hover:bg-purple-600"
            }`}
          >
            Community
          </Link>
        </nav>
      </aside>

      {isMobileMenuOpen && (
        <Overlay
          visible={isMobileMenuOpen}
          setVisible={setIsMobileMenuOpen}
          className="z-30 md:hidden"
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 mt-16 md:mt-0">
        <Routes>
          <Route path="/" element={<Navigate to="/habits" />} />
          <Route path="/habits" element={<AllHabits />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
