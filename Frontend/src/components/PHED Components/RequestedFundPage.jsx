import React, { useEffect, useState } from "react";
import FundListCard from "./FundListCard";
import FundDetailsDialog from "./FundDetailsDialog";
import RqstFund from "../../assets/PHED/fundRqst.png";
import "../../App.css";
import {
  useFundRequestedPhedQuery,
  useStatusCompleteFundRqstPhedMutation,
} from "@/features/api/phedApi";
import { toast } from "sonner";

function RequestFundPage() {
  const [selectedFund, setSelectedFund] = useState(null);
  const [fundRequests, setFundRequests] = useState([]);

  const { data, isSuccess, isError, isLoading } = useFundRequestedPhedQuery();
  const [StatusCompleteFundRqstPhed] = useStatusCompleteFundRqstPhedMutation();

  // Update fundRequests state when data is successfully fetched
  useEffect(() => {
    if (isSuccess && data?.fundRequests) {
      setFundRequests(data.fundRequests);
    }
  }, [data, isSuccess]);

  const handlePaid = async (fundId) => {
    try {
    let response=   await StatusCompleteFundRqstPhed(fundId).unwrap();
      toast.success(response.message || "Fund Request Status Updated");
      setSelectedFund(null);
    } catch (error) {
      console.error("Error updating fund status:", error);
    }
  };

  return (
    <div className="h-auto py-12 bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex flex-col items-center">
      <div className="w-[90vw] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="hidden md:block w-full md:w-[30%]">
            <div className="bg-gradient-to-b from-[#4EB4F8] py-4 px-2 via-[#D8E9FF] to-white rounded-lg shadow-lg">
              <img
                src={RqstFund}
                alt="Illustration"
                className="w-[420px] h-[450px]"
              />
            </div>
          </div>

          <div className="w-full md:w-[70%]">
            <div className="max-h-[470px] overflow-y-scroll custom-scrollbar">
              {isLoading && <p>Loading fund requests...</p>}
              {isError && <p>Error fetching fund requests.</p>}
              {isSuccess && (
                <FundListCard
                  fundRequests={fundRequests}
                  onFundClick={(fund) => setSelectedFund(fund)}
                  onButtonClick={(fund) => setSelectedFund(fund)}
                />
              )}
            </div>
          </div>
        </div>

        {selectedFund && (
          <FundDetailsDialog
            fund={selectedFund}
            onClose={() => setSelectedFund(null)}
            onPaid={handlePaid}
          />
        )}
      </div>
    </div>
  );
}

export default RequestFundPage;
