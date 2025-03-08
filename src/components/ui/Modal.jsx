import { RiCloseLine } from "react-icons/ri";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed top-0 cursor-pointer left-0 inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[52] space-y-0"
    >
      <div
        className="bg-white cursor-auto rounded-lg w-full max-w-md p-6 animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RiCloseLine size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
