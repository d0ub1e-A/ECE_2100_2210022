import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotePage from './pages/NotePage.jsx';

export default function App() {
  return (
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
  );
}