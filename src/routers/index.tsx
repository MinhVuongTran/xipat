import App from '@app'
import DashboardPage from '@app/dashboard'
import PostManagerPage from '@app/posts'
import SettingPage from '@app/settings'
import DashboardLayout from '@layouts/dashboard'
import { type RouteObject } from 'react-router-dom'
import { v4 } from 'uuid'

export type DataRouteObject = Omit<RouteObject, 'children'> & {
  id: string
  children?: DataRouteObject[]
  meta?: {
    title?: string
    titleKey?: string
  }
}

export const routers: DataRouteObject[] = [
  {
    id: 'root',
    element: <App />,
    children: [
      {
        id: 'signed',
        path: '',
        element: <DashboardLayout />,
        children: [
          {
            id: v4(),
            path: 'dashboard',
            Component: DashboardPage,
          },
          {
            id: v4(),
            path: 'posts',
            Component: PostManagerPage,
          },
          {
            id: v4(),
            path: 'settings',
            Component: SettingPage,
          },
        ],
      },
    ],
  },
]
