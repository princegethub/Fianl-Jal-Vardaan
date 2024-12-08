import React from 'react';
import { toast } from 'sonner';

const ConsumerList = ({ consumers, onAction, onAddConsumer, isActive, setIsActive, deleteConsumer }) => {



  const toggleIsActive = () => {
    setIsActive((prevIsActive) => {
      const newState = !prevIsActive;
      console.log("prev", prevIsActive)
      console.log(newState ? "ACTIVE" : "INACTIVE"); // Log active or inactive state
      return newState;
    });
  };

  console.log("consumers", consumers);

  const handleView = (consumer) => {
    console.log(`View button clicked for consumer: ${consumer.consumerName}`);
    onAction(consumer, 'view'); // Set mode to 'view'
  };

  const handleEdit = (consumer) => {
    console.log(`Edit button clicked for consumer: ${consumer.consumerName}`);
    onAction(consumer, 'edit'); // Set mode to 'edit'
  };

  const handleDelete = async (consumer) => {
    console.log(`Delete button clicked for consumer: ${consumer.consumerName}`);
    try {
      await deleteConsumer({ userId: consumer._id });
      toast.message(`Consumer ${consumer.consumerName} deleted successfully`)  // Pass userId of the consumer to be deleted
      // console.log(`Consumer ${consumer.consumerName} deleted successfully`);
    } catch (error) {
      console.error("Error deleting consumer:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row items-center w-full shadow-lg my-2 py-4 mx-auto rounded-lg">
        <div className="flex justify-center items-center mx-auto">
          <span
            className={`mr-4 font-bold text-xl transition-colors duration-300 ease-in-out ${isActive ? "text-blue-400" : "text-blue-800"}`}
          >
            INACTIVE
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              checked={isActive}
              onChange={toggleIsActive}
            />
            <div className="peer rounded-full outline-none duration-100 w-[6rem] h-8 bg-blue-300 peer-focus:outline-none relative">
              <div
                className={`absolute top-[6px] left-1 w-5 h-5 rounded-full transition-all duration-300 ease-in-out ${isActive ? "translate-x-16 bg-blue-800" : "bg-white"
                  }`}
              />
            </div>
          </label>
          <span
            className={`ml-4 font-bold text-xl transition-colors duration-300 ease-in-out ${isActive ? "text-blue-800" : "text-blue-400"}`}
          >
            ACTIVE
          </span>
        </div>
      </div>

      <div className="overflow-y-auto h-[63vh]">
        <ul className="space-y-4">
          {consumers.map((consumer) => (
            <li key={consumer._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
              <div>
                <p className="font-bold">{consumer.consumerName}</p>
                <p>Consumer ID: {consumer.consumerId}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleView(consumer)} className="text-gray-700 text-sm hover:text-gray-600">
                  <i className="fas fa-eye text-md mr-2"></i>
                </button>
                <button onClick={() => handleEdit(consumer)} className="text-gray-700 text-sm hover:text-gray-600">
                  <i className="fas fa-edit text-md mr-2"></i>
                </button>
                <button onClick={() => handleDelete(consumer)} className="text-gray-700 text-sm hover:text-gray-600">
                  <i className="fas fa-trash text-md mr-2"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Consumer Button */}
      <div className="flex m-2">
        <button
          onClick={onAddConsumer}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-500"
        >
          Add Consumer
        </button>
      </div>
    </div>
  );
};

export default ConsumerList;
