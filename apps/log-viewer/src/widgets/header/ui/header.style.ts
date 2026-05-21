import { cn } from "@/shared/lib/utils";

export const headerStyle = cn(`
    sticky top-0 z-50
    w-full 
    flex flex-col
    bg-background backdrop-blur-xl
`);

export const wrapperStyle = cn(`
    flex items-center justify-between
    px-4 sm:px-6 py-4
    border-b border-border
`);
