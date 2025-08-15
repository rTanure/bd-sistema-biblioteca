import { ThemeProvider } from "./components/theme-provider"
import "./index.css"
import Login from "./modules/auth/login"
import Theme from "./modules/theme"

function App() {
  

  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  )
}

export default App
