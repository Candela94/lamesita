import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'


import router from './lib/routes'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
