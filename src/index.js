import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/providers/theme";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import ProfilePage from "./pages/ProfilePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoadingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
);
