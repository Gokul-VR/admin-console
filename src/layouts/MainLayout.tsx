import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block transition-all duration-200 ${
          sidebarCollapsed ? "w-16" : "w-56"
        } flex-shrink-0 border-r bg-sidebar text-sidebar-foreground`}
      >
        <Sidebar
          isOpen={sidebarOpen}
          toggle={() => setSidebarOpen(!sidebarOpen)}
          collapsed={sidebarCollapsed}
        />
      </div>
      {/* Mobile Sidebar (overlay) */}
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
        collapsed={sidebarCollapsed}
      />
      {/* Main content */}
      <div className="flex flex-1 flex-col min-h-screen min-w-0">
        <div
          className={cn(
            "sticky top-0 z-10 flex items-center justify-between dark:border-b",
            theme === "dark" ? "bg-sidebar" : "bg-white"
          )}
        >
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 ml-2 mr-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Desktop collapse button */}
          <button
            className="hidden md:inline-flex items-center justify-center w-10 h-10 ml-2 mr-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setSidebarCollapsed((c) => !c)}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            type="button"
          >
            {sidebarCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            )}
          </button>
          <Header
            userInfo={{ name: "Gokul", role: "Administrator" }}
            toggleSidebar={() => setSidebarOpen(true)}
          />
        </div>
        <main className="flex-1 p-4 bg-background text-foreground min-h-0 overflow-auto">
          <div className="h-full w-full max-w-full overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
