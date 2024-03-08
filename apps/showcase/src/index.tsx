import * as React from 'react'

import ReactDOM from 'react-dom/client'

import App from './app'

// fonts
import './styles/globals.css'

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
