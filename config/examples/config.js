module.exports = function() {
  let config = {
    isNode: false,
    isLibrary: false,
    id: "examples",
    useHot: true
  };

  config.useWorkBox = !config.isLibrary;
  config.useHtmlCreation = !config.isLibrary;
  config.useCodeSplitting = !config.isLibrary;

  return config;
};
