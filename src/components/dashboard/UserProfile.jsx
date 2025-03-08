import { RiUserLine, RiMailLine, RiMapPinLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">
            {user.name.charAt(0)}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">STAWS Admin</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start text-gray-600">
          <RiMailLine className="mr-3 mt-1" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-start text-gray-600">
          <RiMapPinLine className="mr-3 mt-1" />
          <span>{user.locationId}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
