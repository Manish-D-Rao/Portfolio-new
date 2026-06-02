import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
import Message from "./src/models/messages.js";
import cors from "cors";

dotenv.config({ quiet: true });

connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT;

  // Middleware for parsing body
  app.use(express.json());
  app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

  // API to fetch messages (for interactive recruiter playground!)
  app.get("/api/messages", async (_, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json(messages);
  });

  // API to submit a contact message
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required." });
    }
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message Sent Successfully! Thank You.😊",
      data: newMessage,
    });
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Express custom server running at http://localhost:${PORT}`);
  });
}

startServer();
