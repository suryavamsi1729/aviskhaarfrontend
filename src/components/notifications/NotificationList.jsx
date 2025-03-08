import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";

const NotificationList = ({ notifications, onRemove }) => {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-gray-600 mt-2">{notification.description}</p>
              {notification.links?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {notification.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500 mt-3">
                {format(notification.date, "MMM d, yyyy h:mm a")}
              </p>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <RiDeleteBin6Line size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
