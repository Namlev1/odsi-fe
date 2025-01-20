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
    path: '/post/:id',
    element: <PrivateRoute>
      <Post />
    </PrivateRoute>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)