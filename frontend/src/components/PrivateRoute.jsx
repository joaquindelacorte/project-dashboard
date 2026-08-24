import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user, token, loading } = useAuth();

  if (loading) return <div className="p-6 text-center">Cargando...</div>;
  if (!token || !user) return <Navigate to="/login" replace />;

  return children;
}
