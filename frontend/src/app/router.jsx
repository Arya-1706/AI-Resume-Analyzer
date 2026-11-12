import { createBrowserRouter } from 'react-router-dom'

import PublicLayout from '../features/landing/PublicLayout'
import Landing from '../features/landing/pages/Landing'
import Sample from '../features/landing/pages/Sample'

import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import GuestRoute from '../features/auth/components/GuestRoute'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'

import AppLayout from './AppLayout'
import Analyze from '../features/interview/pages/Analyze'
import History from '../features/interview/pages/history'
import Report from '../features/interview/pages/Report'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/sample', element: <Sample /> },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/analyze', element: <Analyze /> },
          { path: '/history', element: <History /> },
          { path: '/history/:reportId', element: <Report /> },
        ],
      },
    ],
  },
])