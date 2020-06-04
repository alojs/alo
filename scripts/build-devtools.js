#!/usr/bin/env node

const { spawn, args, buildArgs, rmDir, pkgDir } = require("./lib");

(async () => {
  await rmDir(pkgDir("devtools", "dist"), { recursive: true });
  spawn("npx", [
    "microbundle",
    "--cwd",
    "devtools",
    "--raw",
    ...buildArgs(),
    ...args,
  ]);
})();
