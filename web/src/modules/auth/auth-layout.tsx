import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "./login-card";
import RegisterCard from "./register-card";

export function AuthLayout() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 m-auto mt-32">
      <Tabs defaultValue="login">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginCard />
        </TabsContent>
        <TabsContent value="register">
          <RegisterCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}