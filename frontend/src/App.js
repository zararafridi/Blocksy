import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, resetUser } from "./store/userSlice";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import style from "./App.module.css";
import Protected from "./components/protected/Protected";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";
import Crypto from "./pages/Crypto/Crypto";
import Blog from "./pages/Blogs/Blog";
import SubmitBlog from "./pages/SubmitBlog/SubmitBlog";
import BlogDetail from "./pages/BlogDetails/BlogDetail";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.auth);
  const BACKEND_URL = process.env.REACT_APP_INTERNAL_API_PATH;
  // ✅ Check session on first load
 useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/refresh`, {
        withCredentials: true, // needed for cookies
      });

      if (response.status === 200) {
        const user = {
          _id: response.data.user._id,
          email: response.data.user.email,
          username: response.data.user.username,
          auth: true,
        };
        dispatch(setUser(user));
      }
    } catch (error) {
      dispatch(resetUser());
    }
  };

  // ✅ only run this if Redux state shows not authenticated
  if (!isAuth) {
    checkAuth();
  }
}, [dispatch, isAuth]);


  return (
    <div className={style.container}>
      <BrowserRouter>
        <div className={style.layout}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div className={style.main}>
                  <Home />
                </div>
              }
            />
            <Route
              path="crypto"
              exact
              element={<div className={style.main}><Crypto/></div>}
            />
            <Route
              path="blogs"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}><Blog/></div>
                </Protected>
              }
            />
            <Route
              path="blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}><BlogDetail/></div>
                </Protected>
              }
            />
            <Route
              path="/blog/update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}><UpdateBlog/></div>
                </Protected>
              }
            />
            <Route
              path="submit"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={style.main}><SubmitBlog/></div>
                </Protected>
              }
            />
            <Route
              path="login"
              exact
              element={<div className={style.main}><Login/></div>}
            />
            <Route
              path="signup"
              exact
              element={<div className={style.main}><Signup/></div>}
            />
            <Route path="*" element={<div className={style.main}><Error/></div>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
