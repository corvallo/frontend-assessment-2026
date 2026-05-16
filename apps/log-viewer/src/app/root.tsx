import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./main.tsx";
import "./styles/global.css";

const root = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<StrictMode>
			<Main />
		</StrictMode>,
	);
}
