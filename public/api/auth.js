// Admin login: the password is checked on the server and a signed token (12 hours) is returned.
import { createHmac, timingSafeEqual } from "node:crypto";

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";
const sign = (data) => createHmac("sha256", secret()).update(data).digest("base64url");
const digest = (s) => createHmac("sha256", "compare").update(String(s)).digest();

export function passwordOk(input) {
  const real = process.env.ADMIN_PASSWORD || "";
  if (!real || typeof input !== "string") return false;
  return timingSafeEqual(digest(input), digest(real));
}

export function makeToken(hours = 12) {
  const body = Buffer.from(JSON.stringify({ exp: Date.now() + hours * 3600 * 1000 })).toString("base64url");
  return body + "." + sign(body);
}

function tokenOk(token) {
  if (!secret() || !token) return false;
  const [body, sig] = String(token).split(".");
  if (!body || !sig) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(body));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString()).exp > Date.now();
  } catch {
    return false;
  }
}

export function isAdmin(req) {
  const h = req.headers.authorization || "";
  return tokenOk(h.startsWith("Bearer ") ? h.slice(7) : "");
}

export function bodyOf(req) {
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body || {};
}