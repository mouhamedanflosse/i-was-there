import "./App.css";
import Header from "./component/Header";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/auth";
import Details from "./pages/Details";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("dark"));
  const [userProfile, setUserProfile] = useState();
  const { authData } = useSelector((state) => state.auth);


  const user = localStorage.getItem("dark");

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile")))
    if (user === "true") {
      setDarkMode(true);
      window.document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      window.document.documentElement.classList.remove("dark");
    }
  }, [authData,localStorage.getItem("profile")]);


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
        <div className="">
          <Toaster
            toastOptions={{
              className: "",
              style: {
                padding: "5px",
                fontSize: "13px",
              },
            }}
          />
          <div className=" w-full h-full pb-1">
            <div className="max-w-6xl w-full mx-auto">
              <Header
                darkOrLight={darkOrLight}
                darkMode={darkMode}
                userProfile={userProfile}
              />
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/posts?page=1" replace />}
                />

                <Route path="/posts" element={<Home darkMode={darkMode} />} />

                <Route
                  path="/posts/search"
                  element={<Home darkMode={darkMode} />}
                />

                <Route
                  path="/post/Details/:id"
                  element={
                    <Details UserProfile={userProfile} darkMode={darkMode} />
                  }
                />

                <Route
                  path="/sign-in"
                  element={
                    !userProfile ? (
                      <SignIn darkMode={darkMode} />
                    ) : (
                      <Navigate to="/posts" replace />
                    )
                  }
                />

                <Route
                  path="/sign-up"
                  element={
                    !userProfile ? (
                      <SignUp darkMode={darkMode} />
                    ) : (
                      <Navigate to="/posts" replace />
                    )
                  }
                />
                	<Route path="*" element={<PageNotFound  darkMode={darkMode}/>} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
