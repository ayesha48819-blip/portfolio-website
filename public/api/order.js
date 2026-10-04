// POST   /api/orders              customer places an order (public)
// GET    /api/orders              admin: list orders (needs login token)
// PATCH  /api/orders?code=NC-XXXX admin: change order status
import { orders } from "./_db.js";
import { isAdmin, bodyOf } from "./_auth.js";

const FREE_DELIVERY = 4000; // keep the same as store.html
const DELIVERY_FEE = 250;
const STATUSES = ["new", "confirmed", "shipped", "delivered", "cancelled"];
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const newCode = () =>
  "NC-" + Array.from({ length: 6 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");
const clean = (v, max) => String(v ?? "").trim().slice(0, max);

function normalizePhone(raw) {
  let p = String(raw || "").replace(/[\s-]/g, "");
  if (p.startsWith("+92")) p = "0" + p.slice(3);
  else if (p.startsWith("92")) p = "0" + p.slice(2);
  return /^03\d{9}$/.test(p) ? p : null;
}

function validate(b) {
  const c = b.customer || {};
  const name = clean(c.name, 80), city = clean(c.city, 60), address = clean(c.address, 300), notes = clean(c.notes, 300);
  const phone = normalizePhone(c.phone);
  if (name.length < 3) return { error: "Please enter your full name." };
  if (!phone) return { error: "Enter a valid mobile number, like 0300 1234567." };
  if (city.length < 2) return { error: "Please enter your city." };
  if (address.length < 10) return { error: "Please enter your full address." };
  if (!Array.isArray(b.lines) || b.lines.length < 1 || b.lines.length > 50) return { error: "Your cart is empty." };

  const lines = [];
  for (const l of b.lines) {
    const qty = Number(l?.qty), price = Number(l?.price), lname = clean(l?.name, 120);
    if (!lname || !Number.isInteger(qty) || qty < 1 || qty > 99 || !Number.isFinite(price) || price < 0 || price > 1000000)
      return { error: "Invalid item in cart." };
    lines.push({ name: lname, qty, price });
  }
  // totals are calculated here again, we do not trust the browser's numbers
  // (a real shop would also look prices up in its own product list)
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const delivery = subtotal >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
  return { order: { customer: { name, phone, city, address, notes }, lines, subtotal, delivery, total: subtotal + delivery } };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    if (req.method === "POST") {
      const body = bodyOf(req);
      const { order, error } = validate(body);
      if (error) return res.status(400).json({ error });
      const col = await orders();
      let code = /^NC-[A-HJ-NP-Z2-9]{6}$/.test(String(body.code || "")) ? body.code : newCode();
      for (let i = 0; i < 5; i++) {
        try {
          await col.insertOne({ code, status: "new", createdAt: new Date(), ...order });
          return res.status(201).json({ code });
        } catch (err) {
          if (err?.code !== 11000) throw err;
          code = newCode(); // code already used, try another one
        }
      }
      return res.status(500).json({ error: "Could not create an order code." });
    }

    if (req.method === "GET" || req.method === "PATCH") {
      if (!isAdmin(req)) return res.status(401).json({ error: "Please log in." });
      const col = await orders();

      if (req.method === "GET") {
        const list = await col.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(300).toArray();
        return res.status(200).json({ orders: list });
      }

      const code = String(req.query?.code || "");
      const status = bodyOf(req).status;
      if (!STATUSES.includes(status)) return res.status(400).json({ error: "Invalid status." });
      const r = await col.updateOne({ code }, { $set: { status, updatedAt: new Date() } });
      if (!r.matchedCount) return res.status(404).json({ error: "Order not found." });
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Check MONGODB_URI and the Vercel logs." });
  }
}