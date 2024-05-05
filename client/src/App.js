import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/auth";
import Home from "./pages/Home";
import Details from "./pages/Details"
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const { authData } = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("dark"));

  const user = localStorage.getItem("dark");

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile")));
    if (user === "true" || user === null) {
      setDarkMode(true);
      window.document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      window.document.documentElement.classList.remove("dark");
    }
  }, [authData, localStorage.getItem("profile")]);

  // add / remove dark mode
  const darkOrLight = async (dark) => {
    setDarkMode(dark);
    localStorage.setItem("dark", `${dark}`);
    if (dark) {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  };

  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            padding: "5px",
            fontSize: "13px",
          },
        }}
      />
        <Header
          darkMode={darkMode}
          darkOrLight={darkOrLight}
          userProfile={userProfile}
        />
      <div className="max-w-6xl w-full mx-auto">
        <Routes>
          {/* -----------------home route */}
          <Route path="/" element={<Navigate to="/posts?page=1" />} />

          <Route path="/posts" element={<Home darkMode={darkMode} />} />

          {/* ------------search route */}
          <Route path="/posts/search" element={<Home darkMode={darkMode} />} />

          {/* --------------auth system */}
          <Route
            path="/sign-in"
            element={
              !userProfile ? (
                <SignIn darkMode={darkMode} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              !userProfile ? (
                <SignUp darkMode={darkMode} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/* ---------------post Details */}
          <Route path="/post/Details/:id" element={<Details darkMode={Details} userProfile={userProfile} /> } />

          {/* --------------4O4 page */}
          <Route path="*" element={<PageNotFound darkMode={darkMode} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
