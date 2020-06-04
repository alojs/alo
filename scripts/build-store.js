#!/usr/bin/env node

const { spawn, args, buildArgs, rmDir, pkgDir } = require("./lib");

(async () => {
  await rmDir(pkgDir("store", "dist"), { recursive: true });
  spawn("npx", [
    "microbundle",
    "--cwd",
    "store",
    "--raw",
    ...buildArgs(),
    ...args,
  ]);
})();
