import React, { useState, useEffect } from "react";
import Image1 from "../../assets/PHED/addlist.png";
import { Link, useNavigate, useParams } from "react-router-dom"; // Use correct "react-router-dom"
import {
  useGpUpdateMutation,
  useViewSingleGpDetailsQuery,
} from "../../features/api/phedApi";
import { toast } from "sonner";

function UpdateGps() {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the ID from the URL parameters
  console.log("id: ", id);

  // State to manage form values
  const [formData, setFormData] = useState({
    villageName: "",
    name: "",
    contact: "",
    lgdCode: "",
    aadhar: "",
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  // Fetch data for the specific GP using the query hook
  const {
    data: gpDetails,
    isLoading,
    isSuccess,
    error,
  } = useViewSingleGpDetailsQuery(id);

  useEffect(() => {
    if (isSuccess && gpDetails) {
      setFormData({
        villageName: gpDetails?.data.villageName || "",
        name: gpDetails?.data.name || "",
        contact: gpDetails?.data.contact || "",
        lgdCode: gpDetails?.data.lgdCode || "",
        aadhar: gpDetails?.data.aadhar || "",
      });
    } else if (error) {
      console.error("Error fetching GP details:", error);
    }
  }, [isSuccess, gpDetails, error]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const [
    gpUpdate,
    { isLoading: isUpdating, isSuccess: isUpdated, error: updateError },
  ] = useGpUpdateMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear errors
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Call the mutation
      await gpUpdate({ id, updates: formData }).unwrap();

      if (isUpdated && !updateError) {
        toast.success("Gp details updated successfully");
        // Navigate to the GP management page on success
        navigate("/phed/managegp");
      }
    } catch (error) {
      console.error("Error updating GP:", error);
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.villageName)
      newErrors.villageName = "Gram Panchayat Name is required";
    if (!formData.name) newErrors.name = "Sarpanch Name is required";
    if (!formData.contact) newErrors.contact = "Mobile Number is required";
    else if (!/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Enter a valid 10-digit Mobile Number";
    if (!formData.lgdCode) newErrors.lgdCode = "LGD Code is required";
    if (!formData.aadhar) newErrors.aadhar = "Aadhar ID is required";
    return newErrors;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white overflow-x-hidden">
      <div
        className="container mx-auto py-10 flex flex-col lg:flex-row items-center lg:items-start gap-10"
        style={{ maxWidth: "90%" }}
      >
        {/* Left Illustration */}
        <div className="hidden lg:block w-[45%]">
          <img
            src={Image1}
            alt="Add Gram Panchayat Illustration"
            className="w-full h-[60vh] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-[50%] shadow-md rounded-xl p-6 sm:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
            Update Gram Panchayat
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: "Gram Panchayat Name",
                id: "villageName",
                placeholder: "Enter Gram Panchayat name",
              },
              {
                label: "Sarpanch Name",
                id: "name",
                placeholder: "Enter Sarpanch name",
              },
              {
                label: "Mobile Number",
                id: "contact",
                placeholder: "Enter Mobile Number",
              },
              {
                label: "LGD Code",
                id: "lgdCode",
                placeholder: "Enter LGD Code",
              },
              {
                label: "Addhar ID",
                id: "aadhar",
                placeholder: "Enter Addhar ID",
              },
            ].map((input) => (
              <div key={input.id}>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor={input.id}
                >
                  {input.label}
                </label>
                <input
                  type="text"
                  id={input.id}
                  placeholder={input.placeholder}
                  value={formData[input.id]} // Controlled input
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors[input.id] ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {errors[input.id] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[input.id]}
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Update
              </button>
              <Link to="/phed/managegp">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg"
                >
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateGps;
