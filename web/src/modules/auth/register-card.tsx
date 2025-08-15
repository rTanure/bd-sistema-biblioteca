import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RegisterCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para se registrar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <ScrollArea className="flex flex-col max-h-64">
            <div className="grid gap-2 mb-6">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="João da Silva"
                required
              />
            </div>
            <div className="grid gap-2 mb-6">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@exemplo.com"
                required
              />
            </div>
            <div className="grid gap-2 mb-6">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="********"
                required
              />
            </div>
            <div className="grid gap-2 mb-6">
              <Label htmlFor="confirm-password">Confirmar senha</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="********"
                required
              />
            </div>
          </ScrollArea>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </CardFooter>
    </Card>
  );
}
