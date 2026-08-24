import { useState, useEffect } from "react";

export default function TaskModal({ open, initial, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
    setStatus(initial?.status || "todo");
    setPriority(initial?.priority || "medium");
  }, [initial, open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ title, description, status, priority });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{initial ? "Editar tarea" : "Nueva tarea"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border rounded px-3 py-2"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">Por hacer</option>
            <option value="in_progress">En progreso</option>
            <option value="done">Terminado</option>
          </select>
          <select
            className="border rounded px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-slate-100">
              Cancelar
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-indigo-600 text-white">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
