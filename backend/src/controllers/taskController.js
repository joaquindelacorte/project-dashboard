import Task from "../models/Task.js";
import Project from "../models/Project.js";

async function assertProjectAccess(projectId, userId) {
  const project = await Project.findOne({
    _id: projectId,
    $or: [{ owner: userId }, { members: userId }],
  });
  return project;
}

export async function listTasks(req, res, next) {
  try {
    const project = await assertProjectAccess(req.params.projectId, req.user._id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    const tasks = await Task.find({ project: project._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const project = await assertProjectAccess(req.params.projectId, req.user._id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    const { title, description, status, priority, assignee, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: "title es requerido" });
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      assignee,
      dueDate,
      project: project._id,
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function findAccessibleTask(taskId, userId) {
  const task = await Task.findById(taskId).populate("project");
  if (!task) return null;
  const project = task.project;
  const hasAccess =
    project.owner.equals(userId) || project.members.some((m) => m.equals(userId));
  return hasAccess ? task : null;
}

export async function updateTask(req, res, next) {
  try {
    const task = await findAccessibleTask(req.params.id, req.user._id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    const { title, description, status, priority, assignee, dueDate } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (assignee !== undefined) task.assignee = assignee;
    if (dueDate !== undefined) task.dueDate = dueDate;
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await findAccessibleTask(req.params.id, req.user._id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    await task.deleteOne();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
