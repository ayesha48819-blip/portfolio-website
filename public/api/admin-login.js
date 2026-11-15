import { makeToken, passwordOk, bodyOf } from "./_auth.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.ADMIN_PASSWORD) return res.status(500).json({ error: "ADMIN_PASSWORD is not set on the server." });
  if (!passwordOk(bodyOf(req).password)) {
    await new Promise((r) => setTimeout(r, 700)); // slows down password guessing
    return res.status(401).json({ error: "Wrong password." });
  }
  res.status(200).json({ token: makeToken() });
}