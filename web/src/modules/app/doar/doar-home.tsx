import { doadorMdl } from "@/api/doador-mdl";
import { pessoaMdl } from "@/api/pessoa-mdl";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/stores/use-auth-store";
import { toast } from "sonner";

export default function DoarHome() {
  const {user} = useAuthStore()

  const handleQueroSerUmDoador = () => {

    doadorMdl.create({
      tipoPessoa: "PESSOA_FISICA",
      recebeInformativos: false
    })
      .then((e) => {
        pessoaMdl.update(user?.id as number, {
          id_doador: e.data.id
        })
          .then(() => {
            toast.success("Você se tornou um doador com sucesso!");
          })
          .catch(() => {
            toast.error("Erro ao atualizar informações do usuário.");
          })
      })
      .catch((error) => {
        toast.error("Erro ao se tornar um doador.");
      });
  };

  return (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Você ainda não é um doador 🥺.</h1>
      <Button onClick={handleQueroSerUmDoador}>Quero ser um doador</Button>
    </div>
  )
}