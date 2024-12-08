import React, { useState } from "react";
import ListIllustration from "@/assets/GPS/RqstList-illustration.png"; // Replace with your illustration path
import FormIllustration from "@/assets/GPS/RqstForm-illustration.png"; // Replace with your illustration path
import { useSubmitIncomeMutation, useSubmitExpenditureMutation } from "../../features/api/gpApi"; // Replace with your actual API import
const ReceiptsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [receipts, setReceipts] = useState([
    {
      category: "Government Grants",
      amount: 13000,
      description: "Funds allocated for road maintenance.",
      date: "12-04-2024 04:15pm",
      type: "Income",
    },
    {
      category: "Asset Repaired",
      amount: -1590,
      description: "Repair cost for broken pipeline.",
      date: "12-04-2024 04:15pm",
      type: "Expenditure",
    },
  ]); // Initial receipts data
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    type: "Income",
    document
  });
  const [submitIncome] = useSubmitIncomeMutation(); // Hook for API mutation
  const [SubmitExpenditure] = useSubmitExpenditureMutation(); // Hook for API mutation
  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field Changed: ${name}, Value: ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(`File Uploaded: ${file.name}`);
    setFormData((prev) => ({ ...prev, document: file }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted with Data:", formData);
    const newReceipt = {
      ...formData,
      amount: formData.type === "Expenditure" ? -Math.abs(formData.amount) : Math.abs(formData.amount),
      date: new Date().
        toLocaleString(), // Add current date and time
    };
    console.log("New Receipt Created:", newReceipt);
    // Add the new receipt to the list
    setReceipts((prev) => [newReceipt, ...prev]);
    // If type is Income, make the API call
    if (formData.type === "Income") {
      try {
        console.log("Submitting Expenditure Data to API...");
        await submitIncome({
          category: formData.category,
          amount: formData.amount,
          description: formData.description,
          document: formData.document,
        }).unwrap();
        console.log("expenditure submitted successfully");
      } catch (error) {
        console.error('Error submitting income:', error);
      }
    }
    else {
      try {
        console.log("Submitting Expenditure Data to API...");
        await SubmitExpenditure({
          category: formData.category,
          amount: formData.amount,
          description: formData.description,
          document: formData.document,
        }).unwrap();
        console.log("expenditure submitted successfully");
      } catch (error) {
        console.error("Error submitting income:", error);
      }
    }
    // Reset form and close it
    setIsFormVisible(false);
    setFormData({ category: "", amount: "", description: "", type: "Income", document: null });
  };
  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-b from-blue-400 via-white to-white shadow-lg py-8 h-auto">
      <div className="w-[90vw] flex flex-col sm:flex-col lg:flex-row gap-8 mx-auto sm:w-[80vw]">
        {/* Left Section */}
        <div className="w-full sm:w-[90%] lg:w-1/2 rounded-lg flex justify-center bg-gradient-to-b from-blue-400 to-blue-200 items-center p-6 shadow-xl">
          {isFormVisible ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="block sm:hidden text-center text-gray-800 text-xl font-bold">
                Add Receipt
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
                Receipts
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
              action="/upload"
              encType={'multipart/form-data'}
              onSubmit={handleFormSubmit}
              className="space-y-4 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-blue-600">
                Add a New Receipt
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
                  <option value="Government Grants">Government Grants</option>
                  <option value="Asset Repaired">Asset Repaired</option>
                  <option value="Donations">Donations</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Amount:</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Type:</label>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="Income"
                      checked={formData.type === "Income"}
                      onChange={handleInputChange}
                    />{" "}
                    Income
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="Expenditure"
                      checked={formData.type === "Expenditure"}
                      onChange={handleInputChange}
                    />{" "}
                    Expenditure
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2">Description:</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block font-bold mb-2">Upload Document:</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full border border-gray-300 rounded p-2"
                />
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
              <h2 className="text-xl font-bold text-blue-600">Receipts</h2>
              {/* Scrollable list */}
              <ul className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
                {receipts.map((receipt, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded shadow-lg border ${receipt.amount < 0
                        ? "bg-red-100 border-red-300"
                        : "bg-green-100 border-green-300"
                      }`}
                  >
                    <p className="font-bold">{`Category: ${receipt.category}`}</p>
                    <p className="text-sm">{`Date: ${receipt.date}`}</p>
                    <p>{`Amount: ₹${Math.abs(receipt.amount)}`}</p>
                    <p>{`Type: ${receipt.type}`}</p>
                    <p>{`Description: ${receipt.description}`}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={toggleForm}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
              >
                + Add New Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReceiptsPage;




