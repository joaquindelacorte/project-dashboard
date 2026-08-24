import request from "supertest";
process.env.JWT_SECRET = "test-secret";
const { connect, closeDatabase, clearDatabase } = await import("./setup.js");
const { default: app } = await import("../src/app.js");

let token;
let projectId;

beforeAll(async () => connect());
afterEach(async () => clearDatabase());
afterAll(async () => closeDatabase());

beforeEach(async () => {
  const authRes = await request(app)
    .post("/api/auth/register")
    .send({ name: "Owner", email: "tasks@example.com", password: "secret123" });
  token = authRes.body.token;

  const projectRes = await request(app)
    .post("/api/projects")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Proyecto con tareas" });
  projectId = projectRes.body._id;
});

describe("Tasks", () => {
  it("crea, lista y actualiza una tarea dentro de un proyecto", async () => {
    const createRes = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Diseñar modelo", priority: "high" });
    expect(createRes.status).toBe(201);
    expect(createRes.body.status).toBe("todo");

    const listRes = await request(app)
      .get(`/api/projects/${projectId}/tasks`)
      .set("Authorization", `Bearer ${token}`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.length).toBe(1);

    const taskId = createRes.body._id;
    const updateRes = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "in_progress" });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.status).toBe("in_progress");
  });

  it("rechaza crear tarea sin token", async () => {
    const res = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .send({ title: "Sin auth" });
    expect(res.status).toBe(401);
  });
});
