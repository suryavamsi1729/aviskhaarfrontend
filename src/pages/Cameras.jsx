import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Cameras = () => {
  const [cameras] = useState([
    { id: 1, name: "Camera 1", location: "Main Entrance" },
    { id: 2, name: "Camera 2", location: "Parking Lot" },
    { id: 3, name: "Camera 3", location: "Back Gate" },
  ]);
  const [search, setSearch] = useState("");
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredCameras = cameras.filter(
    (camera) =>
      camera.name.toLowerCase().includes(search.toLowerCase()) ||
      camera.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
    setShowCalendar(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl mt-2 font-bold text-gray-800 mb-6 lg:mb-8">
        Cameras
      </h1>

      <div className="mb-4 lg:mb-6">
        <input
          type="text"
          placeholder="Search cameras..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredCameras.map((camera) => (
          <div
            key={camera.id}
            className="bg-white p-4 lg:p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCameraClick(camera)}
          >
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
              {camera.name}
            </h2>
            <p className="text-gray-600 mt-2">{camera.location}</p>
          </div>
        ))}
      </div>

      {showCalendar && selectedCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 lg:p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg lg:text-xl font-semibold mb-4">
              {selectedCamera.name}
            </h2>
            <div className="calendar-container max-w-full overflow-auto">
              <Calendar onChange={handleDateSelect} value={selectedDate} />
            </div>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full lg:w-auto"
              onClick={() => setShowCalendar(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedCamera && !showCalendar && (
        <div className="mt-4 lg:mt-6 bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">
            {selectedCamera.name} - {selectedDate.toLocaleDateString()}
          </h2>
          <p className="text-gray-600">Status: Online</p>
          <p className="text-gray-600">Recordings available</p>
        </div>
      )}
    </div>
  );
};

export default Cameras;
