import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// This entry point only matters when running remote-products by
// itself (e.g. its own dev team iterating on it). When consumed by
// the host, only ProductList.jsx is ever loaded — this file is
// never touched.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
