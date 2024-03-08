import type { PathRouteProps } from 'react-router-dom'

import React from 'react'

const Home = React.lazy(() => import('../pages/home'))

export const routes: Array<PathRouteProps> = [
  {
    element: <Home />,
    path: '/',
  },
]
