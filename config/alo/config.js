module.exports = function() {
  let config = {
    isNode: false,
    isLibrary: true,
    id: "alo",
    useHot: true
  };

  config.useWorkBox = !config.isLibrary;
  config.useHtmlCreation = !config.isLibrary;
  config.useCodeSplitting = !config.isLibrary;

  return config;
};
