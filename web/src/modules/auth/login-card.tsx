import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/hooks/stores/use-auth-store";
import { useForm } from "react-hook-form";
import type { LoginDto } from "../../../../server/src/modules/auth/dto/LoginDto";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function LoginCard() {
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  
  
  const {register, handleSubmit} = useForm<LoginDto>()

  const onSubmit = (data: LoginDto) => {
    setIsLoading(true)
    login(data)
      .then()
      .catch(() => {
        toast("Erro ao fazer login", {
          closeButton: true
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Entre com a sua conta</CardTitle>
          <CardDescription>
            Use o seu Email e senha informados no cadastro.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemple.com"
                  {...register("e_mail")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  {...register("senha")}
                  id="password"
                  type="password"
                  placeholder="********"
                />
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
