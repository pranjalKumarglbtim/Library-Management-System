import React, { useEffect, useState } from 'react';
import { LibraryStats } from '../types';

interface StatisticsProps {
  stats: LibraryStats;
}

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      current += increment;
      step++;
      setDisplayValue(Math.floor(current));
      
      if (step >= steps) {
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
};

export const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  const statItems = [
    {
      name: 'Total Books',
      value: stats.totalBooks,
      icon: '📚',
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
      delay: '0s',
      key: 'totalBooks',
    },
    {
      name: 'Available Books',
      value: stats.availableBooks,
      icon: '✅',
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-gradient-to-br from-green-400 to-green-600',
      delay: '0.1s',
      key: 'availableBooks',
    },
    {
      name: 'Borrowed Books',
      value: stats.borrowedBooks,
      icon: '📖',
      gradient: 'from-yellow-500 to-yellow-600',
      iconBg: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      delay: '0.2s',
      key: 'borrowedBooks',
    },
    {
      name: 'Registered Members',
      value: stats.totalMembers,
      icon: '👥',
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
      delay: '0.3s',
      key: 'totalMembers',
    },
    {
      name: 'Overdue Books',
      value: stats.overdueBooks,
      icon: '⚠️',
      gradient: 'from-red-500 to-red-600',
      iconBg: 'bg-gradient-to-br from-red-400 to-red-600',
      delay: '0.4s',
      key: 'overdueBooks',
    },
    {
      name: 'Total Fines',
      value: stats.totalFines,
      icon: '💰',
      gradient: 'from-orange-500 to-orange-600',
      iconBg: 'bg-gradient-to-br from-orange-400 to-orange-600',
      delay: '0.5s',
      key: 'totalFines',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map((item) => (
        <div
          key={item.name}
          className="relative group animate-fade-in-up card-hover bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-gray-700/50"
          style={{ animationDelay: item.delay }}
        >
          {/* Gradient Border Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          <div className="absolute inset-[2px] bg-gray-800 rounded-xl"></div>
          
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div className={`${item.iconBg} p-4 rounded-xl shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300`}>
                <span className="text-3xl filter drop-shadow-lg">{item.icon}</span>
              </div>
              
              <div className="text-right">
                <dt className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
                  {item.name}
                </dt>
                <dd className={`text-4xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent animate-count-up`}>
                  <AnimatedCounter value={item.value} />
                </dd>
                {item.key === 'totalFines' && (
                  <dd className="text-lg text-gray-500 mt-1">
                    ${stats.totalFines.toFixed(2)}
                  </dd>
                )}
              </div>
            </div>
            
            {/* Decorative corner */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-10 rounded-bl-full`}></div>
          </div>

          {/* Hover glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
        </div>
      ))}
    </div>
  );
};
