module.exports = {
  title: 'GlobalUi demo',

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
      excludePaths: [
        '/cat1/page2.html',
        '/cat2/page1.html',
      ],
      excludeCallback: ($page) => {
        return $page.regularPath.indexOf('/cat3/') === 0;
      },
    }],
  ],
};
