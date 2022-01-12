module.exports = {
  title: 'Hello VuePress',

  themeConfig: {
    sidebar: [
      { collapsable: false, title: 'cat1', children: ['/cat1/page1', '/cat1/page2', '/cat1/page3'] },
      { collapsable: false, title: 'cat2', children: ['/cat2/page1', '/cat2/page2', '/cat2/page3'] },
      { collapsable: false, title: 'cat3', children: ['/cat3/page1'] },
    ]
  },

  plugins: [
    ['git-log', {
      formatTime: (timestamp) => {
        return timestamp;
      },
      additionalArgs: '--no-merges',
      onlyFirstAndLastCommit: false,
    }],

    [require('../../src'), {
      useGlobalUi: true,
      usePageBlock: true,
    }],
  ],
};
