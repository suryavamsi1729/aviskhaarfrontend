import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl lg:text-5xl font-bold text-center text-gray-800 mb-8">
        Welcome to STAWS
      </h1>
      <p className="text-xl text-gray-600 text-center mb-8">
        Monitor your traffic cameras and get status captions in real-time
      </p>
      <Link
        to="/login"
        className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
