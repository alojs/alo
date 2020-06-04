#!/usr/bin/env node

const { spawn, args, buildArgs, rmDir, pkgDir } = require("./lib");

(async () => {
  await rmDir(pkgDir("react", "dist"), { recursive: true });
  spawn("npx", [
    "microbundle",
    "--cwd",
    "react",
    "--raw",
    "--jsx",
    "React.createElement",
    ...buildArgs(),
    ...args,
  ]);
})();
