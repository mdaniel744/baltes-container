// Minimal GitHub deploy-hook listener: verifies the HMAC signature, confirms the
// push targeted main, then shells out to deploy.sh. No third-party deps.
const http = require("node:http");
const crypto = require("node:crypto");
const { spawn } = require("node:child_process");
const path = require("node:path");

const PORT = process.env.WEBHOOK_PORT || 9016;
const SECRET = process.env.WEBHOOK_SECRET;
const DEPLOY_PATH = process.env.DEPLOY_PATH || __dirname;

if (!SECRET) {
  console.error("WEBHOOK_SECRET is not set. Refusing to start.");
  process.exit(1);
}

function verifySignature(payload, signatureHeader) {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) return false;
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
  const provided = signatureHeader.slice("sha256=".length);
  const expectedBuf = Buffer.from(expected, "utf8");
  const providedBuf = Buffer.from(provided, "utf8");
  if (expectedBuf.length !== providedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, providedBuf);
}

function runDeploy() {
  const deploy = spawn("bash", [path.join(DEPLOY_PATH, "deploy", "deploy.sh")], {
    cwd: DEPLOY_PATH,
    env: process.env,
  });
  deploy.stdout.on("data", (d) => process.stdout.write(`[deploy] ${d}`));
  deploy.stderr.on("data", (d) => process.stderr.write(`[deploy] ${d}`));
  deploy.on("close", (code) => {
    console.log(`[deploy] finished with exit code ${code}`);
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/deploy-hook") {
    res.writeHead(404).end("Not found");
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const signature = req.headers["x-hub-signature-256"];
    if (!verifySignature(body, signature)) {
      console.warn("Rejected webhook: bad signature");
      res.writeHead(401).end("Invalid signature");
      return;
    }

    let payload;
    try {
      payload = JSON.parse(body);
    } catch {
      res.writeHead(400).end("Invalid JSON");
      return;
    }

    if (payload.ref !== "refs/heads/main") {
      res.writeHead(200).end("Ignored (not main)");
      return;
    }

    console.log(`Deploy hook accepted for ${payload.after} by ${payload.pusher?.name || "unknown"}`);
    res.writeHead(202).end("Deploy triggered");
    runDeploy();
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`baltescontainer webhook listener on 127.0.0.1:${PORT}`);
});
