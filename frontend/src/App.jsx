import './index.css';

import { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/PageHome.jsx";
import LoginPage from "./pages/PageLogin.jsx";
import NotePage from './pages/PageNote.jsx';
import UserLayout from './layout/LayoutUser.jsx';
import PublicLayout from './layout/LayoutPublic.jsx';
import UserProfilePage from './pages/PageUserProfile.jsx';
import Toaster from './components/modal/ModalToaster.jsx';

export const GlobalContext = createContext();

export default function App() {
  const [toasterType, setToasterType] = useState('');
  const [toasterText, setToasterText] = useState('');
  const [showToaster, setShowToaster] = useState(false);

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
          path: ``,
          element: <UserProfilePage />
        },
        {
          path: `notes`,
          element: <NotePage />
        }
      ]
    },
  ]);

  function notifyUser(notificationType, notificationText) {
    setToasterType(notificationType);
    setToasterText(notificationText);

    setTimeout(() => setShowToaster(true), 25);
    setTimeout(() => setShowToaster(false), 3000);
  }

  return (
    <GlobalContext.Provider value={{ notifyUser }}>
      <Toaster
        showToaster={showToaster}
        type={toasterType}
        text={toasterText}
      />
      <RouterProvider router={allRoutes} />
    </GlobalContext.Provider>
  );
}