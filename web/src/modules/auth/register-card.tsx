import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import type { PessoaCreateDto } from "../../../../server/src/modules/auth/dto/PessoaCreateDto";
import { useAuthStore } from "@/hooks/stores/use-auth-store";
import { Activity, ActivityIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterCard() {
  const { register: registerUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)


  const { register, handleSubmit } = useForm<PessoaCreateDto>()

  const onSubmit = (data: PessoaCreateDto) => {

    setIsLoading(true)
    registerUser(data)
      .then(() => {})
      .catch((error) => {
        toast("Erro ao registrar usuário", {
          closeButton: true,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para se registrar.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <ScrollArea>
            <div className="grid grid-cols-4 gap-6">
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João da Silva"
                  {...register("nome")}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  {...register("dataNascimento")}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="XXX.XXX.XXX-XX"
                  {...register("cpf")}
                  required
                />
              </div>

              <div className="grid gap-2 col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  {...register("email")}
                  required
                />
              </div>

              <div className="grid gap-2 col-span-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="********"
                  {...register("senha")}
                  required
                />
              </div>
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Registrar"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
