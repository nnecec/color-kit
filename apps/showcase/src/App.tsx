import { BrowserRouter as Router } from 'react-router-dom'

import { NextUIProvider } from '@nextui-org/react'

import Routings from './router/routings'

const App = () => (
  <html>
    <head>
      <title>Tailwind plugin palette</title>
      <meta content="tailwind plugin palette" name="description" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="default" name="apple-mobile-web-app-status-bar-style" />
    </head>

    <NextUIProvider>
      <body>
        <Router>
          <div className="min-h-screen">
            <main>
              <Routings />
            </main>
          </div>
        </Router>
      </body>
    </NextUIProvider>
  </html>
)

export default App
