import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileBarChart,
  Package,
  Users,
  Receipt,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Component,
  ComponentIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/contexts/ThemeContext";

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
};

type SidebarGroupProps = {
  title: string;
  items: SidebarItem[];
  collapsed?: boolean;
  currentPath: string;
  itemRefs?: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
};

const HoverPopover = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="center"
        className="w-auto p-2 text-sm"
        sideOffset={5}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

const SidebarGroup = ({
  title,
  items,
  collapsed,
  currentPath,
  itemRefs,
}: SidebarGroupProps) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <h3 className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-3 px-5">
          {title}
        </h3>
      )}
      <ul className="space-y-1 px-2 relative">
        {items.map((item, idx) => (
          <li key={item.title} className="relative">
            {collapsed ? (
              <HoverPopover content={item.title}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative group justify-center z-10",
                    currentPath === item.href
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-5 w-5 p-0 transition-colors duration-300" />
                </Link>
              </HoverPopover>
            ) : (
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-[0.85rem] text-sm font-medium rounded-lg transition-all duration-300 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative group z-10",
                  currentPath === item.href
                    ? "bg-primary text-white "
                    : "hover:bg-primary/10"
                )}
              >
                <item.icon className="h-5 w-5 " />
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
  collapsed?: boolean;
};

const Sidebar = ({ isOpen, toggle, collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const { theme, primaryColor } = useTheme();

  // --- Animated pill refs and effect ---
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/" },
    { title: "Products", icon: Package, href: "/products" },
    { title: "Kanban", icon: FileBarChart, href: "/kanban" },
  ];
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = menuItems.findIndex(item => item.href === location.pathname);
    const activeItem = itemRefs.current[index];
    if (activeItem && pillRef.current) {
      const { offsetTop, offsetHeight, offsetLeft, offsetWidth } = activeItem;
      pillRef.current.style.height = `${offsetHeight}px`;
      pillRef.current.style.width = collapsed ? `${offsetHeight}px` : `${offsetWidth}px`;
      pillRef.current.style.transform = collapsed
        ? `translateY(${offsetTop}px)`
        : `translateY(${offsetTop}px) translateX(${offsetLeft}px)`;
    }
  }, [location.pathname, collapsed]);

  // --- End animated pill logic ---

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={toggle}
        />
      )}

      <div
        className={cn(
          "fixed top-0 bottom-0 h-screen flex flex-col z-40  overflow-hidden bg-sidebar text-sidebar-foreground",
          collapsed ? "w-16" : "w-56",
          collapsed ? "text-center" : "text-left",
          isOpen ? "left-0" : "-left-full md:left-0"
        )}
      >
        <div className="flex-none p-5 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <div 
              className="flex items-center justify-center w-8 h-8 rounded-lg text-white transition-colors duration-300"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="text-lg font-bold">A</span>
            </div>
            {!collapsed && (
              <span className="text-lg font-bold transition-opacity duration-300">
                Admin
              </span>
            )}
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto custom-sidebar-scroll relative">
          {/* Animated pill background */}
          <div
            ref={pillRef}
            className="absolute left-0 top-0 bg-primary/10 rounded-lg z-0 transition-all duration-300 ease-out pointer-events-none"
            style={{ willChange: 'transform, width, height' }}
          />
          <SidebarGroup
            title="Menu"
            items={menuItems}
            collapsed={collapsed}
            currentPath={location.pathname}
            itemRefs={itemRefs}
          />

          <SidebarGroup
            title="Tools"
            items={[
              { title: "Settings", icon: Settings, href: "/settings" },
              { title: "Components", icon: ComponentIcon, href: "/components" },
              { title: "Help", icon: HelpCircle, href: "/help" },
              { title: "Profile", icon: Users, href: "/profile" },
            ]}
            collapsed={collapsed}
            currentPath={location.pathname}
          />
        </div>
        <div className={cn("flex-none", collapsed ? "p-2" : "p-5")}>
          {collapsed ? (
            <HoverPopover content="Logout">
              <button className="flex items-center justify-center w-full px-1 py-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 ease-in-out">
                <LogOut className="h-5 w-5 p-0 transition-colors duration-300" />
              </button>
            </HoverPopover>
          ) : (
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 ease-in-out">
              <LogOut className="h-5 w-5 transition-colors duration-300" />
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;