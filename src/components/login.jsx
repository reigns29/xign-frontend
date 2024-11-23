import { useState } from "react";
import axios from "axios";

const LoginPage = ({ setUser }) => {
  const [activeTab, setActiveTab] = useState("signIn");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all login fields!");
      return;
    }
    console.log("Login Data:", {
      username: formData.username,
      password: formData.password,
    });
    console.log(`${import.meta.env.VITE_BACKEND_URL}/auth/login`);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    setUser(response.data);
    // alert("Logged in successfully!");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.username || !formData.password) {
      alert("Please fill in all signup fields!");
      return;
    }
    console.log("Signup Data:", {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }
    );
    console.log(response.data);
    console.log(response);
    alert("Signed up successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500 to-teal-700">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("signIn")}
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === "signIn"
                ? "bg-teal-500 text-white rounded-t-lg"
                : "bg-transparent text-gray-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signUp")}
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === "signUp"
                ? "bg-teal-500 text-white rounded-t-lg"
                : "bg-transparent text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.343 16.343C8.223 14.463 10.61 14 12 14s3.777.463 5.657 2.343M20 20H4"
                />
              </svg>
            </div>
          </div>

          {activeTab === "signIn" && (
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full bg-gray-700 text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full bg-gray-700 text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-400">
                    Remember me
                  </span>
                </label>
                <a href="#" className="text-sm text-teal-500 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition"
              >
                Login
              </button>
            </form>
          )}

          {activeTab === "signUp" && (
            <form onSubmit={handleSignUp}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full bg-gray-700 text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full bg-gray-700 text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full bg-gray-700 text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
