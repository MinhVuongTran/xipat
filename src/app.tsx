import React from 'react'
import { Outlet } from 'react-router-dom'

type AppProps = {}

const App: React.FC<React.PropsWithChildren<AppProps>> = () => {
  return <Outlet />
}

export default App
