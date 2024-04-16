import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from "./page/Login";
import Signin from "./app/features/auth/SignIn";
import Home from "./page/Home";
import CreateUser from "./components/registerForms/CreateUser";
import RequireAuth from "./app/features/auth/requireAuth";
import PeresistLogin from "./app/features/auth/PeresistLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./page/Profile";
import Prefetch from "./app/features/auth/PreFetch";
import Tweets from "./app/features/posts/Tweets";
import Explore from "./page/Explore";
import Friends from "./page/Friends";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}>
            <Route path="sign-in" element={<Signin />} />
            <Route path="sign-up" element={<CreateUser />} />
          </Route>
          <Route element={<PeresistLogin />}>
            <Route element={<RequireAuth />}>
              <Route element={<Prefetch />}>
                <Route  element={<Home />} >
                <Route index element={<Tweets />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/friends" element={<Friends />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
