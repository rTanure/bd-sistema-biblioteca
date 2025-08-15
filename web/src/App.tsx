import { ThemeProvider } from "./components/theme-provider"
import "./index.css"
import { AuthLayout } from "./modules/auth/auth-layout"

function App() {
  

  return (
    <ThemeProvider>
      <AuthLayout />
    </ThemeProvider>
  )
}

export default App
