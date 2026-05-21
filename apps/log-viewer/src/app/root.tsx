import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./main.tsx";
import "./styles/global.css";
import { Toaster } from "@/shared/ui";
import { ThemeProvider } from "./providers/theme-provider/index.ts";

const root = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<StrictMode>
			<ThemeProvider>
				<Main />
				<Toaster />
			</ThemeProvider>
		</StrictMode>,
	);
}
