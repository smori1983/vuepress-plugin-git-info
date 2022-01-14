const path = require('path');

module.exports = (options) => {
  const {
    useGlobalUi = false,
    usePageEmbed = false,
  } = options;

  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    chainMarkdown(config) {
      if (usePageEmbed) {
        config
          .plugin('vuepress-plugin-git-info')
          .use(require('./markdown-it-plugin'));
      }
    },

    globalUIComponents: useGlobalUi ? [
      'PluginGitInfoGlobalUi',
    ] : [],
  };
};
