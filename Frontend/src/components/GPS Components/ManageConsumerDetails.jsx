import React, { useState, useEffect } from "react";
import Button from "../ui/Button"; // Assuming the Button component is imported
import Illustration from "@/assets/GPS/illustrator.svg";
import { useAddConsumerMutation, useUpdateConsumerMutation } from "../../features/api/gpApi";
import { toast } from "sonner";

const ConsumerDetails = ({ consumer, mode, onBack }) => {
  const [consumerData, setConsumerData] = useState(consumer || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate consumerInputData dynamically based on the mode (add or edit)
  const [consumerInputData, setConsumerInputData] = useState({
    consumerName: "",
    email: "",
    contact: "",
    aadhar: "",
    address: "",
  });



  useEffect(() => {
    if (mode === "edit" && consumer) {
      setConsumerInputData(consumer); // Prefill data for edit mode
    }
  }, [mode, consumer]);

  useEffect(() => {
    if (mode === "view" && consumer) {
      setConsumerInputData(consumer); // Prefill data for edit mode
    }
  }, [mode, consumer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsumerInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBack = () => {
    onBack(); // Call the parent callback to handle the back action
  };

  const [addConsumer] = useAddConsumerMutation();
  const [updateConsumer] = useUpdateConsumerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setIsSubmitting(true); // Manage submitting state

    try {
      if (mode === "edit" && consumer && consumer._id) {
        // Update consumer if in 'edit' mode
        const response = await updateConsumer({
          userId: consumer._id, // Pass the correct consumer ID as userId
          updatedUser: consumerInputData, // Sending the updated data as updatedUser
        }).unwrap();

        console.log("Consumer updated successfully:", response);
        toast.success(response.message || "Consumer updated successfully!");
      } else if (mode === "add") {
        // Add new consumer if in 'add' mode
        const response = await addConsumer(consumerInputData).unwrap();

        console.log("Consumer added successfully:", response);
        toast.success(response.message || "Consumer added successfully!");

        // Reset the form after successful submission
        setConsumerInputData({
          consumerName: "",
          email: "",
          contact: "",
          aadhar: "",
          address: "",
        });
      }
    } catch (error) {
      console.error("Error in operation:", error);
      toast.error(error.data?.message || "Error in operation!");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="flex">
      {mode === "illustrator" ? (
        <div className="w-full flex justify-center items-center">
          <img src={Illustration} alt="Illustration" className="max-w-full h-auto" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full lg:w-[100%]">
          <h2 className="text-xl font-bold text-blue-600">
            {mode === "add" ? "Add Consumer" : mode === "edit" ? "Edit Consumer" : "Consumer Details"}
          </h2>

          {["consumerName", "email", "contact", "aadhar", "address"].map((field, index) => (
  <div key={index}>
    <label className="block font-bold">
      {`${field.charAt(0).toUpperCase() + field.slice(1)}:`}
    </label>
    <input
      type="text"
      name={field}
      value={mode === "view" ? consumerInputData[field] || "" : consumerInputData[field] || ""}
      onChange={handleInputChange}
      readOnly={mode === "view"}
      required={field !== "email"}
      className={`w-full border border-gray-300 rounded p-2 ${mode === "view" ? "cursor-not-allowed focus:outline-none" : ""}`}
    />
  </div>
))}

          <div className="flex justify-between">
            {mode === "add" || mode === "edit" ? (
              <>
                <button
                  type="submit"
                  disabled={isSubmitting || mode === "view"} // Disable the button in view mode
                  className="bg-transparent text-black border border-black py-2 px-4 rounded shadow hover:bg-black hover:text-white"
                >
                  {isSubmitting ? "Submitting..." : mode === "add" ? "Add Consumer" : "Update"}
                </button>
                <Button
                  variant="outline"
                  color="black"
                  onClick={handleBack}
                  className="text-black border-black py-2 px-4 rounded shadow hover:bg-black hover:text-white"
                >
                  Back
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                color="black"
                onClick={handleBack}
                className="text-black border-black py-2 px-4 rounded shadow hover:bg-black hover:text-white"
              >
                Back
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ConsumerDetails;
