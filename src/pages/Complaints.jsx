import { useState } from "react";
import ComplaintsTable from "../components/complaints/ComplaintsTable";
import ComplaintDetail from "../components/complaints/ComplaintDetail";

const Complaints = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Traffic Signal Malfunction",
      description:
        "The traffic signal at Main St. and 5th Ave. has been malfunctioning for the past 2 days. This is causing significant delays during peak hours.",
      status: "pending",
      date: new Date(),
      location: "Main St. & 5th Ave",
      priority: "high",
    },
    {
      id: 2,
      title: "Street Light Out",
      description:
        "Multiple street lights are not working on Oak Avenue between 3rd and 4th Street. This is creating safety concerns for pedestrians at night.",
      status: "in-progress",
      date: new Date(),
      location: "Oak Avenue",
      priority: "medium",
    },
    {
      id: 3,
      title: "Pothole Damage",
      description:
        "Large pothole on Maple Street causing vehicle damage. Several cars have reported tire damage in the past week.",
      status: "resolved",
      date: new Date(),
      location: "Maple Street",
      priority: "high",
    },
    {
      id: 4,
      title: "Crosswalk Paint Fading",
      description:
        "The crosswalk markings at Pine Street intersection are severely faded and barely visible. Pedestrians are at risk.",
      status: "pending",
      date: new Date(),
      location: "Pine Street Crossing",
      priority: "medium",
    }
  ]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const updateStatus = (id, newStatus) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      )
    );
  };

  const sendToAll = (complaint) => {
    console.log("Sending complaint to all:", complaint);
  };

  return (
    <div className="">
      <h1 className="text-2xl mb-6 mt-2 lg:text-3xl font-bold text-gray-800">
        Complaints
      </h1>

      {selectedComplaint ? (
        <ComplaintDetail
          complaint={selectedComplaint}
          onBack={() => setSelectedComplaint(null)}
          onUpdateStatus={updateStatus}
          onSendToAll={sendToAll}
        />
      ) : (
        <ComplaintsTable
          complaints={complaints}
          onSelect={setSelectedComplaint}
        />
      )}
    </div>
  );
};

export default Complaints;
