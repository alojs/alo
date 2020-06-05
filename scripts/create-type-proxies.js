#!/usr/bin/env node

const { writeFile, pkgDir } = require("./lib");

const createProxy = async (
  module,
  exportDefault = false,
  exportNamed = true
) => {
  const mainPath = `./${module}/lib/main`;
  let proxySrc = "";
  if (exportNamed) {
    proxySrc += `export * from "${mainPath}";\n`;
  }

  if (exportDefault) {
    proxySrc += `import DefaultProxy from "${mainPath}";
export default DefaultProxy;\n`;
  }

  await writeFile(pkgDir(module, "dist", "main.d.ts"), proxySrc);
};

(async () => {
  await createProxy("redom");
  await createProxy("preact");
  await createProxy("react");
  await createProxy("store");
})();
