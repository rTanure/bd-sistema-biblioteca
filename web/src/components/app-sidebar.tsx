import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/hooks/stores/use-auth-store"
import type { Icon } from "lucide-react"
import { Calendar, HandCoinsIcon, Home, Inbox, LogOut, Search, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"


const acoes_pessoa = [
  {
    title: "Doar para a biblioteca",
    url: "/app/doar",
    icon: HandCoinsIcon,
  },
]

export function AppSidebar() {
  const { user, signOut } = useAuthStore()

  return (
     <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ações de Pessoa</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {acoes_pessoa.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-4">
          <Button onClick={signOut} variant="outline">
            <LogOut />
          </Button>
          <span className="text-sm">{user?.nome}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}