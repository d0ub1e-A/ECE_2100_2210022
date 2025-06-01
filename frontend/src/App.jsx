import './index.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/PageHome.jsx";
import LoginPage from "./pages/PageLogin.jsx";
import NotePage from './pages/PageNote.jsx';
import UserLayout from './pages/layout/LayoutUser.jsx';
import PublicLayout from './pages/layout/LayoutPublic.jsx';

export default function App() {
  const allRoutes = createBrowserRouter([
    {
      path: `/`,
      element: <PublicLayout />,
      children: [
        {
          path: ``,
          element: <HomePage />
        },
        {
          path: `login`,
          element: <LoginPage />
        }
      ]
    },
    {
      path: `/me`,
      element: <UserLayout />,
      children: [
        {
          path: `notes`,
          element: <NotePage />
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={allRoutes} />
  );
}