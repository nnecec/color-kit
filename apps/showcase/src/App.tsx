import { BrowserRouter as Router } from 'react-router-dom'

import { NextUIProvider } from '@nextui-org/react'

import Routings from './router/routings'

const App = () => (
  <NextUIProvider>
    <Router>
      <Routings />
    </Router>
  </NextUIProvider>
)

export default App
