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
            <Route path="/sign-in" element={!localStorage.getItem("profile") ? <SignIn /> : <Navigate to="/posts" replace/>} />
            <Route path="/sign-up" element={!localStorage.getItem("profile") ? <SignUp /> : <Navigate to="/posts" replace/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
