const paths = require("../lib/node").paths;
const pkg = require(paths.project("package.json"));

module.exports = {
  title: pkg.name,
  paths: {
    src: "../docs",
    output: "../static/docs",
    public: "../docs/public"
  },
  colors: {
    accent: "#37A"
  },
  toc: [
    { title: "Home", path: "README.md" },
    { path: "introduction.md" },
    { path: "getting_started", children: [{ path: "installation.md" }] },
    { title: "Changelog", path: "CHANGELOG.md" },
    { title: "Repository", href: pkg.repository.url },
    {
      path: "legacy",
      title: "Legacy (v2)",
      children: [
        { title: "Getting Started", path: "README.md" },
        { path: "installation.md" },
        { path: "first_steps.md" },
        { path: "stores.md" },
        { path: "reducers.md" },
        { path: "subscriptions.md" },
        { path: "streams.md" }
      ]
    }
  ]
};
