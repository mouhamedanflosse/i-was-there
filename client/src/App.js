import { ThemeProvider } from "@material-tailwind/react";
import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./actions/posts";
import { useSelector } from "react-redux";
import Posts from "./pages/Posts";
import SignUp from "./pages/SignUp";
import  SignIn  from "./pages/auth";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  // -----------useEffect
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
console.log(posts)
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="max-w-6xl w-full mx-auto">
          <Header />
          <Routes>
            <Route path="/Sign-in" element={<SignIn />} />
            <Route path="/Sign-up" element={<SignUp />} />
            <Route path="/" element={<Posts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
