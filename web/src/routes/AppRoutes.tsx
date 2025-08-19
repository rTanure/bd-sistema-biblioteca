import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/hooks/stores/use-auth-store";
import { appRoutes } from "@/modules/app/app.routes";
import { authRoutes } from "@/modules/auth/auth.routes";
import { useEffect } from "react";
import { BrowserRouter, useNavigate, useRoutes } from "react-router-dom";

function RoutesWrapper() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  useEffect(() => {
    if (!user) {
      navigate("/auth")
    }

    console.log("User:", user)  
  }, [user, navigate])

  const routes = [
    ...authRoutes,
    ...appRoutes,
    { path: "*", element: <h1>404 - Página não encontrada</h1> },
  ];

  return useRoutes(routes);
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
      <Toaster />
    </BrowserRouter>
  );
}