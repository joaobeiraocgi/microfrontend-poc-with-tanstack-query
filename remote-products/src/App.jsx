import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductList from './ProductList.jsx'

const queryClient = new QueryClient()

// Standalone shell so this microfrontend is a fully working app on
// its own (localhost:5001), not just a fragment that only works
// inside the host.
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ fontFamily: 'sans-serif', padding: 24, maxWidth: 640 }}>
        <h1>Remote App — standalone mode</h1>
        <p>Running independently on port 5001, with its own QueryClient.</p>
        <ProductList />
      </div>
    </QueryClientProvider>
  )
}
