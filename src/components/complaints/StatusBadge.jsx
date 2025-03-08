const getStatusStyles = (status) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    default: "bg-red-100 text-red-800",
  };
  return styles[status] || styles.default;
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 capitalize rounded-full text-sm font-medium ${getStatusStyles(
      status
    )}`}
  >
    {status}
  </span>
);

export default StatusBadge;
