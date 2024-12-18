import useAuthStore from "@/store/userStore";
import { Navigate, Outlet } from "react-router-dom";

const RestrictedRoute = () => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RestrictedRoute;
