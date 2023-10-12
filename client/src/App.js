import { ThemeProvider } from "@material-tailwind/react";
import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";
import { useSelector } from "react-redux";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";
import SignIn from "./pages/auth"
import Details from "./pages/Details";
import { ToastContainer } from "react-toastify";

function App() {
  const [UserProfile, setUserProfile] = useState(null);

  // -----------useEffect
  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="max-w-6xl w-full mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/posts?page=1" replace/>} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/post/Details/:id" element={<Details UserProfile={UserProfile}/>} />
            <Route path="/sign-in" element={!UserProfile ? <SignIn /> : <Navigate to="/posts" replace/>} />
            <Route path="/sign-up" element={!UserProfile ? <SignUp /> : <Navigate to="/posts" replace/>} />
          </Routes>
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
