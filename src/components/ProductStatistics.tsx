
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type ProductCategory = {
  name: string;
  value: number;
  percentage: string;
  trend: {
    value: string;
    positive: boolean;
  };
};

type ProductStatisticsProps = {
  totalSales: number;
  salesChange: string;
  categories: ProductCategory[];
};

const ProductStatistics = ({ totalSales, salesChange, categories }: ProductStatisticsProps) => {
  const colors = ['#4064FF', '#FF5656', '#EAEAEA'];
  
  const data = categories.map(category => ({
    name: category.name,
    value: category.value
  }));

  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold">Product Statistic</h2>
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
      <p className="text-sm text-gray-500 mb-6">Track your product sales</p>
      
      <div className="flex items-center mb-8">
        <div className="w-1/2 relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} strokeWidth={0} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2">
          <div className="mb-3 flex flex-col">
            <span className="text-3xl font-bold">{totalSales.toLocaleString()}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Products Sales</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-success-light text-success rounded-full">
                +{salesChange}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={category.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></div>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{category.value.toLocaleString()}</span>
              <span className={cn(
                "px-2 py-0.5 text-xs font-medium rounded-full",
                category.trend.positive ? "bg-success-light text-success" : "bg-danger-light text-danger"
              )}>
                {category.trend.positive ? '+' : '-'}{category.trend.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStatistics;
