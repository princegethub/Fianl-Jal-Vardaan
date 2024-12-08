import React, { useEffect, useState } from "react";
import ListIllustration from "../../assets/GPS/list-illustration.png"; // Replace with your illustration path
import FormIllustration from "../../assets/GPS/form-illustration.png"; // Replace with your illustration path
import { useAddGpAnnoucementMutation, useGetGpAnnouncmentListQuery } from "@/features/api/gpApi";
import { toast } from "sonner";

const PushNotificationPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [notification, setNotification] = useState([]);

  const { data, isSuccess, isError, isLoading, error } = useGetGpAnnouncmentListQuery();
  const [
    addGpAnnoucement,
    { isSuccess: addIsSuccess, isError: addIsError, isLoading: addIsLoading },
  ] = useAddGpAnnoucementMutation();

  const [formData, setFormData] = useState({
    category: "",
 
    message: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setNotification(data.data); // Assuming `data.data` holds the notifications array
    }
  }, [data, isSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error(error?.message || "Error fetching Announcement");
    return <div>Error loading announcements</div>;
  }

  const toggleView = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGpAnnoucement(formData).unwrap();
      toast.success("Notification added successfully!");
      setFormData({ category: "",  message: "" }); // Clear form data
      setIsFormVisible(false); // Hide form after submission
    } catch (error) {
      toast.error("Error adding notification");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-b from-blue-400 via-white to-white shadow-lg py-8 h-auto">
      <div className="w-[90vw] flex flex-col sm:flex-row gap-8 mx-auto sm:w-[80vw]">
        {/* Left Section */}
        <div className="w-full sm:w-[90%] lg:w-1/2 rounded-lg flex justify-center bg-gradient-to-b from-blue-400 via-white to-white items-center p-6 shadow-lg">
          {isFormVisible ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="block sm:hidden text-center text-gray-800 text-xl font-bold">
                Push Notification
              </p>
              <img
                src={FormIllustration}
                alt="Form Illustration"
                className="hidden sm:block w-[400px] h-auto"
              />
            </div>
          ) : (
            <div className="space-y-4 w-full">
              <h2 className="text-xl font-bold text-blue-600">Notifications</h2>
              {/* Scrollable list */}
              <ul className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
                {notification?.map((item, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white rounded shadow border border-gray-200"
                  >
                    <p className="font-bold">{`To: ${item.category}`}</p>
                    <p className="text-sm">{`Date: ${new Date(item.createdAt).toLocaleDateString()}`}</p>
                    <p>{item.message}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={toggleView}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
              >
                + Add New Notification
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-[90%] lg:w-1/2 flex justify-center bg-gradient-to-b from-blue-400 via-white to-white shadow-lg items-center p-6 rounded-lg">
          {isFormVisible ? (
            <form onSubmit={handleFormSubmit} className="space-y-4 w-full max-w-md">
              <h2 className="text-xl font-bold text-blue-600">
                Push Notification
              </h2>
              <div>
                <label className="block font-bold mb-2">Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                >
                  <option value="">Select your category</option>
                  <option value="households">Households</option>
                  <option value="schools">Schools</option>
                  <option value="all">All</option>
                </select>
              </div>
    
              <div>
                <label className="block font-bold mb-2">Message:</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleView}
                  className="bg-gray-200 text-black py-2 px-4 rounded shadow hover:bg-gray-300"
                >
                  Back
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <p className="block sm:hidden text-center text-gray-800 text-xl font-bold">
                Push Notification
              </p>
              <img
                src={ListIllustration}
                alt="List Illustration"
                className="hidden sm:block w-[400px] h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PushNotificationPage;
