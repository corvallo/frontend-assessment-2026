import { cn } from "@/shared/lib/utils";

export const headerStyle = cn(`
    sticky top-0 z-50
    w-full h-16
    flex items-center justify-between
    px-4 sm:px-6
    border-b border-border
    bg-background backdrop-blur-xl
`);

export const headerRightStyle = cn(`
    flex gap-2 items-center
`);
