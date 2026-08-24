import Project from "../models/Project.js";

export async function listProjects(req, res, next) {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    const { name, description, members } = req.body;
    if (!name) return res.status(400).json({ message: "name es requerido" });
    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
      members: members || [],
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

async function findAccessibleProject(id, userId) {
  return Project.findOne({
    _id: id,
    $or: [{ owner: userId }, { members: userId }],
  });
}

export async function getProject(req, res, next) {
  try {
    const project = await findAccessibleProject(req.params.id, req.user._id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await findAccessibleProject(req.params.id, req.user._id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    const { name, description, members } = req.body;
    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (members !== undefined) project.members = members;
    await project.save();
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    await project.deleteOne();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
