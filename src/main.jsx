import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './assets/loginPage/LoginPage.jsx'
import HomePage from './assets/HomePage.jsx'
import PrivateRoute from './assets/privateRoute/PrivateRoute.jsx'
import Registration from './assets/registration/Registration.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute>
      <HomePage />
    </PrivateRoute>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <Registration />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)