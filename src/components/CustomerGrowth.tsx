
import React from 'react';

type CountryData = {
  country: string;
  flag: string;
  customers: number;
};

const CustomerGrowth = () => {
  const countries: CountryData[] = [
    { country: 'United States', flag: '🇺🇸', customers: 2417 },
    { country: 'Germany', flag: '🇩🇪', customers: 1304 },
    { country: 'Australia', flag: '🇦🇺', customers: 1212 },
    { country: 'France', flag: '🇫🇷', customers: 946 },
  ];

  // Simplified bubble chart simulation with fixed circles
  const bubbles = [
    { id: 1, size: 'lg', value: 2281, x: '70%', y: '60%' },
    { id: 2, size: 'md', value: 812, x: '35%', y: '60%' },
    { id: 3, size: 'sm', value: 287, x: '25%', y: '40%' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold">Customer Growth</h2>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">Track customer by locations</p>
      
      <div className="flex">
        <div className="w-1/2 relative h-[200px]">
          {/* Simple visualization of the bubble chart */}
          <div className="relative w-full h-full">
            {bubbles.map((bubble) => {
              const sizeClasses = {
                sm: 'w-14 h-14',
                md: 'w-20 h-20',
                lg: 'w-28 h-28',
              };
              
              return (
                <div 
                  key={bubble.id}
                  className={`absolute ${sizeClasses[bubble.size as keyof typeof sizeClasses]} rounded-full bg-dashboard-blue text-white flex items-center justify-center`}
                  style={{ left: bubble.x, top: bubble.y }}
                >
                  <span className="text-sm font-medium">{bubble.value}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="w-1/2">
          <div className="space-y-4">
            {countries.map((country) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium">{country.country}</span>
                </div>
                <span className="text-sm font-medium">{country.customers.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerGrowth;
