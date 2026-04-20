import { createServer } from "node:http";
import { toNodeListener } from "h3-v2";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// Import the built server handler
import server from "../dist/server/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, "../dist/client");

const port = process.env.PORT || 3000;

// Middleware to serve static files from dist/client
const staticHandler = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = path.join(clientDir, url.pathname);

  // Security: Prevent directory traversal
  if (!filePath.startsWith(clientDir)) {
    return false;
  }

  // If it's a directory, we don't serve it as static here 
  // (TanStack handles routes)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
    return true;
  }
  return false;
};

// Create a standard Node.js HTTP server
const nodeServer = createServer((req, res) => {
  // First try to serve a static file
  if (staticHandler(req, res)) {
    return;
  }

  // If not a static file, let TanStack Start handle the route
  return toNodeListener(server)(req, res);
});

nodeServer.listen(port, () => {
  console.log(`\n🚀 VakMithra Live at http://localhost:${port}`);
  console.log(`   Serving static assets from: ${clientDir}\n`);
});

process.on("SIGTERM", () => {
  console.log("Stopping server...");
  nodeServer.close();
});
