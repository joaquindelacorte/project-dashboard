const priorityColor = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded shadow-sm p-3 border border-slate-200 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-sm text-slate-800">{task.title}</h4>
        <span className={`text-xs px-2 py-0.5 rounded ${priorityColor[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && <p className="text-xs text-slate-500">{task.description}</p>}
      <div className="flex gap-2 justify-end">
        <button onClick={() => onEdit(task)} className="text-xs text-indigo-600 hover:underline">
          Editar
        </button>
        <button onClick={() => onDelete(task)} className="text-xs text-red-600 hover:underline">
          Eliminar
        </button>
      </div>
    </div>
  );
}
