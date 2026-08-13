# Microfrontend + TanStack Query POC

Two independent Vite/React apps, wired together at runtime with
[Module Federation](https://github.com/originjs/vite-plugin-federation):

- **`host/`** — the shell app. Runs on `http://localhost:5000`.
  Dynamically loads a component from the remote app and renders it
  inside a `QueryClientProvider`.
- **`remote-products/`** — an independently deployable microfrontend.
  Runs on `http://localhost:5001`. Exposes a `ProductList` component
  that fetches data with `@tanstack/react-query`. It can also run
  fully standalone (open `localhost:5001` directly).

Because `react`, `react-dom`, and `@tanstack/react-query` are all
declared as `shared` singletons in the federation config, the remote's
`useQuery` calls actually read from the **same QueryClient instance**
that the host provides — proving state/cache can be shared across
microfrontend boundaries, not just UI.

## Why build + preview, not `dev`?

`vite-plugin-federation` needs the compiled `remoteEntry.js` manifest
to exist on disk, so remotes must be **built** first. `vite dev`'s
on-the-fly transforms don't produce that artifact reliably. The
standard workflow (used below) is `build` + `preview` for both apps.

## Running it

Open two terminals.

**Terminal 1 — the remote (must be built + running first):**
```bash
cd remote-products
npm install
npm run build
npm run preview   # serves on http://localhost:5001
```

**Terminal 2 — the host:**
```bash
cd host
npm install
npm run build
npm run preview   # serves on http://localhost:5000
```

Then open `http://localhost:5000`. You'll see the host shell render,
then the remote's `ProductList` component streams in underneath —
loaded from a completely separate build/deploy at runtime.

You can also open `http://localhost:5001` directly to see the same
`ProductList` component running standalone in the remote's own app,
with its own local `QueryClient`.

## What to poke at

- Kill the remote preview server and reload the host — you'll see the
  `Suspense` fallback stay stuck, demonstrating the runtime coupling
  (and why you'd want error boundaries in production).
- Change the port/URL in `host/vite.config.js` (`remotes.remote_products`)
  to point at a different deployment of the remote — no rebuild of the
  host needed, since the URL is resolved at runtime.
- Add a second exposed component in `remote-products` and a second
  remote in `host` to see multiple independently-owned MFEs composed
  together.
