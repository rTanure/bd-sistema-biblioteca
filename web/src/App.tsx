import { ThemeProvider } from "./components/theme-provider"
import "./index.css"
import Theme from "./modules/theme"

function App() {
  

  return (
    <ThemeProvider>
      <Theme />
    </ThemeProvider>
  )
}

export default App
