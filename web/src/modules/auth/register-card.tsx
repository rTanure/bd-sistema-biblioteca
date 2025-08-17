import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import type { PessoaCreateDto } from "../../../../server/src/modules/auth/dto/PessoaCreateDto";

export default function RegisterCard() {

  const { register, handleSubmit } = useForm<PessoaCreateDto>()

  const onSubmit = (data: PessoaCreateDto) => {
    console.log(data)
  }

  return (
    <Card className="w-full max-w-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para se registrar.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          
            <ScrollArea className="flex flex-col max-h-64">
              <div className="grid gap-2 mb-6">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João da Silva"
                  {...register("nome")}
                  required
                />
              </div>
              <div className="grid gap-2 mb-6">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  placeholder="DD/MM/AAAA"
                  {...register("dataNascimento")}
                  required
                />
              </div>
              <div className="grid gap-2 mb-6">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="XXX.XXX.XXX-XX"
                  {...register("cpf")}
                  required
                />
              </div>
              <div className="grid gap-2 mb-6">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  {...register("email")}
                  required
                />
              </div>
              <div className="grid gap-2 mb-6">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="********"
                  {...register("senha")}
                  required
                />
              </div>
            </ScrollArea>
          
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Registrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
