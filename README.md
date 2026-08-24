# Dashboard Full-Stack de Gestión de Proyectos

Aplicación full-stack para gestionar proyectos y tareas estilo Kanban, con autenticación JWT.

## Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt.
- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios.
- **Tests**: Jest + Supertest + mongodb-memory-server (backend), Vitest + React Testing Library (frontend).

## Estructura

```
backend/    API REST (auth, proyectos, tareas)
frontend/   SPA en React con dashboard Kanban
```

## Backend — setup y ejecución

```bash
cd backend
cp .env.example .env   # editar MONGO_URI y JWT_SECRET
npm install
npm run dev             # http://localhost:5000
```

Variables de entorno (`.env`):

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (default 5000) |
| `MONGO_URI` | Connection string de MongoDB |
| `JWT_SECRET` | Secreto para firmar tokens JWT |
| `JWT_EXPIRES_IN` | Expiración del token (ej. `7d`) |

Correr tests:

```bash
npm test
```

## Frontend — setup y ejecución

```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

Opcional: variable `VITE_API_URL` (default `http://localhost:5000/api`) en un `.env` del frontend si el backend corre en otra URL.

Correr tests:

```bash
npm test
```

## Endpoints principales

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id

GET    /api/projects/:projectId/tasks
POST   /api/projects/:projectId/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Modelo de datos

- **User**: `name`, `email`, `password` (hasheada), `role`
- **Project**: `name`, `description`, `owner`, `members[]`
- **Task**: `title`, `description`, `status` (`todo`/`in_progress`/`done`), `priority` (`low`/`medium`/`high`), `project`, `assignee`, `dueDate`
