import { format } from "date-fns";
import { RiArrowLeftLine, RiSendPlaneLine } from "react-icons/ri";
import { useState } from "react";
import { GrUpdate } from "react-icons/gr";

const ComplaintDetail = ({
  complaint,
  onBack,
  onUpdateStatus,
  onSendToAll,
}) => {
  const statusOptions = ["pending", "in-progress", "resolved", "rejected"];
  const [currentStatus, setCurrentStatus] = useState(complaint.status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    onUpdateStatus(complaint.id, newStatus);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <RiArrowLeftLine className="mr-2" /> Back to list
      </button>

      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{complaint.title}</h2>
          <select
            value={currentStatus}
            onChange={handleStatusChange}
            className={`px-3 py-2 capitalize rounded-md text-sm font-medium ${
              currentStatus === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : currentStatus === "resolved"
                ? "bg-green-100 text-green-800"
                : currentStatus === "in-progress"
                ? "bg-blue-100 text-blue-800"
                : currentStatus === "rejected"
                ? "bg-red-100 text-red-800"
                : ""
            }`}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-gray-600">{complaint.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{complaint.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">
              {format(new Date(complaint.date), "MMM d, yyyy h:mm a")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <p className="font-medium capitalize">{complaint.priority}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 max-md:flex-col max-md:gap-0.5">
          <button
            onClick={() => onSendToAll(complaint)}
            className="flex items-center justify-center w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 mt-4"
          >
            <RiSendPlaneLine className="mr-2" /> Send to All
          </button>
          {currentStatus !== complaint.status && (
            <button
              onClick={() => {
                onUpdateStatus(complaint.id, currentStatus);
                onBack();
              }}
              className="flex items-center justify-center w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 mt-4 max-md:mt-2"
            >
              <GrUpdate className="mr-2" /> Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
