import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import TaskColumn from "../components/TaskColumn.jsx";
import TaskModal from "../components/TaskModal.jsx";

const STATUSES = ["todo", "in_progress", "done"];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function load() {
    const [projectRes, tasksRes] = await Promise.all([
      api.get(`/projects/${id}`),
      api.get(`/projects/${id}/tasks`),
    ]);
    setProject(projectRes.data);
    setTasks(tasksRes.data);
  }

  useEffect(() => {
    load();
  }, [id]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(task) {
    setEditing(task);
    setModalOpen(true);
  }

  async function handleSave(data) {
    if (editing) {
      await api.put(`/tasks/${editing._id}`, data);
    } else {
      await api.post(`/projects/${id}/tasks`, data);
    }
    setModalOpen(false);
    load();
  }

  async function handleDelete(task) {
    if (!window.confirm(`¿Eliminar la tarea "${task.title}"?`)) return;
    await api.delete(`/tasks/${task._id}`);
    load();
  }

  if (!project) return <p className="p-6">Cargando...</p>;

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <button onClick={() => navigate("/")} className="text-sm text-indigo-600 mb-2">
          ← Volver a proyectos
        </button>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">{project.name}</h1>
            <p className="text-sm text-slate-500">{project.description}</p>
          </div>
          <button
            onClick={openCreate}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            + Nueva tarea
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {STATUSES.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      <TaskModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
