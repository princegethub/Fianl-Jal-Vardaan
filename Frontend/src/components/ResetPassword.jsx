import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useResetPasswordMutation } from "../features/api/authApi";
// import ResetIllu from "@/assets/Reset_illu.png"; // Add your illustration image path here
import  Reset  from '../assets/Reset.svg';



function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extract the token from the URL
  console.log('token: ', token);
  const [inputData, setInputData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (inputData.password !== inputData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const result = await resetPassword({
        token,
        password: inputData.password,
      }).unwrap();

      toast.success(result.message || "Password updated successfully!");
      navigate("/login"); // Redirect to the login page after success
    } catch (err) {
      console.error("Reset Password failed:", err);
      toast.error(err.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired reset token.");
      navigate("/login"); // Redirect if token is missing
    }
  }, [token, navigate]);

  return (
    <div className="bg-gradient-to-b from-[#9dd6f9] to-white min-h-auto py-24 flex items-center justify-center ">
      <div className="container mx-auto px-4 sm:px-4 lg:px-4 ">
        <div className="flex flex-col sm:w-[100%] shadow-lg mx-auto md:flex-row items-center justify-between">
          {/* Left Section - Illustration */}
          <div className="hidden md:block w-full md:w-[45%]">
            <img
              src={Reset}
              alt="Reset Password Illustration"
              className="w-full max-w-sm mx-auto"
            />
            {/* <ResetIcon/> */}
          </div>

          {/* Right Section - Reset Form */}
          <div className="w-full md:w-[40%] p-8   rounded-md">
            <h2 className="text-2xl font-bold text-[#406B95] text-center mb-6">
              Reset Your Password
            </h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={inputData.password}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  value={inputData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#406B95] text-white p-3 rounded hover:bg-[#305274] transition"
              >
                {isLoading ? (
                  <span className="flex justify-center items-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
