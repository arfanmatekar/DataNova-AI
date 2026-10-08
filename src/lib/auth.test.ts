import assert from "node:assert/strict";
import test from "node:test";
import { createProject, createUser, getUserByEmail, loginUser, type AppProject } from "./auth.ts";

const email = `user-${Date.now()}@example.com`;

test("creates and authenticates a user with a hashed password", async () => {
  const user = await createUser({ name: "Aisha", email, password: "StrongPass123!" });
  const found = await getUserByEmail(email);
  const session = await loginUser(email, "StrongPass123!");

  assert.equal(user.email, email);
  assert.ok(found);
  assert.notEqual(found?.passwordHash, "StrongPass123!");
  assert.equal(session.user.email, email);
});

test("prevents duplicate accounts and creates an owned project", async () => {
  await assert.rejects(() => createUser({ name: "Aisha", email, password: "OtherPass123!" }));

  const project = await createProject(email, {
    name: "Customer Churn Analysis",
    description: "Predict customer churn using historical data.",
    status: "Planning",
  });

  assert.equal(project.ownerEmail, email);
  assert.equal(project.name, "Customer Churn Analysis");
});

test("rejects invalid credentials", async () => {
  await assert.rejects(() => loginUser(email, "WrongPass123!"), /Invalid email or password/);
});

test("returns a typed project list for a user", async () => {
  const projects = await getUserProjects(email);
  assert.ok(projects.some((project: AppProject) => project.name === "Customer Churn Analysis"));
});

async function getUserProjects(email: string): Promise<AppProject[]> {
  const { getUserProjects } = await import("./auth.ts");
  return getUserProjects(email);
}
