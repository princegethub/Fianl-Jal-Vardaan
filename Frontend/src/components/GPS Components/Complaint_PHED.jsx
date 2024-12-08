import React, { useEffect, useState } from "react";
import ListIllustration from "../../assets/GPS/RqstList-illustration.png"; // Replace with your illustration path
import FormIllustration from "../../assets/GPS/RqstForm-illustration.png"; // Replace with your illustration path
import {
  useAddGpComplaintMutation,
  useGetGpComplaintListQuery,
} from "@/features/api/gpApi";
import { toast, Toaster } from "sonner";

const Complaint_PHED = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    message: "",
  });

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { data, isSuccess, isError, isLoading } = useGetGpComplaintListQuery();
  const [
    addGpComplaint,
    { isSuccess: addIsLoading, isError: AddIsError, isLoading: AddIsLoading },
  ] = useAddGpComplaintMutation();

  useEffect(() => {
    if (isSuccess) {
      setComplaints(data.data); // Assuming `data.data` holds the complaints array
    }
  }, [data, isSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error(complaints.error.message || "Error fetching complaints");
    return <div>Error loading complaints</div>;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await addGpComplaint(formData);
      toast.success(response.message);
      setIsFormVisible(false); // Hide form after submission
      setFormData({ category: "", message: "" }); // Clear form data
    } catch (error) {
      toast.error(response.error.message);
      console.log("Error", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-b from-blue-400 via-white to-white shadow-lg py-8 h-auto">
      <div className="w-[90vw] flex flex-col sm:flex-col lg:flex-row gap-8 mx-auto sm:w-[80vw]">
        {/* Left Section */}
        <div className="w-full sm:w-[90%] lg:w-1/2 rounded-lg flex justify-center bg-gradient-to-b from-blue-400 to-blue-200 items-center p-6 shadow-xl">
          {isFormVisible ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="block sm:hidden text-center text-gray-800 text-xl font-bold">
                Add Complaint
              </p>
              <img
                src={FormIllustration}
                alt="Form Illustration"
                className="hidden lg:block w-[400px] h-auto"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <p className="block sm:hidden text-center text-gray-800 text-xl font-bold">
                Complaints
              </p>
              <img
                src={ListIllustration}
                alt="List Illustration"
                className="hidden sm:block w-[400px] h-auto"
              />
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-[90%] lg:w-1/2 flex justify-center bg-gradient-to-b from-blue-400 to-blue-200 shadow-xl items-center p-6 rounded-lg">
          {isFormVisible ? (
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-blue-600">
                Add a New Complaint
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
                  <option value="">Select a category</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Road Maintenance">Road Maintenance</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Sanitation">Sanitation</option>
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
                  onClick={toggleForm}
                  className="bg-gray-200 text-black py-2 px-4 rounded shadow hover:bg-gray-300"
                >
                  Back
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 w-full">
              <h2 className="text-xl font-bold text-blue-600">Complaints</h2>
              {/* Scrollable list */}
              <ul className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
                {complaints?.map((complaint) => (
                  <li
                    key={complaint._id}
                    className={`p-4 rounded shadow-lg border ${
                      complaint.status === "Pending"
                        ? "bg-red-100 border-red-300"
                        : "bg-green-100 border-green-300"
                    }`}
                  >
                    <p className="font-bold">{`Category: ${complaint.category}`}</p>
                    <p className="text-sm">{`Date: ${new Date(
                      complaint.createdAt
                    ).toLocaleString()}`}</p>
                    <p>{`Message: ${complaint.message}`}</p>
                    <p>{`Status: ${complaint.status}`}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={toggleForm}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
              >
                + Add New Complaint
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaint_PHED;
