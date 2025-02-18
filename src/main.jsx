import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './assets/loginPage/LoginPage.jsx'
import HomePage from './assets/homePage/HomePage.jsx'
import PrivateRoute from './assets/privateRoute/PrivateRoute.jsx'
import Registration from './assets/registration/Registration.jsx'
import CreatePost from './assets/createPost/CreatePost.jsx'
import Profile from './assets/Profile/Profile.jsx'
import Post from './assets/Post.jsx'
import User from './user/User.jsx'
import ChangePassword from './assets/ChangePassword.jsx'
import ResetPassword from './assets/resetPassword/ResetPassword.jsx'

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
  },
  {
    path: '/reset',
    element: <ResetPassword />
  },
  {
    path: '/create',
    element: <PrivateRoute>
      <CreatePost />
    </PrivateRoute>
  },
  {
    path: '/profile',
    element: <PrivateRoute>
      <Profile />
    </PrivateRoute>
  },
  {
    path: '/user/:username',
    element: <PrivateRoute>
      <User />
    </PrivateRoute>
  },
  {
    path: '/post/:id',
    element: <PrivateRoute>
      <Post />
    </PrivateRoute>
  },
  {
    path: '/password',
    element: <PrivateRoute>
      <ChangePassword />
    </PrivateRoute>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)