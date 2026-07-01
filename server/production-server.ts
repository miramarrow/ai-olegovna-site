import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import telegramBriefHandler from "../api/telegram-brief";

const host = process.env.HOST ?? "127.0.0.1";
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const bundledDir = fileURLToPath(new URL(".", import.meta.url));
const staticRoot = resolve(process.env.SBORKAI_STATIC_DIR ?? bundledDir);
const indexPath = join(staticRoot, "index.html");

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const sendPlain = (res: ServerResponse, statusCode: number, body: string) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(body);
};

const getStaticFilePath = (pathname: string) => {
  let decodedPathname: string;

  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const requestedPath = resolve(staticRoot, `.${decodedPathname}`);

  if (requestedPath !== staticRoot && !requestedPath.startsWith(`${staticRoot}${sep}`)) {
    return null;
  }

  return requestedPath;
};

const serveFile = (req: IncomingMessage, res: ServerResponse, filePath: string) => {
  const contentType = contentTypes[extname(filePath)] ?? "application/octet-stream";
  res.statusCode = 200;
  res.setHeader("Content-Type", contentType);

  if (filePath.includes(`${sep}assets${sep}`)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else if (filePath.endsWith(".html")) {
    res.setHeader("Cache-Control", "no-cache");
  }

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(filePath)
    .on("error", () => sendPlain(res, 500, "static_file_error"))
    .pipe(res);
};

const serveStaticOrSpaFallback = (req: IncomingMessage, res: ServerResponse, pathname: string) => {
  const requestedPath = getStaticFilePath(pathname);

  if (!requestedPath) {
    sendPlain(res, 400, "invalid_path");
    return;
  }

  if (existsSync(requestedPath) && statSync(requestedPath).isFile()) {
    serveFile(req, res, requestedPath);
    return;
  }

  if (extname(pathname)) {
    sendPlain(res, 404, "not_found");
    return;
  }

  if (!existsSync(indexPath)) {
    sendPlain(res, 500, "missing_index");
    return;
  }

  serveFile(req, res, indexPath);
};

const handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (url.pathname === "/healthz") {
    sendPlain(res, 200, "ok\n");
    return;
  }

  if (url.pathname === "/api/telegram-brief") {
    await telegramBriefHandler(req, res);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    sendPlain(res, 405, "method_not_allowed");
    return;
  }

  serveStaticOrSpaFallback(req, res, url.pathname);
};

const server = createServer((req, res) => {
  handleRequest(req, res).catch((error) => {
    console.error(error);

    if (!res.headersSent) {
      sendPlain(res, 500, "internal_server_error");
    } else {
      res.end();
    }
  });
});

server.listen(port, host, () => {
  console.log(`Sborkai server listening on http://${host}:${port}`);
  console.log(`Serving static files from ${staticRoot}`);
});
