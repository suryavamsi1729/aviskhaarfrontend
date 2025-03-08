import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  RiHome4Line,
  RiMenuLine,
  RiCloseLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import logo from "../assets/logo.svg";
import { GiCctvCamera } from "react-icons/gi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { FaCode } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem(import.meta.env.VITE_APP_TOKEN);
    dispatch(userActions.removeUser());
    toast.success("Logged Out Succesfully");
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", icon: <RiHome4Line />, label: "Home" },
    { path: "/cameras", icon: <GiCctvCamera />, label: "Cameras" },
    {
      path: "/complaints",
      icon: <AiOutlineExclamationCircle />,
      label: "Reports",
    },
    {
      path: "/notifications",
      icon: <IoNotificationsOutline />,
      label: "Notifications",
    },
    {
      path: "/demo",
      icon: <FaCode />,
      label: "Demo",
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white h-screen fixed left-0 top-0 z-40 shadow-lg transition-transform duration-300 lg:translate-x-0 w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 h-[70px]">
          <Link to="/dashboard">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="h-12 w-12" />
              <h1 className="font-raleway text-lg font-bold pt-1.5 ml-[-5px]">
                STAWS
              </h1>
            </div>
          </Link>
        </div>

        <nav className="mt-4 h-[calc(100%-230px)]">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                  isActive
                    ? "bg-gray-100 border-r-4 border-primary text-primary"
                    : ""
                }`
              }
            >
              <span className="text-xl mr-4">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t h-[160px] border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-lg font-semibold">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 line-clamp-1">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 line-clamp-1">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <RiLogoutBoxRLine className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
