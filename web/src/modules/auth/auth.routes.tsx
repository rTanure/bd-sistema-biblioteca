import type { RouteObject } from "react-router-dom";
import { AuthLayout } from "./auth-layout";

export const authRoutes: RouteObject[] = [
  { path: "/auth", element: <AuthLayout /> },
];
