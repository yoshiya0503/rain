import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Notification from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import useAuthentication from "@/hooks/useAuthentication";

const Authentication = () => {
  const { session, resume } = useAuthentication();

  if (session === undefined) {
    throw resume();
  }
  if (session === null) {
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
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
