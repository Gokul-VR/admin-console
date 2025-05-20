import React from "react";
import StatCard from "../components/StatCard";
import ProductStatistics from "../components/ProductStatistics";
import CustomerHabits from "../components/CustomerHabits";
import {
  ArrowUp,
  ArrowDown,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
} from "lucide-react";

const Index = () => {
  // Sample data for ProductStatistics
  const productData = {
    totalSales: 2458,
    salesChange: "15.6%",
    categories: [
      {
        name: "Electronics",
        value: 1200,
        percentage: "45%",
        trend: {
          value: "12%",
          positive: true,
        },
      },
      {
        name: "Clothing",
        value: 850,
        percentage: "30%",
        trend: {
          value: "8%",
          positive: true,
        },
      },
      {
        name: "Other",
        value: 408,
        percentage: "25%",
        trend: {
          value: "3%",
          positive: false,
        },
      },
    ],
  };

  return (
    <div className="p-1 bg-background text-foreground min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<ShoppingCart className="h-5 w-5 text-primary" />}
          title="Total Revenue"
          value="$98,420"
          subtext="vs. last month"
          trend={{
            value: "12.5%",
            positive: true,
          }}
        />
        <StatCard
          icon={<Users className="h-5 w-5 text-primary" />}
          title="Total Customers"
          value="1,240"
          subtext="vs. last month"
          trend={{
            value: "4.5%",
            positive: false,
          }}
        />
        <StatCard
          icon={<Package className="h-5 w-5 text-primary" />}
          title="Active Products"
          value="156"
          subtext="vs. last month"
          trend={{
            value: "8.2%",
            positive: true,
          }}
        />
        <StatCard
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
          title="Conversion Rate"
          value="28.6%"
          subtext="vs. last month"
          trend={{
            value: "2.1%",
            positive: true,
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProductStatistics
          totalSales={productData.totalSales}
          salesChange={productData.salesChange}
          categories={productData.categories}
        />
        <CustomerHabits />
      </div>
    </div>
  );
};

export default Index;
