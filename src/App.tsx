import AppLayout from "./components/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from "./page/Login";
import Signin from "./components/Signin";
import Home from "./page/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./page/About";
import CreateUser from "./features/users/CreateUser";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}>
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<CreateUser />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
