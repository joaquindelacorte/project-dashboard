import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  async function loadProjects() {
    setLoading(true);
    const res = await api.get("/projects");
    setProjects(res.data);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(project) {
    setEditing(project);
    setModalOpen(true);
  }

  async function handleSave(data) {
    if (editing) {
      await api.put(`/projects/${editing._id}`, data);
    } else {
      await api.post("/projects", data);
    }
    setModalOpen(false);
    loadProjects();
  }

  async function handleDelete(project) {
    if (!window.confirm(`¿Eliminar el proyecto "${project.name}"?`)) return;
    await api.delete(`/projects/${project._id}`);
    loadProjects();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Mis proyectos</h1>
          <button
            onClick={openCreate}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            + Nuevo proyecto
          </button>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onOpen={(p) => navigate(`/projects/${p._id}`)}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
            {projects.length === 0 && (
              <p className="text-slate-500">Todavía no tenés proyectos. Creá el primero.</p>
            )}
          </div>
        )}
      </main>

      <ProjectModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
