import http from "http";
import express from "express";
import { notFoundHtml, devSocket, useCtx, html } from "sosse";

export default async () => {
  const ctx = useCtx();

  const app = express();
  app.use(express.static(ctx.publicDir));
  app.get("/", (req, res) => {
    res.send(
      html({
        body: `<div id="root"></div>` + ctx.assets.index.html,
        ctx,
      })
    );
  });

  // 404 route
  app.use((req, res) => res.status(404).send(notFoundHtml()));

  const port = 8080;
  const server = http.createServer(app);

  await devSocket({ server });

  return () => {
    server.listen(port);

    console.log(`Started http://localhost:${port}`);
    return () =>
      new Promise((res, rej) => server.close((e) => (e ? rej(e) : res())));
  };
};
