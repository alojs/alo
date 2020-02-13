module.exports = function({ envIsTest }) {
  let config = {
    isNode: false,
    isLibrary: true,
    id: "alo",
    useHot: true,
    devServerPort: 8080
  };

  config.useWorkBox = !config.isLibrary;
  config.useHtmlCreation = !config.isLibrary;
  config.useCodeSplitting = !config.isLibrary;

  return config;
};
