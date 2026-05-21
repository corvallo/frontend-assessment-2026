import type { StreamEvent } from "@/shared/api/events/types";

export function makeMalformedEvent(
	overrides: Partial<StreamEvent> & { id: string },
): StreamEvent {
	return {
		id: overrides.id,
		raw: overrides.raw ?? '{"incomplete":',
		malformed: true,
		receivedAt: overrides.receivedAt ?? new Date("2026-05-18T08:00:00.000Z").getTime(),
	};
}

export function makeEvent(overrides: Partial<StreamEvent> & { id: string }): StreamEvent {
	return {
		id: overrides.id,
		raw: overrides.raw ?? `{"id":"${overrides.id}"}`,
		malformed: overrides.malformed ?? false,
		receivedAt: overrides.receivedAt ?? Date.now(),
		parsed: overrides.parsed ?? {
			id: overrides.id,
			kind: "Event",
			apiVersion: "v1",
			type: "Normal",
			reason: "Pulling",
			action: "Pulling",
			message: "test message",
			reportingComponent: "kubelet",
			reportingInstance: "ip-10-0-1-1",
			firstTimestamp: "2026-05-18T08:00:00.000Z",
			lastTimestamp: "2026-05-18T08:00:00.000Z",
			eventTime: "2026-05-18T08:00:00.000Z",
			count: 1,
			metadata: {
				name: "pod.abc",
				namespace: "default",
				uid: "uuid-meta",
				resourceVersion: "1234",
				creationTimestamp: "2026-05-18T08:00:00.000Z",
			},
			involvedObject: {
				apiVersion: "v1",
				kind: "Pod",
				name: "my-pod",
				namespace: "default",
				uid: "uuid-obj",
				resourceVersion: "5678",
			},
			source: { component: "kubelet", host: "ip-10-0-1-1" },
		},
	};
}
