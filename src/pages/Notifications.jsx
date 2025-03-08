import { useState } from "react";
import NotificationList from "../components/notifications/NotificationList";
import NotificationModal from "../components/notifications/NotificationModal";
import { RiAddLine } from "react-icons/ri";

import Modal from "../components/ui/Modal";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Maintenance",
      description: "Scheduled maintenance on Friday",
      links: ["https://example.com/maintenance"],
      date: new Date(),
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNotification = (notification) => {
    setNotifications([
      { ...notification, id: Date.now(), date: new Date() },
      ...notifications,
    ]);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="py-2">
      <div className="flex mb-8 justify-between items-center max-lg:flex-col max-lg:items-start max-lg:justify-start max-lg:gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Notifications
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <RiAddLine className="mr-2" /> New Notification
        </button>
      </div>

      <Modal
        title={"Add Notifications"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <NotificationModal
          onSubmit={() => {
            addNotification;
            setIsModalOpen(false);
          }}
        />
      </Modal>

      <NotificationList
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
};

export default Notifications;
