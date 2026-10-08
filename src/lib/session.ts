const SESSION_COOKIE = "dataNovaSession";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "local-development-only-change-me";

function bytesFromBase64(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Uint8Array.from(atob(normalized + padding), (char) => char.charCodeAt(0));
}

function base64UrlEncode(value: Uint8Array) {
  let binary = "";
  value.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function signPayload(payload: string) {
  const secretBytes = new TextEncoder().encode(SESSION_SECRET);
  const key = await crypto.subtle.importKey("raw", secretBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return base64UrlEncode(new Uint8Array(signature));
}

async function verifySignature(payload: string, signature: string) {
  const secretBytes = new TextEncoder().encode(SESSION_SECRET);
  const key = await crypto.subtle.importKey("raw", secretBytes, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const expected = bytesFromBase64(signature);
  return crypto.subtle.verify("HMAC", key, expected, new TextEncoder().encode(payload));
}

export type SessionPayload = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  exp: number;
};

export function parseSessionCookieValue(cookieValue: string | undefined): SessionPayload | null {
  if (!cookieValue) {
    return null;
  }

  try {
    const [payload, signature] = cookieValue.split(".");
    if (!payload || !signature) {
      return null;
    }

    const decoded = JSON.parse(atob(payload)) as SessionPayload;
    if (!decoded || typeof decoded.id !== "string" || typeof decoded.email !== "string" || decoded.exp <= Date.now() / 1000) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export async function readSessionCookie(cookieValue: string | undefined): Promise<SessionPayload | null> {
  if (!cookieValue) {
    return null;
  }

  try {
    const [payload, signature] = cookieValue.split(".");
    if (!payload || !signature) {
      return null;
    }

    if (!(await verifySignature(payload, signature))) {
      return null;
    }

    const decoded = JSON.parse(atob(payload)) as SessionPayload;
    if (!decoded || typeof decoded.id !== "string" || typeof decoded.email !== "string" || decoded.exp <= Date.now() / 1000) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export async function createSessionCookieValue(payload: SessionPayload) {
  const serialized = btoa(JSON.stringify(payload));
  const signature = await signPayload(serialized);
  return `${serialized}.${signature}`;
}

export function clearSessionCookieValue() {
  return "";
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}
