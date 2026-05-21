import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

export const eventRowStyleOld = cn(`
	border-b border-border cursor-pointer flex flex-col gap-1 px-3 py-2 text-left text-xs w-full
	hover:bg-muted/30
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
	md:gap-4 md:grid md:grid-cols-[120px_90px_1fr_1fr_1fr_2fr_1fr] md:items-center md:px-4 md:py-2
`);

export const malformedRowStyleOld = cn(`
	bg-destructive/5 border-b border-border cursor-pointer flex flex-col gap-1 px-3 py-2 text-left text-xs w-full
	md:gap-4 md:grid md:grid-cols-[120px_90px_1fr_1fr_1fr_2fr_1fr] md:items-center md:px-4 md:py-2
`);

export const eventRowStyle = cva(
	`
	border-b border-border cursor-pointer flex flex-col gap-1 px-3 py-2 text-left text-xs w-full
	hover:bg-muted/30
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
	md:gap-4 md:grid md:grid-cols-[120px_90px_1fr_1fr_1fr_2fr_1fr] md:items-center md:px-4 md:py-2`,
	{
		variants: {
			malformed: {
				true: "bg-destructive/5",
				false: "",
			},
		},
	},
);

export const eventRowSpanStyle = cva("truncate", {
	variants: {
		hidden_md: { true: "md:hidden", false: "" },
		spanned: { true: "md:col-span-5", false: "" },
		destructive: { true: "text-destructive", false: "" },
		mono: { true: "font-mono", false: "" },
		muted: { true: "text-muted-foreground", false: "" },
	},
});
export const eventRowDateWrapper = cn(
	`flex items-center justify-between md:contents`,
);
export type EventRoWVariants = VariantProps<typeof eventRowStyle>;
