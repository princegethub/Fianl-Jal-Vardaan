import React, { useState, useEffect } from "react";
import ListIllustration from "@/assets/GPS/RqstList-illustration.png";
import FormIllustration from "@/assets/GPS/RqstForm-illustration.png";
import { useSubmitIncomeMutation, useSubmitExpenditureMutation, useGetIncomeExpendQuery } from "../../features/api/gpApi";

const ReceiptsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    type: "Income",
    document: null,
  });
  const [submitIncome] = useSubmitIncomeMutation();
  const [submitExpenditure] = useSubmitExpenditureMutation();
  const { data, isLoading, isError, error } = useGetIncomeExpendQuery();
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    if (data) {
      setReceipts(data.data);
    }
  }, [data]);

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("category", formData.category);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("description", formData.description);
      if (formData.document) {
        formDataToSend.append("document", formData.document);
      }
      const newReceipt = {
        ...formData,
        amount: formData.type === "Expenditure" ? -Math.abs(formData.amount) : Math.abs(formData.amount),
        date: new Date().toLocaleString(),
      };
      setReceipts((prev) => [newReceipt, ...prev]);
      if (formData.type === "Income") {
        await submitIncome({
          category: formData.category,
          amount: formData.amount,
          description: formData.description,
          document: formData.document,
        }).unwrap();
      } else {
        await submitExpenditure({
          category: formData.category,
          amount: formData.amount,
          description: formData.description,
          document: formData.document,
        }).unwrap();
      }
      console.log("Form submitted successfully");
      setIsFormVisible(false);
      setFormData({ category: "", amount: "", description: "", type: "Income", document: null });
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-b from-blue-400 via-white to-white shadow-lg py-8 h-auto">
      <div className="w-[90vw] flex flex-col sm:flex-col lg:flex-row gap-8 mx-auto sm:w-[80vw]">
        {/* Left Section */}
        <div className="w-full sm:w-[90%] lg:w-1/2 rounded-lg flex justify-center bg-gradient-to-b from-blue-400 to-blue-200 items-center p-6 shadow-xl">
          {isFormVisible ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="block sm:hidden text-center text-gray-800 text-xl font-bold">Add Receipt</p>
              <img src={FormIllustration} alt="Form Illustration" className="hidden lg:block w-[400px] h-auto" />
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <p className="block sm:hidden text-center text-gray-800 text-xl font-bold">Receipts</p>
              <img src={ListIllustration} alt="List Illustration" className="hidden sm:block w-[400px] h-auto" />
            </div>
          )}
        </div>
        {/* Right Section */}
        <div className="w-full sm:w-[90%] lg:w-1/2 flex justify-center bg-gradient-to-b from-blue-400 to-blue-200 shadow-xl items-center p-6 rounded-lg">
          {isFormVisible ? (
            <form onSubmit={handleFormSubmit} className="space-y-4 w-full max-w-md">
              <h2 className="text-xl font-bold text-blue-600">Add a New Receipt</h2>
              <div>
                <label className="block font-bold mb-2">Category:</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded p-2" required>
                  <option value="">Select a category</option>
                  <option value="Government Grants">Government Grants</option>
                  <option value="Asset Repaired">Asset Repaired</option>
                  <option value="Donations">Donations</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Amount:</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} className="w-full border border-gray-300 rounded p-2" required />
              </div>
              <div>
                <label className="block font-bold mb-2">Type:</label>
                <div className="flex items-center space-x-4">
                  <label>
                    <input type="radio" name="type" value="Income" checked={formData.type === "Income"} onChange={handleInputChange} /> Income
                  </label>
                  <label>
                    <input type="radio" name="type" value="Expenditure" checked={formData.type === "Expenditure"} onChange={handleInputChange} /> Expenditure
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2">Description:</label>
                <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded p-2" required></textarea>
              </div>
              <div>
                <label className="block font-bold mb-2">Upload Document:</label>
                <input type="file" onChange={handleFileUpload} className="w-full border border-gray-300 rounded p-2" />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <button type="button" onClick={toggleForm} className="bg-gray-200 text-black py-2 px-4 rounded shadow hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full space-y-4">
              <h2 className="text-xl font-bold text-blue-600">Receipt List</h2>
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p className="text-red-600">Error: {error.message}</p>
              ) : (
                <div className="overflow-y-auto max-h-96">
                  <ul className="space-y-2">
                    {receipts.map((receipt, index) => (
                      <li
                        key={index}
                        className={`p-4 border rounded shadow ${
                          receipt.type === "Income" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                  <div className=" flex flex-row justify-between -mt-1">     <div className="font-bold">{receipt.category}</div>  <div className="text-gray-400 opacity-75"> {receipt.type}</div></div> 
                        <div>Amount: {receipt.amount}</div>
                        <div>Description: {receipt.description}</div>
                      
                        <div>Date: {receipt.date}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={toggleForm} className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700">
                Add New Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptsPage;
