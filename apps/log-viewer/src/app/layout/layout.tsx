import type { PropsWithChildren } from "react";
import { useEventStream } from "@/entities/event";
import { Header } from "@/widgets/header";
import { Toolbar } from "@/widgets/toolbar";
import { mainStyle } from "./layout.style";

type LayoutProps = PropsWithChildren;
export function Layout({ children }: LayoutProps) {
	useEventStream();
	return (
		<>
			<Header />
			<Toolbar />
			<main className={mainStyle}>{children}</main>
		</>
	);
}
