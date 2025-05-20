
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StatCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  subtext: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
};

const StatCard = ({ icon, title, value, subtext, trend, className }: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-center justify-between mb-5">
        <div className="p-3 rounded-full bg-gray-100">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-medium px-3 py-1 rounded-full",
            trend.positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          )}>
            {trend.positive ? '+' : '-'}{trend.value}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
