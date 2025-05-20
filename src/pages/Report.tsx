import React from "react";
import Header from "../components/Header";

type ReportPageProps = {
  toggleSidebar: () => void;
};

const ReportPage = ({ toggleSidebar }: ReportPageProps) => {
  return (
    <div className="container mx-auto bg-background text-foreground min-h-screen">
      <Header 
        userInfo={{
          name: "Sarah Connor",
          role: "Admin",
        }}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Monthly Report</h2>
        <p className="text-muted-foreground">
          This report provides an overview of your business performance for the current month.
          Use the filters below to customize the report view.
        </p>
        
        <div className="h-96 flex items-center justify-center border rounded-lg mt-6 border-border bg-background">
          <p className="text-muted-foreground">Report content will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
