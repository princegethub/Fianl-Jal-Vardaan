import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import LoginIllu from "../assets/Login_illu.png";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useLogoutMutation } from "../features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
// import ProfilePage_PHED from './ProfilePage_PHED';

function Login() {
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    id: "",
    password: "",
    userType: "",
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const [login, { isLoading, error, data, isSuccess }] = useLoginMutation();
  
  // const [logout] = useLogoutMutation();

  
  // Define the login button handler
  const Loginbtn = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const result = await login(inputData).unwrap(); // Use `.unwrap()` for handling results
      
    } catch (err) {
      console.log('inputData: ', inputData);
      console.error("Login failed:", err);
    }
  };
  

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Login Successfully");
      if(data.user.role === "PHED")  navigate("/phed");
      if(data.user.role === "GP")  navigate("/gp");
      if(data.user.role === "USER")  navigate("/user");
      // Navigate to the dashboard or another page after login
    } else if (error) {
      toast.error(error.message || "Invalid Credentials");
    } 
  }, [isLoading, error, data, isSuccess]);

  return (
    <div className="bg-gradient-to-b from-[#EAF7FF] to-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:w-[80%] mx-auto md:flex-row items-center justify-between">
          {/* left Section - Illustration */}
          <div className="hidden md:block w-full md:w-[45%]">
            <img
              src={LoginIllu}
              alt="Illustration"
              className="w-full max-w-sm mx-auto"
            />
          </div>

          {/* right Section - Login Form */}
          <div className="w-full md:w-[50%] p-8 rounded-lg shadow-md">
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
            <form onSubmit={Loginbtn}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter your ID"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#406B95] text-white p-3 rounded hover:bg-[#305274] transition"
              >
                {isLoading ? (
                  <>
                  <span className="flex justify-center items-center">  <Loader2 className="h-5 w-5 mr-2  animate-spin" />
                  Please Wait</span>
                  
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
