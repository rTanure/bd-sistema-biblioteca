import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button onClick={handleChangeTheme}>Teste</Button>
  )
}
