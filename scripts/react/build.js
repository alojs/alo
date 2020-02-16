#!/usr/bin/env node

const { paths } = require("../../lib/node");

require("../templates/build")({
  nameSpaceId: "react",
  useDevServer: true,
  useBundleAnalyzer: true
});
