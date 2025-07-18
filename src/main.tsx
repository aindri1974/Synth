import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Community from '@/pages/Community';
import Contact from '@/pages/Contact';
import Inspiration from './pages/Inspiration';
import BuildPage from './pages/Build';
import SignUpPage from './pages/Signup';
import SignInPage from './pages/Signin';
import DashboardPage from './pages/Dashboard';
import Layout from './Layout';
import "./index.css"
// In your main application (likely _app.tsx or layout.tsx), add these headers:
export const metadata = {
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp'
  }
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, // No <Outlet />, so child routes won’t show!
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "Community", element: <Community /> },
      { path: "contact", element: <Contact /> },
      { path: "inspiration", element: <Inspiration /> },
      { path: "build", element: <BuildPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
