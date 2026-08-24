export default function ProjectCard({ project, onOpen, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-slate-200">
      <h3 className="font-semibold text-slate-800">{project.name}</h3>
      <p className="text-sm text-slate-500 line-clamp-2">{project.description}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onOpen(project)}
          className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Abrir
        </button>
        <button
          onClick={() => onEdit(project)}
          className="text-sm bg-slate-100 px-3 py-1 rounded hover:bg-slate-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(project)}
          className="text-sm text-red-600 px-3 py-1 rounded hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
