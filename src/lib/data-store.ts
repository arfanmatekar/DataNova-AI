import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { AppProject, User } from "./auth";

const DATA_DIR = join(process.cwd(), "data");
const USERS_FILE = join(DATA_DIR, "users.json");
const PROJECTS_FILE = join(DATA_DIR, "projects.json");
const SESSIONS_FILE = join(DATA_DIR, "sessions.json");

async function ensureDataFiles() {
  await mkdir(DATA_DIR, { recursive: true });

  for (const file of [USERS_FILE, PROJECTS_FILE, SESSIONS_FILE]) {
    try {
      await readFile(file, "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        await writeFile(file, "[]", "utf8");
      } else {
        throw error;
      }
    }
  }
}

async function readJson<T>(file: string): Promise<T> {
  await ensureDataFiles();
  return JSON.parse(await readFile(file, "utf8")) as T;
}

async function writeJson<T>(file: string, data: T) {
  await ensureDataFiles();
  await writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function getUsers(): Promise<User[]> {
  return readJson<User[]>(USERS_FILE);
}

export async function saveUsers(users: User[]) {
  await writeJson(USERS_FILE, users);
}

export async function getProjects(): Promise<AppProject[]> {
  return readJson<AppProject[]>(PROJECTS_FILE);
}

export async function saveProjects(projects: AppProject[]) {
  await writeJson(PROJECTS_FILE, projects);
}

export async function getSessions(): Promise<Record<string, string[]>> {
  return readJson<Record<string, string[]>>(SESSIONS_FILE);
}

export async function saveSessions(sessions: Record<string, string[]>) {
  await writeJson(SESSIONS_FILE, sessions);
}
