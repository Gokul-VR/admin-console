
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

type MonthData = {
  month: string;
  sales: number;
  seen: number;
};

const CustomerHabits = () => {
  const data: MonthData[] = [
    { month: 'Jan', sales: 40, seen: 20 },
    { month: 'Feb', sales: 60, seen: 40 },
    { month: 'Mar', sales: 30, seen: 50 },
    { month: 'Apr', sales: 20, seen: 60 },
    { month: 'May', sales: 50, seen: 40 },
    { month: 'Jun', sales: 70, seen: 30 },
    { month: 'Jul', sales: 30, seen: 40 },
  ];

  const productStats = [
    { id: 1, count: 43787, label: 'Products' },
    { id: 2, count: 39784, label: 'Products' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold">Customer Habits</h2>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>This year</option>
            <option>Last year</option>
            <option>Last 2 years</option>
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">Track your customer habits</p>

      <div className="relative h-[200px] mb-4">
        <div className="absolute top-0 right-10 flex flex-col space-y-2">
          {productStats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-2 bg-black bg-opacity-80 text-white px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-sm font-medium">{stat.count.toLocaleString()}</span>
              <span className="text-xs text-gray-300">{stat.label}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Bar 
              dataKey="seen" 
              fill="#E5E7EB" 
              radius={[4, 4, 4, 4]} 
              barSize={20}
            />
            <Bar 
              dataKey="sales" 
              fill="#4064FF" 
              radius={[4, 4, 4, 4]} 
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          <span className="text-sm text-gray-600">Seen product</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-dashboard-blue"></div>
          <span className="text-sm text-gray-600">Sales</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerHabits;
