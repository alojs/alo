#!/usr/bin/env node

const { paths } = require("../../lib/node");

require("../templates/build")({
  nameSpaceId: "alo",
  useDevServer: true,
  useBundleAnalyzer: true
});
