import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";

function FormDialogAssetInventory({
  isOpen,
  onClose,
  isAssetView,
  formData,
  onFormSubmit,
}) {
  const [lgdCode, setLgdCode] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  // List of categories for assets and inventory
  const assetCategories = [
    "Pump Pipe Water",
    "Pipe Fittings",
    "Water Tank",
    "Water Purifier",
    "Valve",
    "Pump",
    "Water Meter",
    "Tubing",
  ];

  const inventoryCategories = [
    "Office Supplies",
    "Cleaning Tools",
    "Electric Components",
    "Construction Materials",
    "Safety Gear",
  ];

  // Populate form if editing (update)
  useEffect(() => {
    if (formData) {
      setLgdCode(formData.lgdCode || "");
      setCategory(formData.category || "");
      setQuantity(formData.quantity || "");
      setDescription(formData.description || "");
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      lgdCode,
      category,
      quantity,
      description,
    };
    onFormSubmit(data); // Pass data up to parent for handling API call

    // Reset the form fields after submission
    setLgdCode("");
    setCategory("");
    setQuantity("");
    setDescription("");

    onClose(); // Close dialog after form submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>
        <button className="hidden"></button>{" "}
        {/* Invisible trigger for controlled dialog */}
      </DialogTrigger>
      <DialogOverlay className="bg-black/30 fixed inset-0" />
      <DialogContent className="w-full max-w-md p-6 bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-blue-200 rounded shadow-lg">
        <DialogTitle className="text-2xl font-bold mb-4">
          {isAssetView ? "Add Asset" : "Add Inventory"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 p-2  rounded"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {(isAssetView ? assetCategories : inventoryCategories).map(
                (cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="lgdCode">
              LGD Code
            </label>
            <input
              type="text"
              id="lgdCode"
              value={lgdCode}
              onChange={(e) => setLgdCode(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormDialogAssetInventory;
