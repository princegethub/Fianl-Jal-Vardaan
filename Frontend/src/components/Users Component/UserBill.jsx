import { useCreatePaymentMutation, useVerifyPaymentMutation } from "@/features/api/authApi";
import React, { useState } from "react";
import { useDispatch } from "react-redux"; // if you want to dispatch actions after payment success

function UserBillPage() {
  const [bills, setBills] = useState([
    { id: "bill1", gpName: "Karan Shrivastava", amount: 1000, dueDate: "2024-12-15", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    { id: "bill2", gpName: "Prince Mishra", amount: 500, dueDate: "2024-12-10", status: "Pending" },
    // Add other bills as needed
  ]);

  // Using the payment mutation hook
  const [createPayment] = useCreatePaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const handlePayNow = async (billId) => {
    try {
      const bill = bills.find((bill) => bill.id === billId);
      const amount = bill.amount;
  
      // Create the payment order by calling the backend API
      const { data: paymentData, error } = await createPayment({
        amount: amount * 100,  // Convert to paise
        currency: 'INR',  // Adjust the currency if needed
      });
  
      // Check for errors before proceeding
      if (error || !paymentData) {
        console.error("Error creating payment:", error);
        alert("Error initiating payment");
        return;
      }
  
      const { id, currency, amount: orderAmount } = paymentData;
  
      // Set up Razorpay options
      const options = {
        key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key ID
        amount: orderAmount * 100, // Amount in paise
        currency: currency,
        name: "PHED Bill Payment",
        description: `Payment for ${bill.gpName} Bill`,
        order_id: id,
        handler: async function (response) {
          try {
            const paymentDetails = {
              payment_id: response.razorpay_payment_id,
              order_id: id,
              signature: response.razorpay_signature,
            };
  
            // Verify the payment by calling the backend
            const { data } = await verifyPayment(paymentDetails);
  
            // Handle success
            if (data.message === "Payment successful") {
              // Update the bill status to 'Paid'
              setBills((prevBills) =>
                prevBills.map((bill) =>
                  bill.id === billId ? { ...bill, status: "Paid" } : bill
                )
              );
              alert("Payment successful!");
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            alert("Payment verification failed");
          }
        },
        theme: {
          color: "#FF9F00",
        },
      };
  
      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error initiating payment");
    }
  };
  

  return (

      <div className=" w-full bg-gradient-to-b py-10 from-blue-300 to-white  h-auto"> 
    <h2 className="text-center text-2xl shadow-lg w-[90vw] mx-auto  md:w-[80vw]  rounded-lg py-4 mb-2 font-bo">VIEW BILL</h2>
    <div className="w-[90vw] mx-auto  md:w-[80vw] h-[500px] overflow-x-hidden  overflow-y-auto scroll-m-2 ">
      {bills.map((bill) => (
        <div
          key={bill.id}
          className={`flex justify-between items-center  p-4 mb-4 rounded-lg shadow-md bg-gradient-to-b from-blue-300 to-white hover:scale-[1] transition-transform duration-300 ${
            bill.status === "Paid" ? "opacity-70" : ""
          }`}
        >
          <div>
            <h3 className="font-bold">{bill.gpName}</h3>
            <p>Amount: {bill.amount}</p>
            <p>Due Date: {bill.dueDate}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setSelectedBill(bill)}
            >
              Details
            </button>
            {bill.status === "Pending" && (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handlePayNow(bill.id)}
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default UserBillPage;
