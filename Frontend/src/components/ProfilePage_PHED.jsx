import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useLoginMutation } from "../features/api/phedApi";
import { useLoginMutation } from "../features/api/authApi";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router";


const ProfilePage_PHED = () => {

  const { data: logindata, error, isLoading } = useLoginMutation();
  const navigate = useNavigate();
 
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);
  
  const [profile, setProfile] = useState({
    name: "Bhajanlal",
    id: "PH16GX4001",
    role: "PHED",
    contact: "+91 9876543210",
    email: "Contactpince24.7@gmail.com",
    photo: "https://via.placeholder.com/100", // Placeholder profile image
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle edit state
  const [newPhoto, setNewPhoto] = useState(null); // Temporary photo preview

  const userdetails = useSelector(state => state.auth);


// Redux store me data load karte waqt sessionStorage se fetch karen
const savedUserDetails = JSON.parse(localStorage.getItem('user'));
console.log('savedUserDetails: ', savedUserDetails);

  // Toggle edit mode
  const toggleEdit = () => setIsEditing(!isEditing);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      name: e.target.name.value || profile.name,
      contact: e.target.contact.value || profile.contact,
      email: e.target.email.value || profile.email,
      photo: newPhoto || profile.photo,
    };
    setProfile(updatedProfile);
    setNewPhoto(null); // Clear temporary photo
    setIsEditing(false); // Exit edit mode
  };

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setNewPhoto(reader.result); // Preview the new image
      reader.readAsDataURL(file);
    }
  };

console.log("dataaa",logindata);

const hanldehome =  () => navigate(-1); // Navigate to the previous page

  return (
    
    <div className="h-auto  bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex flex-col items-center py-16">

      <button className="border px-4 gap-2 py-2  stroke-orange-500 rounded-lg mb-4 absolute bottom-24 font-semibold text-xl items-center border-black right-20 flex tracking-wider" onClick={hanldehome} ><ArrowLeft className="text-sm animate-ping "/> Back</button>

      {/* Profile Header */}
      <div className="w-[91vw] max-w-3xl bg-gradient-to-b from-[#4EB4F8]  to-white  shadow-lg rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={newPhoto || savedUserDetails.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full shadow-lg border border-gray-300"
          />
          <div>
            <h1 className="text-xl font-bold text-blue-600">
              Hi! {savedUserDetails.name}
            </h1>
            <p className="text-gray-600">ID: {savedUserDetails.id}</p>
            <p className="text-gray-600">ROLE: {savedUserDetails.role}</p>
          </div>
        </div>
        <button
          onClick={toggleEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Personal Details */}
      <div className="w-[91vw] max-w-3xl bg-gradient-to-b from-[#4EB4F8]  to-white shadow-lg rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-blue-600">Personal Details</h2>
        </div>

        {isEditing ? (
          // Editable Form
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="flex items-center gap-4">
              <label className="block">
                <span className="text-gray-700 font-medium">Profile Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 mt-2"
                />
              </label>
              {newPhoto && (
                <img
                  src={savedUserDetails.profilePicture}
                  alt="New Profile"
                  className="w-16 h-16 rounded-full shadow-lg border border-gray-300"
                />
              )}
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={savedUserDetails.name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  defaultValue={savedUserDetails.contact}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={savedUserDetails.email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
          </form>
        ) : (
          // Display Details
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-medium text-gray-700">Name:</span>{" "}
                {savedUserDetails.name}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium text-gray-700">Contact:</span>{" "}
                {savedUserDetails.contact}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {savedUserDetails.email}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium text-gray-700">ID:</span>{" "}
                {savedUserDetails.id}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage_PHED;
