import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Timeline from "@/pages/Timeline";
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
          <Route path="/" element={<Timeline />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
