import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAdmin from "../Hook/useAdmin";

const AdminRoute = ({ children }) => {
  //user from hooks
  const { user, loading } = useAuth();
  //admin from useAdmin hooks
  const [isAdmin,isPending] = useAdmin()

  //location
  const location = useLocation();
  if (loading || isPending) {
    return (
      <p className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </p>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;

  
};

export default AdminRoute;
