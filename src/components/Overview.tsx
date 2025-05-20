import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    revenue: 4000,
    subscriptions: 2400,
    sales: 1800,
    active: 2800,
  },
  {
    revenue: 3000,
    subscriptions: 1398,
    sales: 2210,
    active: 2000,
  },
  {
    revenue: 2000,
    subscriptions: 9800,
    sales: 2290,
    active: 2181,
  },
  {
    revenue: 2780,
    subscriptions: 3908,
    sales: 2000,
    active: 2500,
  },
  {
    revenue: 1890,
    subscriptions: 4800,
    sales: 2181,
    active: 2100,
  },
  {
    revenue: 2390,
    subscriptions: 3800,
    sales: 2500,
    active: 2400,
  },
  {
    revenue: 3490,
    subscriptions: 4300,
    sales: 2100,
    active: 2300,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="subscriptions"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#ffc658"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="active"
          stroke="#ff8042"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
} 