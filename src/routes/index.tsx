import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Reports } from "@/pages/Reports";
import  Settings from "@/pages/Settings";
import { Products } from "@/pages/Products";
import { Consumer } from "@/pages/Consumer";
import { Invoices } from "@/pages/Invoices";
import { Help } from "@/pages/Help";
import Profile from "@/pages/Profile";
import ComponentsPage from "@/pages/Components";
import { Kanban } from "@/pages/Kanban";
import Index from "@/pages/Index";
import AuthPage from "@/pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      
      {
        path: "components",
        element: <ComponentsPage />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "consumer",
        element: <Consumer />,
      },
     
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "kanban",
        element: <Kanban />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]); 