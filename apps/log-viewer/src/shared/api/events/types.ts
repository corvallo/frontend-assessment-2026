import type { ValueOf } from "@/shared/model/types";

export type RawEventPayload = string;

export type K8sObjectRef = {
	apiVersion?: string;
	kind?: string;
	name?: string;
	namespace?: string;
	uid?: string;
	resourceVersion?: string;
	fieldPath?: string;
};

export type K8sEventMetadata = {
	name?: string;
	namespace?: string;
	uid?: string;
	resourceVersion?: string;
	creationTimestamp?: string;
};

export type K8sEventSource = {
	component?: string;
	host?: string;
};

export type K8sEventSeries = {
	count?: number;
	lastObservedTime?: string;
};

export const K8sEventType = {
	Normal: "Normal",
	Warning: "Warning",
} as const;

export type K8sEventType = ValueOf<typeof K8sEventType>;

export type ParsedK8sEvent = {
	apiVersion?: string;
	kind?: string;
	id: string;
	type?: K8sEventType;
	reason?: string;
	action?: string;
	message?: string;
	reportingComponent?: string;
	reportingInstance?: string;
	firstTimestamp?: string;
	lastTimestamp?: string;
	eventTime?: string;
	count?: number;
	metadata?: K8sEventMetadata;
	involvedObject?: K8sObjectRef;
	source?: K8sEventSource;
	series?: K8sEventSeries;
};

export type StreamEvent = {
	id: string;
	raw: string;
	parsed?: ParsedK8sEvent;
	malformed: boolean;
	receivedAt: number;
};

export type SSEHandlers = {
	onOpen?: () => void;
	onMessage?: (event: StreamEvent) => void;
	onError?: (error: unknown) => void;
};
