import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
      <Link to="/" className="font-semibold text-lg">
        Dashboard de Proyectos
      </Link>
      {user && (
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:inline">{user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded"
          >
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}
