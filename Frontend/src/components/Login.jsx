import React, { useEffect, useState } from "react";
import Logo from "@/assets/Logo.png";
import LoginIllu from "@/assets/Login_illu.png";
import { useNavigate } from "react-router-dom";
import { useFogetPasswordMutation, useLoginMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [inputData, setInputData] = useState({
    id: "",
    password: "",
    userType: "",
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    userType: "",
    id: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleForgotPasswordData = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [login, { isLoading, error, data, isSuccess }] = useLoginMutation();
  const [forgotPassword, { isLoading: isForgotLoading, error: forgotError, data: forgotData, isSuccess: isForgotSuccess }] = useFogetPasswordMutation();

  // Define the login button handler
  const Loginbtn = async (e) => {
    e.preventDefault();
    try {
      const result = await login(inputData).unwrap();
      console.log('result: ', result);
    } catch (err) {
      console.log('inputData: ', inputData);
      console.error("Login failed:", err);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const result = await forgotPassword(forgotPasswordData).unwrap();
      console.log('Forgot password result: ', result);
      toast.success("Password reset link sent successfully!");
      setShowForgotPassword(false); // Hide the form after submission
    } catch (err) {
      console.error("Forgot password failed:", err);
      toast.error("Failed to send password reset link.");
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Login Successfully");
      if (data.user.role === "PHED") navigate("/phed");
      if (data.user.role === "GP") navigate("/gp");
      if (data.user.role === "USER") navigate("/user");
    } else if (error) {
      toast.error(error.message || "Invalid Credentials");
    }
  }, [isLoading, error, data, isSuccess]);

  return (
    <div className="bg-gradient-to-b from-[#EAF7FF] to-white min-h-auto py-20 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4 ">
        <div className="flex flex-col sm:w-[100%] mx-auto md:flex-row items-center shadow-lg pb-4 pt-2 px-2 h-[450px] justify-between">
          {/* left Section - Illustration */}
          <div className="hidden md:block w-full md:w-[45%]">
            <img
              src={LoginIllu}
              alt="Illustration"
              className="w-full max-w-sm mx-auto"
            />
          </div>

          {/* right Section - Login Form */}
          <div className="w-full md:w-[42%] p-8 rounded-lg ">
            {/* Logo and Heading */}
            <div className="text-center flex items-center md:text-left mb-8">
              <img
                src={Logo}
                alt="Jal Vardaan Logo"
                className="w-16 mx-auto md:mx-0 mb-4"
              />
              <div className="ml-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[#406B95]">
                  Jal Vardaan
                </h1>
                <p className="text-sm text-gray-700">
                  Department of Drinking Water & Sanitation <br />
                  Ministry of Jalshakti
                </p>
              </div>
            </div>

            {/* Login Form */}
            {!showForgotPassword ? (
              <>
                <form onSubmit={Loginbtn}>

                <div className="mb-6">
                    <select
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      name="userType"
                      value={inputData.userType}
                      onChange={handleFormData}
                    >
                      <option value="" disabled>
                        Select Your Role
                      </option>
                      <option value="PHED">PHED</option>
                      <option value="GP">Gram Panchyat</option>
                      <option value="USER">User</option>
                    </select>
                  </div>


                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Enter your ID email contact"
                      name="id"
                      value={inputData.id}
                      onChange={handleFormData}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  </div>
                  <div className="mb-4 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      name="password"
                      value={inputData.password}
                      onChange={handleFormData}
                      required
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-3 cursor-pointer text-gray-500"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>
                 

                  
                <div className="-mt-2 mb-2 text-end">
                  <button
                    onClick={() => setShowForgotPassword(true)} // Show the Forgot Password form
                    className="text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                  </div>


                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#406B95] text-white p-3 rounded hover:bg-[#305274] transition"
                  >
                    {isLoading ? (
                      <span className="flex justify-center items-center">
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Please Wait
                      </span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

            
              </>
            ) : (
              <>
                {/* Forgot Password Form */}
                <form onSubmit={handleForgotPassword} className="mt-4">
                  <div className="mb-4">
                    <select
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      name="userType"
                      value={forgotPasswordData.userType}
                      onChange={handleForgotPasswordData}
                      required
                    >
                      <option value="" disabled>
                        Select Your Role
                      </option>
                      <option value="PHED">PHED</option>
                      <option value="GP">Gram Panchyat</option>
                      <option value="USER">User</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Enter your ID/Contact/Email"
                      name="id"
                      value={forgotPasswordData.id}
                      onChange={handleForgotPasswordData}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  </div>
                  <div className="-mt-2 mb-2 text-end">
                  <button
                    onClick={() => setShowForgotPassword(false)} // Go back to the login form
                    className="text-blue-500 hover:underline"
                  >
                    Back to Login
                  </button>

                  </div>
                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="w-full bg-[#406B95] text-white p-3 rounded hover:bg-[#305274] transition"
                  >
                    {isForgotLoading ? (
                      <span className="flex justify-center items-center">
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Please Wait
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>

             
              
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
