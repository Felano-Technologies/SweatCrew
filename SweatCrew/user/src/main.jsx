// src/main.jsx
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// dual sanity checks
console.log('▶️ main.jsx loaded')
console.log('▶️ About to mount App')

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
