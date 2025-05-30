import './index.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/PageHome.jsx";
import LoginPage from "./pages/PageLogin.jsx";
import NotePage from './pages/PageNote.jsx';

export default function App() {
  const allRoutes = createBrowserRouter([
    {
      path: `/`,
      element: <HomePage/>
    },
    {
      path: `/login`,
      element: <LoginPage/>
    },
    {
      path: `/notes`,
      element: <NotePage/>
    },
  ]);

  return (
    <RouterProvider router={allRoutes}/>
  );
}