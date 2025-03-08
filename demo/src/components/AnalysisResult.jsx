import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function AnalysisResult({ captions, summary, status }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center gap-2">
        {status === 'positive' ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <AlertTriangle className="w-6 h-6 text-red-500" />
        )}
        <h2 className="text-xl font-semibold">Analysis Result</h2>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Captions:</h3>
        <p className="text-gray-600">{captions}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Summary:</h3>
        <p className="text-gray-600">{summary}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Status:</span>
        <span className={status === 'positive' ? 'text-green-600' : 'text-red-600'}>
          {status === 'positive' ? 'Safe' : 'Incident Detected'}
        </span>
      </div>
    </div>
  );
}