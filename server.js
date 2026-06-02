import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing body
  app.use(express.json());

  // Real, persistent-in-memory contact message system
  const messages = [
    {
      id: 1,
      name: "Hannah Vance",
      email: "hannah@techstart.io",
      subject: "Excited about your MERN Profile",
      message: "Hey! We are looking for a full stack engineer. Your cinematic portfolio was absolutely stunning! Let's arrange a call.",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 2,
      name: "Marcus Aurelius",
      email: "marcus@rome.org",
      subject: "Colloquy on software design",
      message: "The obstacle is the way. Your interactive canvas implementation displays excellent engineering maturity. Splendid work.",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    }
  ];

  // API to fetch messages (for interactive recruiter playground!)
  app.get("/api/messages", (req, res) => {
    res.json(messages);
  });

  // API to submit a contact message
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject: subject || "Invention / Inquiry",
      message,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    console.log("New contact message logged:", newMessage);
    return res.status(200).json({
      success: true,
      message: "Inquiry received with safe backend registration!",
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server running at http://localhost:${PORT}`);
  });
}

startServer();
