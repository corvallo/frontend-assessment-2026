import k8sLogo from "/k8s.svg";

export function Logo() {
	return (
		<div className="flex items-center gap-2">
			<img src={k8sLogo} alt="Kubernetes" className="size-8" />
			<span className="text-lg font-bold">K8S Event Stream</span>
		</div>
	);
}
