import React, { useState, useEffect } from 'react';
import { Play, AlertCircle } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkVideoAccess = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(videoUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Video not accessible: ${response.status} ${response.statusText}`);
        }

        setIsLoading(false);
      } catch (err: any) {
        setError(`Failed to load video: ${err.message || 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    checkVideoAccess();
  }, [videoUrl]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center p-4">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 text-red-500" />
            <p className="whitespace-pre-line">{error}</p>
            <button
              onClick={() => {
                setIsLoading(true);
                setError(null);
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              type="button"
              aria-label="Try loading video again"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      {!isLoading && !error && (
        <div className="relative w-full">
          <video
            src={videoUrl}
            className="w-full h-auto object-contain"
            controls
            title={title}
            style={{ maxHeight: '80vh' }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 