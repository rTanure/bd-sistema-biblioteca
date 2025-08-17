import Layout from "@/components/layout";
import { authRoutes } from "@/modules/auth/auth.routes";
import { BrowserRouter, useRoutes } from "react-router-dom";

function RoutesWrapper() {
  const routes = [
    ...authRoutes,
    // {
    //   element: <Layout />,   // todas essas terão Navbar/Footer
    //   children: [
    //     ...userRoutes,
    //   ],
    // },
    { path: "*", element: <h1>404 - Página não encontrada</h1> },
  ];

  return useRoutes(routes);
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}