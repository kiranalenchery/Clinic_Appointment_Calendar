// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, authOnly = true }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (authOnly && !isAuthenticated) {
    // 🔒 If route needs auth but user is not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  if (!authOnly && isAuthenticated) {
    // 🚫 If route is public (like login) but user is logged in → redirect to home
    return <Navigate to="/home" replace />;
  }

  return children;
}
