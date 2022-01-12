const path = require('path');

module.exports = (options) => {
  const {
    useGlobalUi = false,
    usePageBlock = false,
  } = options;

  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    chainMarkdown(config) {
      if (usePageBlock) {
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
