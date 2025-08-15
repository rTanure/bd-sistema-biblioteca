import DashboardLayout from "./components/dashboard-layout"
import { ThemeProvider } from "./components/theme-provider"
import "./index.css"
import { AuthLayout } from "./modules/auth/auth-layout"

function App() {
  

  return (
    <ThemeProvider>
      <DashboardLayout>
        <AuthLayout />
      </DashboardLayout>
    </ThemeProvider>
  )
}

export default App
