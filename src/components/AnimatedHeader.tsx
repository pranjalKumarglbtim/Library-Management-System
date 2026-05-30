import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export const AnimatedHeader = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.forEach((particle2, index2) => {
          if (index !== index2) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <header className="relative bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 shadow-2xl overflow-hidden border-b border-gray-700">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.4 }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 animate-slide-in-left">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full animate-pulse-glow"></div>
              <span className="relative text-6xl animate-float">📖</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                Library Management System
              </h1>
              <p className="text-gray-300 text-lg mt-1 animate-shimmer">
                Manage your library operations efficiently
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <div className="glass-morphism px-6 py-3 rounded-full bg-gray-800/30 border border-gray-700/50 hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-gray-200 font-semibold">System Online</span>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center space-x-3">
                <div className="glass-morphism px-4 py-2 rounded-full bg-gray-800/30 border border-gray-700/50">
                  <span className="text-gray-200 text-sm">👤 {user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-ripple px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            fill="#111827"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </header>
  );
};
