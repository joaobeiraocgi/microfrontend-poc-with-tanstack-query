import { useQuery } from '@tanstack/react-query'

async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products?limit=5')
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

// This is the component exposed via Module Federation. It has no
// idea whether it's rendered inside its own standalone app or inside
// the host shell — `useQuery` just reads whatever QueryClient is
// provided by the nearest QueryClientProvider up the tree, which, in
// the shared/singleton setup, is a genuinely shared cache when
// rendered inside the host.
export default function ProductList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 30_000,
  })

  if (isLoading) return <p>Loading products (fetched from the remote MFE)…</p>
  if (isError) return <p>Error loading products: {error.message}</p>

  return (
    <div style={{ border: '2px dashed #888', borderRadius: 8, padding: 16, marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Remote: ProductList</h2>
      <p style={{ fontSize: 13, opacity: 0.7 }}>
        Rendered by <code>remote-products</code>, data fetched with{' '}
        <code>@tanstack/react-query</code>.
      </p>
      <ul>
        {data.map((p) => (
          <li key={p.id}>
            {p.title} — ${p.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
