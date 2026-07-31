"use client";
import Image from "next/image";
import { loginAdmin } from "../../../api/auth";
import { useRouter } from "next/navigation";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { login } from "../../../data-store/actions/authActions";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(formData);
      const token = response.token;
      localStorage.setItem("token", token);
      dispatch(login(token));
      router.push("/customize");
    } catch (error) {
      console.log("Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#aaf485] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">
        <form onSubmit={handleSubmit}>
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo/logo.png"
              alt="Abimanya Doors Logo"
              className="h-20 object-contain"
              width="175"
              height="150"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-3 mb-10 text-lg">
            Login to continue customizing your doors.
          </p>

          {/* Email */}
          <div className="mb-6">
            <label className="font-semibold text-gray-700 mb-2 block">
              Email
            </label>

            <div className="flex items-center border border-lime-400 rounded-xl px-4 h-14">
              <Mail className="text-gray-400 mr-3" size={22} />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="font-semibold text-gray-700 mb-2 block">
              Password
            </label>

            <div className="flex items-center border border-lime-400 rounded-xl px-4 h-14">
              <Lock className="text-gray-400 mr-3" size={22} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full outline-none"
              />

              {showPassword ? (
                <Eye
                  size={22}
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOff
                  size={22}
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          {/* Remember */}
          <div className="flex justify-between items-center mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="accent-lime-600 w-5 h-5"
              />

              <span className="text-gray-600">Remember me</span>
            </label>

            <button
              type="button"
              className="text-lime-600 font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700 text-white py-4 rounded-xl text-xl font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
