import { createBrowserRouter } from 'react-router-dom'

import { AdminDashboard } from './pages/app/admin_dashboard'
import { Dashboard } from './pages/app/dashboard'
import { Home } from './pages/auth/home'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/layouts/app'
import { AuthLayout } from './pages/layouts/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },

  {
    path: '/admin-dashboard',
    element: <AdminDashboard />,
  },
])
