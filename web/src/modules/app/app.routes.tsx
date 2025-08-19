import type { RouteObject } from "react-router-dom";
import Home from "./home/home";
import DashboardLayout from "@/components/dashboard-layout";
import DoarHome from "./doar/doar-home";

export const appRoutes: RouteObject[] = [
  { path: "/app", element: <DashboardLayout><Home /></DashboardLayout> },
  { path: "/app/doar", element: <DashboardLayout><DoarHome /></DashboardLayout> },
];
