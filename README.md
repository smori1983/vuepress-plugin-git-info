# vuepress-plugin-git-info

Provides UI components to display git information for each markdown page.


## Dependency

This plugin depends [`vuepress-plugin-git-log`](https://www.npmjs.com/package/vuepress-plugin-git-log) (defined as dependencies in `package.json`).


## Basic configuration

`.vuepress/config.js`

```
module.exports = {
  plugins: [
    ['git-log', {
      formatTime: (timestamp) => {
        return timestamp;
      },
      additionalArgs: '--no-merges',
      onlyFirstAndLastCommit: false,
    }],

    ['git-info', {
      useGlobalUi: <boolean>,
      usePageEmbed: <boolean>,
    }],
  ],
};
```


## Exclude options

### `excludePaths`

Used when exclude target pages by explicitly listing paths.

#### Example

```
module.exports = {
  ...
  plugins: [
    ['git-info', {
      useGlobalUi: true,
      excludePaths: [
        '/cat1/page2.html',
        '/cat2/page1.html',
      ],
    }],
  ],
};
```

### `excludeCallback`

Used when exclude target pages by arbitrary callback.

#### Example

```
module.exports = {
  ...
  plugins: [
    ['git-info', {
      usePageEmbed: true,
      excludeCallback: ($page) => {
        return $page.regularPath.indexOf('/cat3/') === 0;
      },
    }],
  ],
};
```


## Captures

### Global UI type

![](https://cdn.jsdelivr.net/gh/smori1983/vuepress-plugin-git-info@master/doc/capture.global_ui.png)

### Page embed type

![](https://cdn.jsdelivr.net/gh/smori1983/vuepress-plugin-git-info@master/doc/capture.page_embed.png)
