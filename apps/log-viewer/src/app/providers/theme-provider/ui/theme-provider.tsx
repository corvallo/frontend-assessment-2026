import { useEffect, useState } from "react";
import type { Theme } from "@/shared/model/types";
import { ThemeProviderContext } from "../../../../shared/lib/theme-context";
import type { ThemeProviderProps } from "../model/types";

export function ThemeProvider({
	children,
	defaultTheme = "light",
	storageKey = "k8s-evt-stream-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
	}, [theme]);

	return (
		<ThemeProviderContext.Provider
			{...props}
			value={{
				theme,
				setTheme: (theme: Theme) => {
					localStorage.setItem(storageKey, theme);
					setTheme(theme);
				},
			}}
		>
			{children}
		</ThemeProviderContext.Provider>
	);
}
