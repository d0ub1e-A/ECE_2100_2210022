import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotePage from './pages/NotePage.jsx';
import { createContext, useEffect, useState } from "react";

export const GlobalState = createContext(null);

export default function App() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GlobalState.Provider value={{ width }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          ></Route>
          <Route
            path="/login-signup"
            element={<LoginPage />}
          ></Route>
          <Route
            path="/notes"
            element={<NotePage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </GlobalState.Provider>
  );
}