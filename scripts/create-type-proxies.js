#!/usr/bin/env node

const { writeFile, pkgDir } = require("./lib");

const createProxy = async (module) => {
  await writeFile(
    pkgDir(module, "dist", "main.d.ts"),
    `export * from "./${module}/lib/main"`
  );
};

(async () => {
  await createProxy("redom");
  await createProxy("preact");
  await createProxy("react");
  await createProxy("store");
})();
