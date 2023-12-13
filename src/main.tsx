import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//CSS
import '@/index.css'

import '@/assets/css/bootstrap/5/bootstrap.min.css'

import '@/assets/css/w3css/4/w3.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
