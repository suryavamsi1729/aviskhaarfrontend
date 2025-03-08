import { RiUserLine, RiBarChartLine, RiAlertLine } from "react-icons/ri";
import AccidentsChart from "../components/charts/AccidentsChart";
import TrafficViolationsChart from "../components/charts/TrafficViolationsChart";
import { accidentsData, violationsData } from "../data/chartData";
import UserProfile from "../components/dashboard/UserProfile";

const StatCard = ({ icon, title, value, change }) => (
  <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl lg:text-2xl font-bold mt-2">{value}</p>
      </div>
      <div className="text-2xl lg:text-3xl text-blue-500">{icon}</div>
    </div>
    <p
      className={`text-sm mt-4 ${
        change >= 0 ? "text-green-500" : "text-red-500"
      }`}
    >
      {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
    </p>
  </div>
);

const Dashboard = () => {
  const stats = [
    { icon: <RiUserLine />, title: "Active Users", value: "1,234", change: 12 },
    {
      icon: <RiBarChartLine />,
      title: "Traffic Flow",
      value: "85%",
      change: -5,
    },
    { icon: <RiAlertLine />, title: "Incidents", value: "23", change: 8 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold mt-2 text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      <div className="mb-6">
        <UserProfile />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccidentsChart data={accidentsData} />
        <TrafficViolationsChart data={violationsData} />
      </div>
    </div>
  );
};

export default Dashboard;
