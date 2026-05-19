export type ValueOf<T> = T[keyof T];

export type Theme = "dark" | "light";
export type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};
