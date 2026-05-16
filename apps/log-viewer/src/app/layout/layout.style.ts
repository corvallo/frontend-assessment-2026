import { cn } from "@/shared/lib/utils";

export const headerStyle = cn(`
	sticky top-0 z-50
	w-full h-16
	flex items-center justify-between
	px-4 sm:px-6
	border-b border-border
	bg-background backdrop-blur-xl
`);

export const mainStyle = cn(`
	flex-1 overflow-auto
    px-4 sm:px-6
    py-6 sm:py-8
	bg-background
`);

export const footerStyle = cn(`
	shrink-0
	h-8
	flex items-center 
    bg-background
`);
