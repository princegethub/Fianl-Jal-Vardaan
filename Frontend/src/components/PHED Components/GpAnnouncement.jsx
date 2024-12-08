import React, { useEffect, useState } from "react";
import Illustration from "./Illustration"; // Reusable Illustration Component
import Image2 from "../../assets/PHED/announcement.png"; // Illustration for Add Announcement
import Image1 from "../../assets/PHED/announcement1.png"; // Illustration for Send Announcement
import { useCreatePhedAnnouncementMutation, useViewAnnouncementListQuery } from "../../features/api/phedApi";
import { toast } from "sonner";
const GpAnnouncement = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle state
  const [lgdCode, setPhedId] = useState('');
  const [message, setMessage] = useState('');
  const handleInputChange = (e) => {
    const value = e.target.value;
    setPhedId(value);
  };
  const handleInputMessage = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };
  const [createAnnouncement, { isLoading, isError }] = useCreatePhedAnnouncementMutation();
  const { data, isLoading: listLoading, isError: listError, error } = useViewAnnouncementListQuery();
  useEffect(() => {
    if (isLoading) {
      console.log("Fetching announcements...");
    }
    if (isError) {
      console.error("Failed to fetch announcements:", error);
    }
  }, [data, isLoading, isError, error]);
  // console.log("Announcement List:", data.data);
  const submitAnnouncement = async (e) => {
    e.preventDefault();
    const announcementData = { lgdCode, message };
    // Logging the data before making the request
    console.log('Announcement Data:', announcementData);
    try {
      // Trigger the POST request and get the response data
      const response = await createAnnouncement(announcementData).unwrap();
      console.log('Announcement Created Successfully:', response);
      toast.success(response.message || "Announcement Created Successfully")
      setIsFormVisible(false);
      // Perform success actions, e.g., show a success message or clear the form
      // clearForm(); // Example of a form-reset function
    } catch (error) {
      console.error('Failed to create announcement:', error);
      // Optionally display an error message to the user
      // showErrorNotification(error.message); // Example function to show an error notification
    }
  };
  // Toggle view between Form and List
  const toggleView = () => setIsFormVisible(!isFormVisible);
  // Handle Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: announcements.length + 1,
      gpId: e.target.gpId.value.trim(),
      message: e.target.message.value.trim(),
      date: new Date().toLocaleDateString(),
    };
    // Add the new announcement to the list
    setAnnouncements([...announcements, newAnnouncement]);
    e.target.reset(); // Reset form fields
    setIsFormVisible(false); // Switch back to list view
  };
  return (
    <div className="min-h-auto py-8 bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white overflow-x-hidden">
      <div
        className="container mx-auto py-10 flex flex-col lg:flex-row items-center lg:items-start gap-10"
        style={{ maxWidth: "90%" }}
      >
        {/* Left Side Illustration */}
        <Illustration
          image={isFormVisible ? Image1 : Image2}
          alt={
            isFormVisible ? "Add Announcement Illustration" : "Send Announcement Illustration"
          }
        />
        {/* Right Side: Form or List */}
        <div className="w-full lg:w-[50%] shadow-md rounded-xl p-6 sm:p-8 ">
          {isFormVisible ? (
            // Form View
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
                Add Announcement
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="gpId"
                  >
                    Gram Panchayat ID
                  </label>
                  <input
                    type="text"
                    id="lgdCode"
                    value={lgdCode} // Bind the state to the input value
                    onChange={handleInputChange} // Handle input change
                    placeholder="Enter Gram Panchayat ID"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message} // Bind the state to the input value
                    onChange={handleInputMessage} // Handle input change
                    placeholder="Enter your announcement message"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="4"
                  ></textarea>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={submitAnnouncement}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={toggleView}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg"
                  >
                    Back to List
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // List View
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
                Send Announcement
              </h2>
              {/* Scrollable List Container */}
              <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-4">
                <ul className="space-y-4">
                  {data?.data?.map((announcement) => (
                    <li
                      key={announcement._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#e0f2ff] text-blue-700 rounded-lg shadow p-4 hover:shadow-md transition-shadow space-y-2 sm:space-y-0"
                    >
                      <div>
                        <span className="block font-semibold">
                          To: {announcement.lgdCode}
                        </span>
                        <span className="block text-sm text-gray-600">
                          Date: {announcement.createdAt.split('T')[0].split('-').reverse().join('-')}
                        </span>
                        <p className="mt-2">{announcement.message}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={e => setIsFormVisible(true)}
                className="mt-6 bg-blue-600 hover:bg-blue-700 justify-center text-white font-semibold py-3 px-6 rounded-lg flex items-center space-x-2"
              >
       
                <span>Add Announcement</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GpAnnouncement;