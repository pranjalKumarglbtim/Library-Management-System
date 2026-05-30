import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="text-center">
        {/* Animated Book Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <div className="w-32 h-32 mx-auto bg-white/30 rounded-full"></div>
          </div>
          <div className="relative">
            <span className="text-9xl animate-float drop-shadow-2xl">📚</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-4 neon-text animate-fade-in-up">
          Library Management System
        </h1>
        
        <p className="text-xl text-indigo-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Loading your library...
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-white to-indigo-200 transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          </div>
          <p className="text-white mt-2 font-bold">{progress}%</p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};
