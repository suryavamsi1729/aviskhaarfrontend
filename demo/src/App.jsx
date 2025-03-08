import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import VideoCard from './components/VideoCard';
import AnalysisResult from './components/AnalysisResult';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeVideo } from './utils/videoAnalysis';

// Sample videos data
const sampleVideos = [
  {
    id: 1,
    title: 'Normal Traffic Flow',
    url: 'sample1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    title: 'Busy Intersection',
    url: 'sample2.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    title: 'Traffic Incident',
    url: 'sample3.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1566019055666-ff0cd583b31f?auto=format&fit=crop&q=80&w=1000',
  },
];

function App() {
  const [dragActive, setDragActive] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setIsLoading(true);
    try {
      const result = await analyzeVideo();
      setAnalysis(result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);
      try {
        const result = await analyzeVideo();
        setAnalysis(result);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSampleDrag = (e, url) => {
    e.dataTransfer.setData('text/plain', url);
  };

  const handleVideoClick = async (url) => {
    setIsLoading(true);
    try {
      const result = await analyzeVideo();
      setAnalysis(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">SWATS Demo</h1>
        
        <div 
          className={`w-full max-w-2xl mx-auto mb-8 h-64 rounded-lg border-2 border-dashed 
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} 
            flex items-center justify-center transition-colors duration-200`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center p-6">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">Drag and drop video file here</p>
                <p className="text-gray-500 text-sm">or</p>
                <label className="mt-2 inline-block">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                    Browse Files
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {analysis && !isLoading && (
          <div className="max-w-2xl mx-auto mb-8">
            <AnalysisResult {...analysis} />
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Sample Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleVideos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                url={video.url}
                thumbnail={video.thumbnail}
                onDragStart={handleSampleDrag}
                onClick={handleVideoClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;