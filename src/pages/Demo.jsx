import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import video from "../assets/video.mp4";

const captions = [
  {
    time: 0,
    text: "The video begins with an introduction to responsive design.",
  },
  { time: 1, text: "A modern web page layout is shown as an example." },
  {
    time: 2,
    text: "The narrator explains the importance of mobile-first design.",
  },
  {
    time: 3,
    text: "A comparison between static and dynamic layouts is displayed.",
  },
  { time: 4, text: "Focus shifts to the role of CSS in layout adjustments." },
  {
    time: 5,
    text: "Demonstration of how media queries enhance responsiveness.",
  },
  { time: 6, text: "An example of grid-based layouts is highlighted." },
  {
    time: 7,
    text: "Tips on using Flexbox for alignment and spacing are shared.",
  },
  {
    time: 8,
    text: "The narrator emphasizes the significance of accessibility.",
  },
  {
    time: 9,
    text: "The video concludes with key takeaways on responsive design.",
  },
];

const Camera = () => {
  const videoRef = useRef(null);
  const captionsRef = useRef(null);
  const [captionsList, setCaptionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCaption, setCurrentCaption] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const summary =
    "The summary describes a series of images showing car accidents and vehicle damage scenarios in various settings, including collisions, mechanical failures, and environmental challenges. The images depict damaged vehicles with details like bent suspension components, emitting smoke, and muddy terrain, as well as the aftermath of accidents with cones set up and a person inside a partially damaged car. The scenes suggest hazardous driving conditions and the need for repairs or scrapping.";
  const status = "negative";

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = Math.floor(videoRef.current.currentTime);
      const newCaption = captions.find((cap) => cap.time === currentTime);

      if (newCaption) {
        setCurrentCaption(newCaption);
        if (!captionsList.some((c) => c.time === newCaption.time)) {
          setCaptionsList((prevCaptions) => [...prevCaptions, newCaption]);
        }

        // Custom scrolling logic
        setTimeout(() => {
          const activeElement = document.getElementById(
            `caption-${newCaption.time}`
          );
          if (activeElement && captionsRef.current) {
            const { offsetTop } = activeElement;
            const scrollContainer = captionsRef.current;

            // Scroll ensuring 200px from the start is visible
            scrollContainer.scrollTo({
              top: offsetTop - 200 > 0 ? offsetTop - 220 : 0,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    };

    const handleLoadedData = () => setIsLoading(false);
    const handlePause = () => setIsPaused(true);
    const handlePlay = () => setIsPaused(false);
    const handleVideoEnd = () => setTimeout(setShowReport(true), 1000);

    const video = videoRef.current;
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);
    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [captionsList]);

  return (
    <div className="w-full mt-[120px] flex flex-col items-center p-6">
      <h2 className="text-2xl max-md:text-xl text-secondary font-raleway font-semibold mb-6">
        Video Caption Viewer
      </h2>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 mt-3">
        <div className="flex-1 bg-white shadow-md rounded-lg overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
              <p className="text-gray-700 font-semibold">Loading video...</p>
            </div>
          )}
          <video
            ref={videoRef}
            src={video}
            muted
            autoPlay
            controls
            className="w-full h-[300px] md:h-full"
          ></video>
        </div>

        <div
          ref={captionsRef}
          className="flex-1 bg-white shadow-md rounded-lg p-4 h-[300px] overflow-y-auto max-lg:max-h-[300px]"
        >
          <h3 className="text-xl font-raleway font-semibold mb-4 text-gray-800">
            Captions:
          </h3>
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {captionsList.map((caption, index) => (
                <li
                  key={index}
                  id={`caption-${caption.time}`}
                  className={`text-gray-700 text-base bg-gray-100 p-2 rounded-md ${
                    caption.time === currentCaption?.time
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  <span className="flex items-start gap-2.5">
                    <span className="text-gray-500 pt-0.5 text-sm ml-4">{`[${caption.time}s]`}</span>
                    {caption.text}
                  </span>
                </li>
              ))}

              {isPaused && (
                <li className="text-gray-700 bg-gray-100 p-2 rounded-md text-sm">
                  Paused...
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      {showReport && (
        <div className="bg-white w-full max-w-6xl rounded-lg shadow-md mt-12 p-6 space-y-4">
          <div className="flex items-center gap-2">
            {status === "positive" ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-red-500" />
            )}
            <h2 className="text-xl font-semibold">Analysis Result</h2>
          </div>

          <div>
            <h3 className="font-medium mb-2">Summary:</h3>
            <p className="text-gray-600">{summary}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <span
              className={
                status === "positive" ? "text-green-600" : "text-red-600"
              }
            >
              {status === "positive" ? "Safe" : "Incident Detected"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
