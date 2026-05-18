import { cn } from "@/shared/lib/utils";

export const wrapper = cn(`
	flex flex-col
	h-full
	border border-border rounded-md
	overflow-hidden
	shadow-sm
`);

export const filtersSection = cn(`
	flex
	p-4
`);

export const columnsHeader = cn(`
	hidden lg:grid
	grid-cols-[120px_90px_1fr_1fr_1fr_2fr_1fr]
	items-center gap-4
	px-4 py-2
	text-xs font-medium text-muted-foreground
	border-b border-border
	bg-muted/30
	shrink-0
`);

export const rowsWrapper = cn(`
	overflow-auto
	flex-1
`);
