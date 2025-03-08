import StatusBadge from "./StatusBadge";

const ComplaintList = ({ complaints, onSelect }) => {
  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <div
          key={complaint.id}
          onClick={() => onSelect(complaint)}
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{complaint.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {complaint.description}
              </p>
            </div>
            <StatusBadge status={complaint.status} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
