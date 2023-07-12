import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Notification from "@/pages/Notifications";
import Login from "@/pages/Login";
import { useStore } from "@/stores";

const Authentication = () => {
  const session = useStore((state) => state.session);

  if (!session.accessJwt || !session.refreshJwt) {
    return <Navigate to={{ pathname: "/authentication" }} />;
  }
  return <Outlet />;
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Login />} />
        <Route element={<Authentication />}>
          <Route path="/" element={<Home />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile/:handle" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
