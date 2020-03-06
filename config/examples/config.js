module.exports = function({ envIsTest }) {
  let config = {
    isNode: false,
    isLibrary: false,
    id: "examples",
    useHot: true,
    devServerPort: 8081
  };

  config.useWorkBox = !config.isLibrary;
  config.useHtmlCreation = !config.isLibrary;
  config.useCodeSplitting = !config.isLibrary;
  config.useStats = !config.isLibrary;

  return config;
};
