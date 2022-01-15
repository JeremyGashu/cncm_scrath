import { Navigate, Outlet } from "react-router-dom";
import FullPageLoading from "../components/FullPageLoading";
import { useAuth } from "../hooks/auth";


const PrivateRoute = ({ routeRole }) => {
  const { user, currentRole, loading } = useAuth();

  console.log(currentRole)

  if (user && currentRole) {
    if (currentRole === routeRole) {
      return <Outlet />;
    } else {
      return <Navigate to='/' />;
    }
  } else if (loading) {
    return (
      <FullPageLoading />
    );
  }

  else {
    return <Navigate to='/' />
  }
};

export default PrivateRoute;
