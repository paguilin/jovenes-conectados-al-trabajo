import next from "next";
import { onRequest } from "firebase-functions/v2/https";

const app = next({ dev: false });
const handle = app.getRequestHandler();

exports.nextServer = onRequest({ cors: true }, async (req, res) => {
  try {
    await app.prepare();
    console.log("🔁 SSR function received a request:", req.url);
    handle(req, res);
  } catch (err) {
    console.error("🔥 Error dentro de nextServer:", err);
    res.status(500).send("Error interno en SSR");
  }
});