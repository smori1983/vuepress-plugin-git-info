/**
 * @typedef {import('@vuepress/core/lib/node/Page')} Page
 */

const path = require('path');

module.exports = (options) => {
  const {
    useGlobalUi = false,
    usePageEmbed = false,
    excludePaths = [],
    excludeCallback = () => { return false; },
  } = options;

  /**
   * @param {Page} $page
   * @returns {boolean}
   *
   * At this timing, permalink is not set to $page.path.
   */
  const disabledByOption = ($page) => {
    if (Array.isArray(excludePaths) && excludePaths.includes($page.regularPath)) {
      return true;
    }

    if (typeof excludeCallback === 'function' && excludeCallback($page)) {
      return true;
    }
  };

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

    extendPageData($page) {
      if (disabledByOption($page)) {
        $page.plugin_git_info = {
          disabled: true,
        };
      }
    },
  };
};
