import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { getProjects, getUsers, saveProjects, saveUsers } from "./data-store";
import { createSessionCookieValue, getSessionCookieName, readSessionCookie } from "./session";

const scrypt = promisify(scryptCallback);

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  role: "user" | "admin";
};

export type AppProject = {
  id: string;
  ownerEmail: string;
  name: string;
  description: string;
  status: "Planning" | "Active" | "Completed";
  createdAt: string;
  updatedAt: string;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export type AuthSession = {
  user: SessionUser;
  token: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

function validatePassword(password: string) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    throw new Error("Password must include uppercase, lowercase, and numeric characters.");
  }
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  const [salt, hash] = passwordHash.split(":");
  if (!salt || !hash) {
    return false;
  }

  const derivedKey = await scrypt(password, salt, 64) as Buffer;
  return derivedKey.toString("hex") === hash;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  if (!name || !email) {
    throw new Error("Name and email are required.");
  }

  validatePassword(input.password);

  if (await getUserByEmail(email)) {
    throw new Error("An account with this email already exists.");
  }

  const users = await getUsers();
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
    role: "user",
  };

  users.push(user);
  await saveUsers(users);

  return user;
}

export async function loginUser(email: string, password: string): Promise<AuthSession> {
  const user = await getUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new Error("Invalid email or password.");
  }

  const token = randomBytes(32).toString("hex");
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}

export async function setSessionCookie(user: SessionUser): Promise<ReturnType<typeof NextResponse.json<{ user: SessionUser }>>> {
  const { NextResponse } = await import("next/server");
  const response = NextResponse.json({ user }, { status: 200 });
  const value = await createSessionCookieValue({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  });

  response.cookies.set(getSessionCookieName(), value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

async function getCookieStore(request?: { cookies: { get(name: string): { value?: string } | undefined } }) {
  if (request?.cookies) {
    return request.cookies;
  }

  const { cookies } = await import("next/headers");
  return cookies();
}

export async function getSessionUser(request?: { cookies: { get(name: string): { value?: string } | undefined } }): Promise<SessionUser | null> {
  const cookieStore = await getCookieStore(request);
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = await readSessionCookie(token);
  if (!session) {
    return null;
  }

  const users = await getUsers();
  const user = users.find((item) => item.id === session.id);
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function clearSessionCookie(): Promise<ReturnType<typeof NextResponse.json<{ success: boolean }>>> {
  const { NextResponse } = await import("next/server");
  const response = NextResponse.json({ success: true });
  response.cookies.set(getSessionCookieName(), "", { path: "/", maxAge: 0 });
  return response;
}

export async function getUserProjects(email: string): Promise<AppProject[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.ownerEmail.toLowerCase() === email.toLowerCase());
}

export async function createProject(
  ownerEmail: string,
  draft: Pick<AppProject, "name" | "description" | "status">,
): Promise<AppProject> {
  const owner = await getUserByEmail(ownerEmail);
  if (!owner) {
    throw new Error("User not found.");
  }

  const project: AppProject = {
    id: crypto.randomUUID(),
    ownerEmail: owner.email,
    name: draft.name.trim(),
    description: draft.description.trim(),
    status: draft.status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const projects = await getProjects();
  projects.push(project);
  await saveProjects(projects);

  return project;
}

export async function deleteProject(ownerEmail: string, projectId: string): Promise<void> {
  const projects = await getProjects();
  const index = projects.findIndex(
    (project) => project.id === projectId && project.ownerEmail.toLowerCase() === ownerEmail.toLowerCase(),
  );

  if (index < 0) {
    throw new Error("Project not found.");
  }

  projects.splice(index, 1);
  await saveProjects(projects);
}
