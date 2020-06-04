#!/usr/bin/env node

const { spawn, args, buildArgs, rmDir, pkgDir } = require("./lib");

(async () => {
  await rmDir(pkgDir("selector", "dist"), { recursive: true });
  spawn("npx", [
    "microbundle",
    "--cwd",
    "selector",
    "--raw",
    ...buildArgs(),
    ...args,
  ]);
})();
