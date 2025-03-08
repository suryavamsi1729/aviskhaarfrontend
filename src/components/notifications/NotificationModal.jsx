import { useState } from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";

const NotificationModal = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, links });
    setTitle("");
    setDescription("");
    setLinks([]);
  };

  const addLink = () => {
    if (newLink && !links.includes(newLink)) {
      setLinks([...links, newLink]);
      setNewLink("");
    }
  };

  const removeLink = (linkToRemove) => {
    setLinks(links.filter((link) => link !== linkToRemove));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of Notification"
            className="mt-2 text-sm w-full rounded border border-gray-300 px-2 py-1.5"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 text-sm w-full rounded border border-gray-300 px-2 py-1.5"
            rows="3"
            placeholder="Description of Notification"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Add Links
          </label>
          <div className="flex gapx-2 py-1.5 mt-1">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="flex-1 text-sm rounded rounded-r-none border border-gray-300 px-2 py-1.5"
              placeholder="https://"
            />
            <button
              type="button"
              onClick={addLink}
              className="px-2.5 py-1.5 bg-primary text-white rounded rounded-l-none hover:bg-primary/90"
            >
              <RiAddLine />
            </button>
          </div>
        </div>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-x-2 pb-2 mt-[-10px]">
            {links.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-x-2 bg-gray-100 px-3 py-1 rounded-full"
              >
                <span className="text-sm truncate max-w-[200px]">{link}</span>
                <button
                  type="button"
                  onClick={() => removeLink(link)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <RiCloseLine />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
        >
          Add Notification
        </button>
      </div>
    </form>
  );
};

export default NotificationModal;
