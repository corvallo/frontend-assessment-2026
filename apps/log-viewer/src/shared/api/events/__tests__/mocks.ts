export const VALID_K8S_EVENT = {
	apiVersion: "v1",
	kind: "Event",
	id: "evt_abc123",
	type: "Normal",
	reason: "Pulling",
	action: "Pulling",
	message: "Pulling image ghcr.io/clastix/capsule:v0.7.0",
	reportingComponent: "kubelet",
	reportingInstance: "ip-10-0-1-1",
	firstTimestamp: "2026-05-18T08:00:00.000Z",
	lastTimestamp: "2026-05-18T08:00:00.000Z",
	eventTime: "2026-05-18T08:00:00.000Z",
	count: 1,
	metadata: {
		name: "pod.abc",
		namespace: "default",
		uid: "uuid-1",
		resourceVersion: "1234",
		creationTimestamp: "2026-05-18T08:00:00.000Z",
	},
	involvedObject: {
		apiVersion: "v1",
		kind: "Pod",
		name: "my-pod",
		namespace: "default",
		uid: "uuid-2",
		resourceVersion: "5678",
	},
	source: { component: "kubelet", host: "ip-10-0-1-1" },
};

export const VALID_RAW = JSON.stringify(VALID_K8S_EVENT);

export const MALFORMED_RAW = "{broken json";

export const NON_K8S_RAW = JSON.stringify({ foo: "bar" });
