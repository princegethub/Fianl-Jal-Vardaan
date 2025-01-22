import React, { useState, useEffect } from "react";
import Logo from "@/assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import NotificationsDialog from "./Notfication_Dilog";
import { useGetNotificationPhedQuery } from "@/features/api/gpApi";
import { useLogoutMutation } from "@/features/api/authApi";
import { toast } from "sonner";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] =
    useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };



const { data, isSuccess, isError, isLoading } = useGetNotificationPhedQuery();

  // Use an effect to safely update state when data is available
  useEffect(() => {
    if (isSuccess && data?.data) {
      setNotifications(data.data); // Update the state with the array
      console.log("Fetched notifications: ", notifications);
    }
  }, [data, isSuccess]);


  const toggleNotificationsDialog = () => {
    setIsNotificationsDialogOpen(!isNotificationsDialogOpen);
  };

  const notificationCount =  notifications.length ;

  // Handle scroll to toggle sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  
  const [logout , {data: logoutdata, isSuccess: logoutSuccess, isError:logoutError }] = useLogoutMutation();

  const logouthandler = async () => {
    let response = await logout();
    console.log('response: ', response);
    if (response?.data) {
      navigate("/login");
      toast.success(response.data.message || "Logout Successfully");
    } else if (response?.error) {
      toast.error(response.error.data.message || "Logout Failed");
    }
  };

  return (
    <nav
      className={`${
        isSticky
          ? "fixed top-0 left-0 w-full bg-white shadow-md z-50"
          : "sticky"
      } bg-white shadow-xl z-10 h-[10vh] flex justify-center transition-all duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left Side - Logo and Titles */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-16" />
          <div className="text-left leading-3">
            <h1 className="text-xl font-bold text-blue-600">Jal Vardaan</h1>
            <p className="text-[12px] text-gray-600">
              Department of Drinking Water & Sanitation <br />
              Ministry of Jalshakti
            </p>
          </div>
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex bg-gray-100" : "hidden"
          } absolute top-16 left-0 w-full flex-col items-center space-y-4 py-4 mr-5 sm:relative sm:top-0 sm:left-0 sm:w-auto sm:flex sm:flex-row sm:space-y-0 sm:space-x-6 sm:bg-transparent`}
        >
          <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-sm font-medium  items-center text-gray-700">
            <Link to="/gp" className="hover:text-blue-600 cursor-pointer">
              Home
            </Link>
            <Link
              to="/gp/assest"
              className="hover:text-blue-600 cursor-pointer"
            >
              Assest
            </Link>
         
            <Link
              to="/gp/notification"
              className="hover:text-blue-600 cursor-pointer"
            >
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-300 relative"
                onClick={toggleNotificationsDialog}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                >
                  <path d="M 25 0 C 22.792969 0 21 1.792969 21 4 C 21 6.207031 22.792969 8 25 8 C 27.207031 8 29 6.207031 29 4 C 29 1.792969 27.207031 0 25 0 Z M 19.375 6.09375 C 14.804688 8.050781 12 12.457031 12 18 C 12 29 8.199219 31.761719 5.9375 33.40625 C 4.933594 34.132813 4 34.808594 4 36 C 4 40.207031 10.28125 42 25 42 C 39.71875 42 46 40.207031 46 36 C 46 34.808594 45.066406 34.132813 44.0625 33.40625 C 41.800781 31.761719 38 29 38 18 C 38 12.441406 35.199219 8.046875 30.625 6.09375 C 29.769531 8.367188 27.566406 10 25 10 C 22.433594 10 20.230469 8.363281 19.375 6.09375 Z M 19 43.875 C 19 43.914063 19 43.960938 19 44 C 19 47.308594 21.691406 50 25 50 C 28.308594 50 31 47.308594 31 44 C 31 43.960938 31 43.914063 31 43.875 C 29.117188 43.953125 27.117188 44 25 44 C 22.882813 44 20.882813 43.953125 19 43.875 Z"></path>
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>
            </Link>
          </ul>

          {/* Profile Icon with Dropdown */}
          <div className="relative ">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <img
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                <ul className="text-sm text-gray-700">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                   
                      <button onClick={logouthandler} className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                        Logout
                      </button>
                  
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Notification Bell */}
      </div>

      {/* Notifications Dialog */}
      {isNotificationsDialogOpen && (
        <NotificationsDialog
          notifications={notifications}
          onClose={toggleNotificationsDialog}
        />
      )}
    </nav>
  );
}

export default Navbar;
