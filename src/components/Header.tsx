import React, { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

type HeaderProps = {
  userInfo: {
    name: string;
    role: string;
    avatar?: string;
  };
  toggleSidebar: () => void;
};

const Header = ({ userInfo, toggleSidebar }: HeaderProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, primaryColor } = useTheme();

  const notifications = [
    { id: 1, title: "New order received", time: "Just now", read: false },
    {
      id: 2,
      title: "Monthly report is ready",
      time: "2 hours ago",
      read: false,
    },
    { id: 3, title: "New user registered", time: "Yesterday", read: true },
  ];

  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 px-4 md:px-8",
        theme === "dark" ? "bg-sidebar" : "bg-white"
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden focus:ring-2 focus:ring-offset-2"
          style={
            {
              "--tw-ring-color": primaryColor,
            } as React.CSSProperties
          }
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-4 mr-2 md:mr-6">
        <div className="relative hidden md:block">
          <Search
            className={cn(
              "w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}
          />
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              "pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 w-56",
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
            )}
            style={{
              borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
              boxShadow: `0 0 0 2px ${primaryColor}33`,
            }}
          />
        </div>
        <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative focus:ring-2 focus:ring-offset-2"
              style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
            >
              <Bell
                className={cn(
                  "w-5 h-5",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}
              />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: primaryColor }}
              ></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              "w-80 p-0",
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            )}
          >
            <div
              className={cn(
                "p-3 border-b",
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              )}
            >
              <h3 className="font-medium">Notifications</h3>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 border-b last:border-0 cursor-pointer",
                    theme === "dark"
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50",
                    !notification.read &&
                      (theme === "dark" ? "bg-blue-900/20" : "bg-blue-50/50")
                  )}
                >
                  <div className="flex justify-between items-start">
                    <h4
                      className={cn(
                        "text-sm",
                        !notification.read && "font-medium"
                      )}
                    >
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: primaryColor, marginTop: 4 }}
                      ></span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    )}
                  >
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
            <div
              className={cn(
                "p-2 border-t",
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              )}
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs focus:ring-1 focus:ring-offset-1 rounded-sm"
                style={
                  { "--tw-ring-color": primaryColor } as React.CSSProperties
                }
              >
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          {userInfo.avatar ? (
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              className="w-10 h-10 rounded-full object-cover border-2"
              style={{ borderColor: primaryColor }}
            />
          ) : (
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2",
                theme === "dark" ? "bg-gray-700" : "bg-gray-300"
              )}
              style={{ borderColor: primaryColor }}
            >
              <span
                className={cn(
                  "font-medium",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}
              >
                {userInfo.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="text-right hidden sm:block">
            <h3 className="text-sm font-semibold">{userInfo.name}</h3>
            <p
              className={cn(
                "text-xs",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}
            >
              {userInfo.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
