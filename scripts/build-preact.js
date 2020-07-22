#!/usr/bin/env node

const { spawn, args, buildArgs, rmDir, pkgDir } = require("./lib");

(async () => {
  await rmDir(pkgDir("preact", "dist"), { recursive: true });
  spawn("npx", [
    "microbundle",
    "--cwd",
    "preact",
    "--alias",
    "react=preact/compat",
    "--jsx",
    "React.createElement",
    "--raw",
    ...buildArgs(),
    ...args,
  ]);
})();
