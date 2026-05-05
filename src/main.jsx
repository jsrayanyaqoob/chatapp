import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/HomePage"
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import MainPage from './pages/MainPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signin",
    element: <SignInPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  {
    path: "/main",
    element: <MainPage />
  },
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)