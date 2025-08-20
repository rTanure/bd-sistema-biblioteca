import React, { use } from "react";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { UserCog } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { bibliotecarioMdl } from "@/api/bibliotecario-mdl";
import { useAuthStore } from "@/hooks/stores/use-auth-store";
import { secretarioMdl } from "@/api/secretario-mdl";
import { useForm } from "react-hook-form";
import { Select } from "react-day-picker";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Form } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const FormSecretario = () => {
  const { user } = useAuthStore()

  const { register, handleSubmit } = useForm<{
    area: string;
    ramal: string;
    acesso: string;
  }>()
  const onSubmit = handleSubmit((data) => {
    secretarioMdl.create({
      id_pessoa: user?.id as number,
      area_atuacao: data.area,
      ramal_telefonico: data.ramal,
      nivel_acesso_sistema: data.acesso,
    })
      .then(() => {
        toast.success("Secretário cadastrado com sucesso.")
      })
      .catch(() => {
        toast.error("Erro ao cadastrar secretário. Verifique os dados e tente novamente.")
      })
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <Label className="mb-2">Área de atuação</Label>
        <Input
          type="text"
          {...register("area", { required: true })}
        />
      </div>
      <div>
        <Label className="mb-2">Ramal</Label>
        <Input
          type="text"
          {...register("ramal", { required: true })}
        />
      </div>
      <div>
        <Label className="mb-2">Nível de acesso</Label>
        <Input
          type="text"
          {...register("acesso", { required: true })}
        />
      </div>
      <div>
        <Button type="submit" className="w-full">Cadastrar</Button>
      </div>
    </form>
  )
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
  const {user} = useAuthStore()

  const { register, handleSubmit } = useForm<{
    area_atuacao: string;
    ramal_telefonico: string;
    nivel_acesso_sistema: string;
  }>()


  const handleAdicionarSecretario = async (values: {
    area_atuacao: string;
    ramal_telefonico: string;
    nivel_acesso_sistema: string;
  }) => {
    await secretarioMdl.create({
      id_pessoa: user.id,
      area_atuacao: values.area_atuacao,
      ramal_telefonico: values.ramal_telefonico,
      nivel_acesso_sistema: values.nivel_acesso_sistema,
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
      <Drawer>
        <DrawerTrigger className="absolute bottom-5 right-5">
          <Button>
            <UserCog />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Especialize o seu usuário.</DrawerTitle>
            {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
          </DrawerHeader>

          <Tabs defaultValue="bibliotecario" className="w-[400px] m-auto">
            <TabsList className="w-full">
              <TabsTrigger value="secretario">Secretário</TabsTrigger>
              <TabsTrigger value="bibliotecario">Bibliotecário</TabsTrigger>
            </TabsList>
            <TabsContent value="secretario">
                <FormSecretario />
            </TabsContent>
            <TabsContent value="bibliotecario">Change your password here.</TabsContent>
          </Tabs>

          <DrawerFooter className="flex w-[400px] flex-row m-auto">
            <DrawerClose className="flex-1">
              <Button className="w-full" variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SidebarProvider>
  )
}
