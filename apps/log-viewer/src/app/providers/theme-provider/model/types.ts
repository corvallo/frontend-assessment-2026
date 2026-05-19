import type { ReactNode } from "react";
import type { Theme } from "@/shared/model/types";

export type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};
