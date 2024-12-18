import useAuthStore from "@/store/userStore";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
