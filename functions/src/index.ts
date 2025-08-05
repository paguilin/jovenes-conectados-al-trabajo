import { onRequest } from "firebase-functions/v2/https";
const { default: next } = require("next");

const app = next({
  dev: false,
  dir: "../",
});

const handler = app.getRequestHandler();

export const nextApp = onRequest(
  { memory: "512MiB", timeoutSeconds: 60 },
  async (req, res) => {
    await app.prepare();
    handler(req, res);
  }
);