import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useProfileUpdateMutation } from "../features/api/authApi";

const ProfilePage_PHED = () => {
  const navigate = useNavigate();
  const userdetails = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  const [profileUpdate] = useProfileUpdateMutation();

  // Get saved user details from local storage
  const savedUserDetails = JSON.parse(localStorage.getItem('user'));
  console.log('savedUserDetails: ', savedUserDetails);

  const toggleEdit = () => setIsEditing(!isEditing);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('role', savedUserDetails.role);
    formData.append('id', savedUserDetails.id);
    if (newPhoto) {
      formData.append('profilePicture', newPhoto);
    }
  
    profileUpdate(formData)
      .unwrap()
      .then((response) => {
        console.log("Profile updated successfully:", response);
        setNewPhoto(null);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
    }
  };
  
  const hanldehome = () => navigate(-1);

  return (
    <div className="h-auto bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex flex-col items-center py-16">
      <button
        className="border px-4 gap-2 py-2 stroke-orange-500 rounded-lg mb-4 absolute bottom-24 font-semibold text-xl items-center border-black right-20 flex tracking-wider"
        onClick={hanldehome}
      >
        <ArrowLeft className="text-sm animate-ping" /> Back
      </button>

      <div className="w-[91vw] max-w-3xl bg-gradient-to-b from-[#4EB4F8] to-white shadow-lg rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={newPhoto ? URL.createObjectURL(newPhoto) : savedUserDetails.profilePicture}
            alt="Profile"
            className="w-20 h-20 object-cover rounded-full shadow-lg border border-gray-300"
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

      <div className="w-[91vw] max-w-3xl bg-gradient-to-b from-[#4EB4F8] to-white shadow-lg rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-blue-600">Personal Details</h2>
        </div>

        {isEditing ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
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
                  src={URL.createObjectURL(newPhoto)}
                  alt="New Profile"
                  className="w-16 h-16 object-cover rounded-full shadow-lg border border-gray-300"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-medium text-gray-700">Name:</span> {savedUserDetails.name}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium text-gray-700">Contact:</span> {savedUserDetails.contact}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium text-gray-700">Email:</span> {savedUserDetails.email}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium text-gray-700">ID:</span> {savedUserDetails.id}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage_PHED;
