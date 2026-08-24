import TaskCard from "./TaskCard.jsx";

const columnTitles = {
  todo: "Por hacer",
  in_progress: "En progreso",
  done: "Terminado",
};

export default function TaskColumn({ status, tasks, onEdit, onDelete }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 flex-1 min-w-[250px] flex flex-col gap-3">
      <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">
        {columnTitles[status]} ({tasks.length})
      </h3>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {tasks.length === 0 && (
          <p className="text-xs text-slate-400 italic">Sin tareas</p>
        )}
      </div>
    </div>
  );
}
