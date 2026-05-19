export type EventDetailStore = {
	selectedEventId: string | null;
	selectEvent: (id: string) => void;
	clear: () => void;
};
