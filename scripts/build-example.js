#!/usr/bin/env node

const { spawn, args, buildArgs, rmDir, pkgDir } = require("./lib");

(async () => {
  await rmDir(pkgDir("example", "dist"), { recursive: true });
  spawn("npx", [
    "microbundle",
    "--target",
    "node",
    "--format",
    "cjs",
    "--cwd",
    "example",
    ...buildArgs(),
    ...args,
  ]);
})();
