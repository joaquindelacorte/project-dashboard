import { useState, useEffect } from "react";

export default function ProjectModal({ open, initial, onClose, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(initial?.name || "");
    setDescription(initial?.description || "");
  }, [initial, open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ name, description });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initial ? "Editar proyecto" : "Nuevo proyecto"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border rounded px-3 py-2"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
