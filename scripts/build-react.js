#!/usr/bin/env node

const { spawn, args, buildArgs } = require("./lib");

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
