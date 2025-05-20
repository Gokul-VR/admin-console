import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentSales = [
  {
    name: "John Doe",
    email: "john@example.com",
    amount: "$250.00",
    avatar: "/avatars/01.png",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    amount: "$150.00",
    avatar: "/avatars/02.png",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    amount: "$350.00",
    avatar: "/avatars/03.png",
  },
  {
    name: "Alice Brown",
    email: "alice@example.com",
    amount: "$450.00",
    avatar: "/avatars/04.png",
  },
  {
    name: "Charlie Wilson",
    email: "charlie@example.com",
    amount: "$550.00",
    avatar: "/avatars/05.png",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt={sale.name} />
            <AvatarFallback>{sale.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
} 