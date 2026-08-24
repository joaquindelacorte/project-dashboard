import request from "supertest";
import { jest } from "@jest/globals";
process.env.JWT_SECRET = "test-secret";
const { connect, closeDatabase, clearDatabase } = await import("./setup.js");
const { default: app } = await import("../src/app.js");

beforeAll(async () => connect());
afterEach(async () => clearDatabase());
afterAll(async () => closeDatabase());

describe("Auth", () => {
  it("registra un nuevo usuario y devuelve token", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Joaco",
      email: "joaco@example.com",
      password: "secret123",
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("joaco@example.com");
    expect(res.body.user.password).toBeUndefined();
  });

  it("no permite registrar el mismo email dos veces", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ name: "Joaco", email: "dup@example.com", password: "secret123" });
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Joaco2", email: "dup@example.com", password: "secret123" });
    expect(res.status).toBe(409);
  });

  it("loguea con credenciales correctas", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ name: "Joaco", email: "login@example.com", password: "secret123" });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@example.com", password: "secret123" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("rechaza login con password incorrecta", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ name: "Joaco", email: "bad@example.com", password: "secret123" });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "bad@example.com", password: "wrongpass" });
    expect(res.status).toBe(401);
  });
});
