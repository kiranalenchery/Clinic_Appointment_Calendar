import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, authOnly = true }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (authOnly && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!authOnly && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
