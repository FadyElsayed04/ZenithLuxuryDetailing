import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './components/Admin.jsx'
import MobileContactPage from './components/MobileContactPage.jsx'
import MobileGalleryPage from './components/MobileGalleryPage.jsx'
import PackagesPage from './components/PackagesPage.jsx'
import './index.css'

function Router() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const path = window.location.pathname
  const isAdmin = path === '/zenith-admin' || hash === '#/zenith-admin'

  if (isAdmin) return <Admin />
  if (path === '/packages') return <PackagesPage />
  if (path === '/gallery') return <MobileGalleryPage />
  if (path === '/contact') return <MobileContactPage />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
