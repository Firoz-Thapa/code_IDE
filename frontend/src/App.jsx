import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Editior from "./pages/Editor";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loginStatus);
      console.log("Auth status checked, isLoggedIn:", loginStatus);
    };

    // Check initially
    checkLoginStatus();

    // Set up event listener for storage changes (in case of login in another tab)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  console.log("App rendering, isLoggedIn:", isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/about"
          element={isLoggedIn ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <Contact /> : <Navigate to="/login" />}
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/editor/:projectID"
          element={isLoggedIn ? <Editior /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={isLoggedIn ? <NoPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
