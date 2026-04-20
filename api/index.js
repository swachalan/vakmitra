import { Readable } from 'node:stream';
import server from '../dist/server/server.js';

export default async function handler(req, res) {
  // 1. Reconstruct the full URL
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = new URL(req.url, `${protocol}://${host}`).toString();

  // 2. Read the Node.js request body if present
  let body = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    body = Buffer.concat(chunks);
  }

  // 3. Convert Node headers to Web Headers
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) value.forEach(v => headers.append(key, v));
      else headers.set(key, value);
    }
  }

  // 4. Create the Web Request object expected by TanStack Start
  const webReq = new Request(url, {
    method: req.method,
    headers,
    body,
  });

  try {
    // 5. Let TanStack Start process the request
    const webRes = await server.fetch(webReq);

    // 6. Write the response back to Vercel's Node.js response
    res.statusCode = webRes.status;
    webRes.headers.forEach((value, key) => {
      // Avoid duplicated set-cookie formats if any, but standard setHeader is fine
      res.setHeader(key, value);
    });

    if (webRes.body) {
      // Pipe the Web Stream back into the Node Stream
      Readable.fromWeb(webRes.body).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Server process error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error: ' + error.message);
  }
}
