module.exports = function({ envIsTest }) {
  let config = {
    isNode: false,
    isLibrary: true,
    id: "react",
    useHot: true,
    devServerPort: 8082
  };

  config.useWorkBox = !config.isLibrary;
  config.useHtmlCreation = !config.isLibrary;
  config.useCodeSplitting = !config.isLibrary;
  config.useStats = !config.isLibrary;

  return config;
};
