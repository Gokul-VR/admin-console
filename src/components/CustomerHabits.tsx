import React from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type MonthData = {
  month: string;
  sales: number;
  seen: number;
};

const CustomerHabits = () => {
  const data: MonthData[] = [
    { month: "Jan", sales: 40, seen: 20 },
    { month: "Feb", sales: 60, seen: 40 },
    { month: "Mar", sales: 30, seen: 50 },
    { month: "Apr", sales: 20, seen: 60 },
    { month: "May", sales: 50, seen: 40 },
    { month: "Jun", sales: 70, seen: 30 },
    { month: "Jul", sales: 30, seen: 40 },
  ];

  const productStats = [
    { id: 1, count: 43787, label: "Products" },
    { id: 2, count: 39784, label: "Products" },
  ];

  return (
    <div className="bg-card rounded-2xl p-6 dark:border dark:border-border">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold text-card-foreground">Customer Habits</h2>
        <Select defaultValue="this-year">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-year">This year</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
            <SelectItem value="last-2-years">Last 2 years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Track your customer habits</p>

      <div className="relative h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Bar
              dataKey="seen"
              fill="hsl(var(--muted))"
              radius={[4, 4, 4, 4]}
              barSize={20}
            />
            <Bar
              dataKey="sales"
              fill="hsl(var(--primary))"
              radius={[4, 4, 4, 4]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <span className="text-sm text-muted-foreground">Seen product</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm text-muted-foreground">Sales</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerHabits;
