import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
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
