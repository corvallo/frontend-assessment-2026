import { useYamlSelectedEvent } from "../model";

export function Content() {
	const { yaml } = useYamlSelectedEvent();
	return (
		<pre className="overflow-auto flex-1 text-xs font-mono bg-muted p-4 rounded-md whitespace-pre-wrap break-all">
			{yaml}
		</pre>
	);
}
