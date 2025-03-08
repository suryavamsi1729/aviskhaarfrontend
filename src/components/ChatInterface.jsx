import React, { useState, useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { postChat } from "../api";

const ChatInterface = ({ isOpen, onClose, chatOpen }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      let updatedMessages = [];

      if (newMessage.trim() === "/cls") {
        updatedMessages = [];
      } else if (newMessage.trim() === "/close") {
        onClose();
        return;
      } else {
        updatedMessages = [...messages, { sender: "user", text: newMessage }];

        try {
          const responseMessage = await postChat({ input: newMessage });
          updatedMessages.push({ sender: "bot", text: responseMessage.text });
        } catch (error) {
          console.error(error.message);
        }
      }

      setMessages(updatedMessages);
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      setNewMessage("");
    }
  };

  const handleOutsideClick = (event) => {
    if (
      chatBoxRef.current &&
      !chatOpen.current.contains(event.target) &&
      !chatBoxRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-[4.8rem] right-8 w-[90%] max-w-[32rem] aspect-square bg-white border shadow-lg rounded-lg max-md:w-full max-md:h-screen max-md:bottom-0 max-md:left-0 max-md:z-[51]"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold font-sans">Chat Bot</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdClose size={22} />
            </button>
          </div>
          <div className="p-4 h-[75%] max-md:h-[calc(100%-132px)] overflow-y-auto flex flex-col space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`self-start my-2 p-2 rounded ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-10"
                    : "bg-gray-300 text-black self-start mr-10"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t relative flex items-stretch">
            <input
              type="text"
              className="flex-1 border rounded-md p-2 py-1.5 mr-2"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary hover:bg-primary/90 text-white p-2 px-3 rounded-md flex items-center justify-center"
            >
              <IoMdSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInterface;
