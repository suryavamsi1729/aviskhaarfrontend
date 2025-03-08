import React from 'react';
import { Video } from 'lucide-react';

export default function VideoCard({ title, url, thumbnail, onDragStart, onClick }) {
  return (
    <div
      className="relative group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden"
      draggable
      onDragStart={(e) => onDragStart(e, url)}
      onClick={() => onClick(url)}
    >
      <div className="aspect-video relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
          <Video className="w-12 h-12 text-white opacity-70 group-hover:opacity-100" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
    </div>
  );
}