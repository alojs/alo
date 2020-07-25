#!/usr/bin/env node

const { spawn } = require("./lib");

spawn("npx", ["ts-node", "example/lib/main.ts"]);
