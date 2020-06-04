#!/usr/bin/env node

const { spawn, args, buildArgs, rmDir, pkgDir } = require("./lib");

(async () => {
  await rmDir(pkgDir("redom", "dist"), { recursive: true });
  spawn("npx", [
    "microbundle",
    "--cwd",
    "redom",
    "--raw",
    ...buildArgs(),
    ...args,
  ]);
})();
