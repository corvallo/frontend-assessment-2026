const LEVELS = ["Normal", "Warning", "Error"] as const;
type Level = (typeof LEVELS)[number];
type KubeEvent = {
	id: string;
	time: string;
	level: Level;
	namespace: string;
	type: string;
	object: string;
	message: string;
	source: string;
};

const FAKE_EVENTS: KubeEvent[] = [
	{
		id: "1",
		time: "10:24:31.123",
		level: "Warning",
		namespace: "default",
		type: "Pod",
		object: "nginx-6d8f9c7d5-abc12",
		message: "Back-off restarting failed container",
		source: "kubelet",
	},
	{
		id: "2",
		time: "10:24:30.987",
		level: "Normal",
		namespace: "kube-system",
		type: "Node",
		object: "ip-10-0-1-23",
		message: "Node has sufficient memory",
		source: "kubelet",
	},
	{
		id: "3",
		time: "10:24:30.876",
		level: "Warning",
		namespace: "default",
		type: "Pod",
		object: "api-server-7c5d9f8b6-xyz98",
		message: "Liveness probe failed: Get http://10.0.1.5:808...",
		source: "kubelet",
	},
	{
		id: "4",
		time: "10:24:30.765",
		level: "Normal",
		namespace: "default",
		type: "ReplicaSet",
		object: "api-server-7c5d9f8b6",
		message: "Scaled up replica set api-server-7c5d9f8b6 to 3",
		source: "lube-controller",
	},
	{
		id: "5",
		time: "10:24:30.654",
		level: "Normal",
		namespace: "kube-system",
		type: "Service",
		object: "kube-dns",
		message: "Updated endpoints",
		source: "endpoints-cont",
	},
	{
		id: "6",
		time: "10:24:30.543",
		level: "Warning",
		namespace: "monitoring",
		type: "Pod",
		object: "prometheus-0",
		message: "CPU throttling high",
		source: "kubelet",
	},
	{
		id: "7",
		time: "10:24:30.432",
		level: "Normal",
		namespace: "default",
		type: "ConfigMap",
		object: "app-config",
		message: "ConfigMap updated",
		source: "kubelet",
	},
	{
		id: "8",
		time: "10:24:30.321",
		level: "Normal",
		namespace: "default",
		type: "Pod",
		object: "worker-5f7d8c9b-ptk2z",
		message: "Started container worker",
		source: "kubelet",
	},
	{
		id: "9",
		time: "10:24:30.210",
		level: "Warning",
		namespace: "default",
		type: "Pod",
		object: "worker-5f7d8c9b-ptk2z",
		message: "Failed to pull image myapp:latest: rpc error...",
		source: "kubelet",
	},
	{
		id: "10",
		time: "10:24:29.221",
		level: "Error",
		namespace: "default",
		type: "Pod",
		object: "payment-api-54d8d6f9c7-qz1w2",
		message: "Error: CrashLoopBackOff",
		source: "kubelet",
	},
	{
		id: "11",
		time: "10:24:29.109",
		level: "Normal",
		namespace: "ingress-nginx",
		type: "Service",
		object: "ingress-nginx-controller",
		message: "LoadBalancer Ingress IP updated",
		source: "service-controller",
	},
	{
		id: "12",
		time: "10:24:29.998",
		level: "Normal",
		namespace: "kube-system",
		type: "Node",
		object: "ip-10-0-2-45",
		message: "Node not under memory pressure",
		source: "kubelet",
	},
	{
		id: "13",
		time: "10:24:29.887",
		level: "Warning",
		namespace: "default",
		type: "Pod",
		object: "job-cleaner-282738",
		message: "Job has reached the specified backoff limit",
		source: "job-controller",
	},
	{
		id: "14",
		time: "10:24:29.776",
		level: "Normal",
		namespace: "default",
		type: "CronJob",
		object: "db-backup",
		message: "Saw completed job: db-backup-282738",
		source: "cronjob-controller",
	},
	{
		id: "15",
		time: "10:24:29.665",
		level: "Normal",
		namespace: "default",
		type: "Pod",
		object: "redis-6b7fbb6f6c-jk9lm",
		message: "Started container redis",
		source: "kubelet",
	},
];

const levelDot: Record<Level, string> = {
	Normal: "bg-success",
	Warning: "bg-warning",
	Error: "bg-error",
};

const levelText: Record<Level, string> = {
	Normal: "text-success",
	Warning: "text-warning",
	Error: "text-error",
};
const COL =
	"lg:grid lg:grid-cols-[120px_90px_1fr_1fr_1fr_2fr_1fr] lg:items-center lg:gap-4 lg:px-4";

export function Rows() {
	return (
		<>
			{FAKE_EVENTS.map((event) => (
				<div
					key={event.id}
					className={`${COL} border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors
								flex flex-col gap-1 px-4 py-3
								lg:flex-none lg:py-2 lg:text-sm`}
				>
					<div className="flex items-center justify-between lg:contents">
						<span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
							<span
								className={`size-1.5 rounded-full shrink-0 ${levelDot[event.level]}`}
							/>
							{event.time}
						</span>
						<span className={`text-xs font-medium ${levelText[event.level]}`}>
							{event.level}
						</span>
						<span className="truncate text-muted-foreground hidden lg:block">
							{event.namespace}
						</span>
						<span className="truncate hidden lg:block">{event.type}</span>
						<span className="truncate font-mono text-xs hidden lg:block">
							{event.object}
						</span>
						<span className="truncate hidden lg:block">{event.message}</span>
						<span className="truncate text-xs text-muted-foreground hidden lg:block">
							{event.source}
						</span>
					</div>
					{/* Mobile-only extra info */}
					<div className="lg:hidden">
						<p className="font-mono text-xs truncate text-muted-foreground">
							{event.object}
						</p>
						<p className="text-sm truncate">{event.message}</p>
						<p className="text-xs text-muted-foreground">
							{event.namespace} · {event.type} · {event.source}
						</p>
					</div>
				</div>
			))}
		</>
	);
}
