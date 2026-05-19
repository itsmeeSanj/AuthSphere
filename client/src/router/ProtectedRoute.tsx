import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

interface Props {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: Props) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to='/login' replace />;

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <Outlet />;
}
