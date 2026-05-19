import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/lib/use-theme";
import { Button } from "@/shared/ui";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	return (
		<Button
			variant="outline"
			title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
		>
			{theme === "light" && <Moon />}
			{theme === "dark" && <Sun />}
		</Button>
	);
}
