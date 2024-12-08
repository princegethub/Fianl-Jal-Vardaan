import { toast } from "sonner";
import { useGpDeleteMutation } from "../../features/api/phedApi";
import { useNavigate } from "react-router";

const ManageGpList = ({ data, onAdd, onEdit }) => {
  // Use the mutation hook outside the event handler
  const [gpDelete, { isLoading, isSuccess, error }] = useGpDeleteMutation();
  const navigate = useNavigate();
  // Handle the delete action
  const handleDeleteGp = async (id) => {
    try {
      // Call the mutation
      const response = await gpDelete(id).unwrap();
      if (isSuccess) {
        toast.success(response.message || "Gram Panchayat deleted successfully");
        navigate("/phed/managegp")
      }
    } catch (error) {
      console.error("Error deleting Gram Panchayat:", error);
      toast.error("Error deleting Gram Panchayat");
    }
  };

  return (
    <div className="w-full lg:w-[50%] shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Active Gram Panchayats
      </h2>
      <div
        className="overflow-y-auto max-h-[50vh]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#4EB4F8 transparent",
        }}
      >
        <ul className="space-y-4">
          {data.map((gp) => (
            <li
              key={gp._id}
              className="flex items-center justify-between bg-[#e0f2ff] text-blue-700 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                  {gp.name.charAt(0)}
                </div>
                <span className="text-lg">{gp.name}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(gp._id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteGp(gp._id)}
                  className="text-red-500 hover:underline"
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onAdd}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center space-x-2"
      >
        <span>➕</span>
        <span>Add Gram Panchayat</span>
      </button>
    </div>
  );
};

export default ManageGpList;
