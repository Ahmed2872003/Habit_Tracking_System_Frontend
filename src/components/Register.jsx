import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Register
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition">
          Create Account
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-purple-600 hover:underline font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
