import request from "supertest";
process.env.JWT_SECRET = "test-secret";
const { connect, closeDatabase, clearDatabase } = await import("./setup.js");
const { default: app } = await import("../src/app.js");

let token;

beforeAll(async () => connect());
afterEach(async () => clearDatabase());
afterAll(async () => closeDatabase());

async function registerAndLogin(email = "owner@example.com") {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ name: "Owner", email, password: "secret123" });
  return res.body.token;
}

beforeEach(async () => {
  token = await registerAndLogin();
});

describe("Projects", () => {
  it("crea un proyecto y lo lista", async () => {
    const createRes = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Dashboard", description: "Proyecto de prueba" });
    expect(createRes.status).toBe(201);

    const listRes = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${token}`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.length).toBe(1);
    expect(listRes.body[0].name).toBe("Dashboard");
  });

  it("actualiza y elimina un proyecto propio", async () => {
    const createRes = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Temp" });
    const id = createRes.body._id;

    const updateRes = await request(app)
      .put(`/api/projects/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Renombrado" });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.name).toBe("Renombrado");

    const deleteRes = await request(app)
      .delete(`/api/projects/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(deleteRes.status).toBe(204);
  });

  it("rechaza acceso sin token", async () => {
    const res = await request(app).get("/api/projects");
    expect(res.status).toBe(401);
  });
});
