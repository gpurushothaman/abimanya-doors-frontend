"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie"; 

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { login } from "@data-store/actions/authActions";

//Api
import { authlogin } from "@services/authService";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [toast, setToast] = useState({ open: false, message: "", severity: "success", });

  //   Thiyaguu updated toast and validation option --------------->>>>>>>>>>>>>>>>

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleClose = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Email Empty
    if (!formData.email.trim()) {
      setToast({ open: true, message: "Please enter your email", severity: "error", });
      return;
    }
    // Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({ open: true, message: "Please enter a valid email address", severity: "error", });
      return;
    }
    // Password Empty
    if (!formData.password.trim()) {
      setToast({ open: true, message: "Please enter your password", severity: "error", });
      return;
    }
    // Password Length
    if (formData.password.length < 6) {
      setToast({ open: true, message: "Password must be at least 6 characters", severity: "error", });
      return;
    }
    // ---------- API ----------
    try {
      const response = await authlogin(formData);  
      if(response?.data?.success){
      const token = response?.data?.token;
      const user = response?.data?.user;
      console.log("token:=",response)
      Cookies.set("token", token, { expires: 1 }); 
      dispatch(login(token,user));
      setToast({ open: true, message: "Login Successfully", severity: "success", });
      }else{
        setToast({ open: true, message: "Something went wrong. Try after sometime.", severity: "error", });
      }
     setTimeout(() => { router.push("/customize");}, 3000);
    } catch (error) {
      setToast({ open: true, message: "Invalid email or password", severity: "error", });
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
              width={150}
              height={150}
              className="h-20 w-65 object-contain"
              priority
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





      {/*Thiyaguu Toast Option */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>



    </div>
  );
}


