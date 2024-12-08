import React, { useState, useEffect } from "react";
import { addGp } from "../../features/phedSlice";
import { useGpAddMutation } from "../../features/api/phedApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const states = [
  { value: "delhi", label: "Delhi" },
  { value: "haryana", label: "Haryana" },
  { value: "mumbai", label: "Mumbai" },
  { value: "tamilnadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "himachal", label: "Himachal" },
];

const districts = {
  delhi: [
    "South Delhi",
    "North Delhi",
    "East Delhi",
    "West Delhi",
    "Central Delhi",
  ],
  haryana: ["Faridabad", "Gurugram", "Ambala", "Panipat", "Sonipat"],
  mumbai: ["Mumbai City", "Mumbai Suburban", "Thane"],
  tamilnadu: ["Chennai", "Coimbatore", "Madurai"],
  telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  himachal: ["Shimla", "Kullu", "Dharamshala"],
};

const villageNames = {
  delhi: {
    "South Delhi": ["Mehrauli", "Vasant Kunj", "Hauz Khas"],
    "North Delhi": ["Civil Lines", "Model Town", "Rohini"],
    "East Delhi": ["Mayur Vihar", "Gandhinagar", "Patparganj"],
    "West Delhi": ["Rajouri Garden", "Tilak Nagar", "Janakpuri"],
    "Central Delhi": ["Karol Bagh", "Paharganj", "New Delhi"],
  },
  haryana: {
    Faridabad: ["Ballabgarh", "New Faridabad", "Sec-12"],
    Gurugram: ["DLF City", "Sohna", "Sector 57"],
    Ambala: ["Ambala Cantt", "Rural", "City"],
    Panipat: ["Urban Estate", "Textile City", "Rural"],
    Sonipat: ["Urban", "Rural", "Industrial"],
  },
  mumbai: {
    "Mumbai City": ["Colaba", "Marine Drive", "Churchgate"],
    "Mumbai Suburban": ["Andheri", "Bandra", "Juhu"],
    Thane: ["Thane West", "Thane East", "Kalwa"],
  },
  tamilnadu: {
    Chennai: ["Mylapore", "T Nagar", "Adyar"],
    Coimbatore: ["RS Puram", "Gandhipuram", "Peelamedu"],
    Madurai: ["Meenakshi Nagar", "Anna Nagar", "KK Nagar"],
  },
  telangana: {
    Hyderabad: ["Banjara Hills", "Jubilee Hills", "Secunderabad"],
    Warangal: ["Urban", "Rural", "Hanamkonda"],
    Nizamabad: ["City", "Rural", "Industrial Area"],
  },
  himachal: {
    Shimla: ["Mall Road", "Ridge", "Scandal Point"],
    Kullu: ["Manali", "Rohtang", "Solang"],
    Dharamshala: ["McLeod Ganj", "Bhagsunag", "Dharamkot"],
  },
};

const ManageGp = ({ onBack, setIsAdding }) => {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    villageName: "",
    lgdCode: "",
    name: "",
    aadhar: "",
    contact: "",
    email: "",
  });
  const [errors, setErrors] = useState({});





  useEffect(() => {
    if (formData.state && formData.district) {
      const randomCode = `LG${Math.floor(10000 + Math.random() * 90000)}`;
      setFormData((prev) => ({ ...prev, lgdCode: randomCode }));
    }
  }, [formData.state, formData.district]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      state: selectedState,
      district: "",
      villageName: "",
      lgdCode: "",
    });
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict,
      villageName: "",
    }));
  };

  const handleVillageChange = (e) => {
    setFormData((prev) => ({ ...prev, villageName: e.target.value }));
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [gpadd, { isError, isLoading, isSuccess, data }] = useGpAddMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = {};

      // Validation checks
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.villageName)
        newErrors.villageName = "Village Name is required";

      // Additional validation for other fields
      if (!formData.name) newErrors.name = "Sarpanch Name is required";
      if (!formData.contact) newErrors.contact = "Mobile Number is required";
      if (!formData.email) newErrors.email = "Email is required";

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      // Mobile number validation (10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (formData.contact && !phoneRegex.test(formData.contact)) {
        newErrors.contact = "Mobile number must be 10 digits";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const result = await gpadd(formData).unwrap();
      console.log("result: ", result);

      console.log("Submitted Data:", formData);
    } catch (error) {
      console.log("error: ", error);
    }
    // Add your submission logic here
  };

  console.log("Response Data : ", data);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Gram Panchayat Added Successfully");

      setFormData({
        state: "",
        district: "",
        villageName: "",
        name: "",
        contact: "",
        email: "",
        aadhar: "",
        lgdCode: "",
      });
      setIsAdding(false);
    } else if (isError) {
      toast.error(
        data?.message ||
          "Plese Check Your Detils Addhar Email and Mobile Number Already exist"
      );
    }
  }, [isLoading, isError, data, isSuccess]);

  return (
    <div className="w-full lg:w-[50%] shadow-md rounded-xl p-6 sm:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
        Add Gram Panchayat
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap gap-4 mb-6">
          {/* State Dropdown */}
          <div className="flex flex-col w-full sm:w-1/3">
            <label className="block text-gray-700 font-medium mb-2">
              State
            </label>
            <select
              value={formData.state}
              onChange={handleStateChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          {/* District Dropdown */}
          <div className="flex flex-col w-full sm:w-1/3">
            <label className="block text-gray-700 font-medium mb-2">
              District
            </label>
            <select
              value={formData.district}
              onChange={handleDistrictChange}
              disabled={!formData.state}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select District</option>
              {formData.state &&
                districts[formData.state]?.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district}</p>
            )}
          </div>

          {/* villageName Dropdown */}
          <div className="flex flex-col w-full sm:w-1/3">
            {" "}
            <select
              value={formData.villageName}
              onChange={handleVillageChange}
              disabled={!formData.district}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Village</option>
              {formData.state &&
                formData.district &&
                villageNames[formData.state]?.[formData.district]?.map(
                  (villageName) => (
                    <option key={villageName} value={villageName}>
                      {villageName}
                    </option>
                  )
                )}
            </select>
          </div>
        </div>

        {/* Sarpanch Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Sarpanch Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Sarpanch Name"
            value={formData.name}
            onChange={handleFormData}
            name="name"
            className={`w-full p-3 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:outline-none ${
              errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="contact"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="contact"
            placeholder="Enter Mobile Number"
            value={formData.contact}
            onChange={handleFormData}
            name="contact"
            className={`w-full p-3 border ${
              errors.contact ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:outline-none ${
              errors.contact ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* LGD Code */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="lgdCode"
          >
            LGD Code
          </label>
          <input
            type="text"
            id="lgdCode"
            placeholder="Enter LGD Code"
            value={formData.lgdCode}
            onChange={handleFormData}
            name="lgdCode"
            readOnly
            className={`w-full p-3 border ${
              errors.lgdCode ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:outline-none ${
              errors.lgdCode ? "focus:ring-red-500" : ""
            }`}
          />
          {errors.lgdCode && (
            <p className="text-red-500 text-sm mt-1">{errors.lgdCode}</p>
          )}
        </div>

        {/* Email ID */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email ID
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email Id"
            value={formData.email}
            onChange={handleFormData}
            name="email"
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:outline-none ${
              errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Aadhar Card */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="aadhar"
          >
            Aadhar Card
          </label>
          <input
            type="text"
            id="aadhar"
            placeholder="Enter Aadhar Number"
            value={formData.aadhar}
            onChange={handleFormData}
            name="aadhar"
            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageGp;
