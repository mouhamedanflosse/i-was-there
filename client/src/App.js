import { ThemeProvider } from "@material-tailwind/react";
import "./App.css";
import Header from "./component/Header";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/auth";
import Details from "./pages/Details";
import { ToastContainer } from "react-toastify";

function App() {
  const [UserProfile, setUserProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("dark"));

  // -----------useEffect
  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  const user = localStorage.getItem("dark");
  useEffect(() => {
    if (user === "true") {
      setDarkMode(true);
      window.document.documentElement.classList.add("dark")
    } else {
      setDarkMode(false);
      window.document.documentElement.classList.remove("dark")
    }
  }, []);
  const darkOrLight =  async (dark) => {
    setDarkMode(dark);
    localStorage.setItem("dark", `${dark}`);
    if (dark) {
      window.document.documentElement.classList.add("dark")
    } else {
      window.document.documentElement.classList.remove("dark")
    }
  };
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="">
          <div className=" w-full h-full pb-1">
            <div className="max-w-6xl w-full mx-auto">
              <Header darkOrLight={darkOrLight} darkMode={darkMode}/>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/posts?page=1" replace />}
                />
                <Route path="/posts" element={<Home />} />
                <Route path="/posts/search" element={<Home />} />

                <Route
                  path="/post/Details/:id"
                  element={<Details UserProfile={UserProfile} darkMode={darkMode} />}
                />

                <Route
                  path="/sign-in"
                  element={
                    !UserProfile ? <SignIn darkMode={darkMode} /> : <Navigate to="/posts" replace />
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    !UserProfile ? <SignUp darkMode={darkMode} /> : <Navigate to="/posts" replace />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer
        toastClassName="w-[200px] h-[20px] mx-auto -translate-y-[20px] Xsm:translate-y-0 sm:w-[220px] text-[14px]"
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThemeProvider>
  );
}

export default App;
