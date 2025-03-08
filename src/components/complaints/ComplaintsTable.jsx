import { useState, useEffect } from "react";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import StatusBadge from "./StatusBadge";

const ITEMS_PER_PAGE = 5;

const ComplaintsTable = ({ complaints, onSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  useEffect(() => {
    const filterComplaints = () => {
      return complaints.filter((complaint) => {
        const matchesSearch = complaint.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          selectedStatus === "All" || complaint.status === selectedStatus;
        return matchesSearch && matchesStatus;
      });
    };

    const filtered = filterComplaints();
    setFilteredComplaints(filtered);
    setCurrentPage(1);
  }, [complaints, searchQuery, selectedStatus]);

  const totalPages = Math.ceil(filteredComplaints.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedComplaints = filteredComplaints.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 rounded text-sm"
        />
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border p-2 text-sm rounded"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <Table>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedComplaints.map((complaint) => (
            <tr
              key={complaint.id}
              onClick={() => onSelect(complaint)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {complaint.title}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500 line-clamp-2">
                  {complaint.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={complaint.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ComplaintsTable;
