import { Suspense, lazy } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Dynamic import of a component exposed by a completely separate
// Vite build. `remote_products` is resolved via the `remotes` map in
// vite.config.js at runtime, not at build time.
const ProductList = lazy(() => import('remote_products/ProductList'))

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ fontFamily: 'sans-serif', padding: 24, maxWidth: 640 }}>
        <h1>Host Shell</h1>
        <p>
          This is the host app (port 5000). It owns the{' '}
          <code>QueryClient</code> below and renders a microfrontend
          that was built and deployed independently, on port 5001.
        </p>

        <Suspense fallback={<p>Loading remote microfrontend…</p>}>
          <ProductList />
        </Suspense>
      </div>
    </QueryClientProvider>
  )
}
