import { Navigate, Outlet, useLocation } from "react-router";

type UserRole = "admin" | "user";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  user: AuthUser | null;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

function ProtectedRoute({
  isAuthenticated,
  user,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
