import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatInterface from "./ChatInterface";
import { IoChatboxEllipses } from "react-icons/io5";
import { useRef } from "react";

const DashboardLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatOpenRef = useRef(null);

  const handleChatOpen = () => {
    if (!isChatOpen) {
      setIsChatOpen(true);
    } else {
      setIsChatOpen(false);
    }
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full relative lg:ml-64 p-4 lg:p-8">
        <Outlet />
        <button
          onClick={handleChatOpen}
          ref={chatOpenRef}
          className="fixed bottom-5 right-5 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          <IoChatboxEllipses className="w-6 h-6" />
        </button>
        <ChatInterface
          isOpen={isChatOpen}
          onClose={handleChatClose}
          chatOpen={chatOpenRef}
        />
      </main>
    </div>
  );
};

export default DashboardLayout;
