const Table = ({ children, className = "" }) => (
  <div className="w-full overflow-x-auto">
    <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
      {children}
    </table>
  </div>
);

export default Table;
