# K8s Event Stream — Log Viewer

## Candidate: Francesco Stallo

Frontend for the Kubernetes-style event stream server. Displays live events via SSE, supports filtering, detail modal with YAML, and survives server restarts and malformed events.

## Getting started

```sh
# from repo root — start the event server
npm install
npm run start

# from repo root — start the frontend (pnpm workspace)
pnpm install
pnpm --filter log-viewer dev
```

Copy `.env.example` to `.env` before starting:

```sh
cp .env.example .env
```

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:4000` | Base URL of the event stream server |

## Available Commands
| Command | Description |
|---|---|
| `pnpm --filter log-viewer dev` | Dev server with HMR |
| `pnpm --filter log-viewer build` | Type-check + production build |
| `pnpm --filter log-viewer preview` | Serve the production build locally |
| `pnpm --filter log-viewer test` | Run tests in watch mode |

## Architecture

The project follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)**, a layered architecture for frontend applications.
Each layer can only import from layers below it.

```
app/          → providers, global styles, root layout
pages/        → route-level components that assemble widgets
widgets/      → page sections composed from features + entities
features/     → self-contained user interactions
entities/     → domain models (event store, connection store)
shared/       → UI primitives, API clients, utility hooks
```

### Layers overview

- **`shared/`** — API clients (SSE, catch-up REST, config), shadcn/ui primitives, utilities
- **`entities/event/`** — event StorageEvent, connection store, `ConnectionManager`
- **`features/`** — 12 self-contained slices: autoscroll, connection status, event detail modal, events search, pause/resume, rate selector, theme toggle, and various counters
- **`widgets/`** — `header`, `toolbar`, `events-list`
- **`pages/`** — `dashboard` page, assembles header + toolbar + events-list widgets

## Key design decisions

### SSE over WebSocket

SSE was chosen because:
- Natively reconnects (browser `EventSource`), which was overriden with custom backoff to control the timing
- Simpler to reason about for a unidirectional stream
- HTTP/2 compatible without upgrade

### TanStack Virtual for the list

The event list uses absolute-positioned virtualisation so only visible rows render. 

Estimate sizes differ based on viewport and update on `resize`.

### Zustand split stores

State is split into stores (`useEventStore`, `useConnectionStore`, `useEventDetailStore`, `useSearchStore`, `useAutoScrollStore`) so components subscribe only to the slice they need, 
avoiding unnecessary re-renders. 

### Autoscroll

Two scroll strategies:
- **Instant** — used on new events when autoscroll is on; always reaches the true DOM bottom regardless of virtualizer state
- **Smooth**  — used only when the user clicks the floating button

A `isProgrammaticRef` flag prevents the scroll handler from disabling autoscroll during programmatic scrolls.

### Exponential backoff

`ConnectionManager` retries with `min(1000 × 2^n, 30 000)` ms delay. After 5 retries the state becomes `unreachable` and the UI signals the server cannot be reached. Retrying closes the `EventSource` immediately on `onerror` to prevent the browser's own 3-second native retry from interfering.

### Catch-up on reconnect

When the SSE connection drops and reconnects, `ConnectionManager` calls `GET /events?since=<lastEventId>` before marking the connection as `connected`. This fills the gap without duplicating events (the store deduplicates by id).

### Malformed events

Events that fail JSON parsing or do not conform to the K8s Event schema are marked `malformed: true` and kept in the store with their `raw` string. The UI renders them as a distinct variant of `EventRow` and the detail modal shows the raw string instead of YAML.

### Event detail modal

- YAML is produced with the `yaml` library from `event.parsed`
- Prev/next navigation filters siblings by `involvedObject.uid` using `useShallow` to avoid re-renders on unrelated events

### Exact-text filter

The filter is a pure function (`filterEvents`) applied in `useMemo`. It matches against all visible columns: `message`, `namespace`, `reason`, `kind/name`, `source.component`, and `raw` (for malformed). The `involvedObject` is matched as the combined `kind/name` string so searching `"Pod/my-pod"` works as displayed.

## Libraries

| Library | Why |
|---|---|
| **React 19** | Concurrent features, `memo` + hooks |
| **Zustand 5** | Minimal boilerplate, stable `getState()` outside React, `useShallow` for array selectors |
| **TanStack Virtual 3** | Virtualise large lists without a heavy abstraction |
| **shadcn/ui + Radix UI** | Set of beautifully-designed, accessible components |
| **Tailwind CSS 4** | Utility-first, no runtime |
| **class-variance-authority** | Type-safe component variants |
| **js-yaml** | Stringify parsed K8s events for the detail modal |
| **Vitest + Testing Library** | Fast unit tests co-located with source, React hook testing |
| **Biome** | Single tool for lint + format |

