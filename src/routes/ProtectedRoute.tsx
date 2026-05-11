import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // wait until auth is initialized
  if (loading) {
    return null;
  }

  // not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // logged in
  return children;
}
