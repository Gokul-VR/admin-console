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
    <div className={cn("bg-card rounded-2xl p-6 dark:border dark:border-border", className)}>
      <div className="flex items-center justify-between mb-5">
        <div className="p-3 rounded-full bg-muted">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-medium px-3 py-1 rounded-full",
            trend.positive ? "bg-success-light text-success" : "bg-destructive-light text-destructive"
          )}>
            {trend.positive ? '+' : '-'}{trend.value}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{subtext}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
