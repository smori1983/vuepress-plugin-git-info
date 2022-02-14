<template>
  <ul class="git-info">
    <li
      class="git-info-updated"
    >last updated: {{ updated }}</li>
    <li
      class="git-info-authors"
    >authors: {{ authors }}</li>
    <li
      class="git-info-hash"
      v-if="hash"
    >{{ hash }}</li>
  </ul>
</template>

<script>
import { sprintf } from 'sprintf-js';

export default {
  props: {
    git: {
      type: Object,
      required: true,
    },
  },

  computed: {
    updated() {
      return this.getDate(this.getUpdated(this.git));
    },
    authors() {
      return this.getAuthors(this.git);
    },
    hash() {
      return this.getHash(this.git);
    },
  },

  methods: {
    /**
     * Note: vuepress-plugin-git-log has bug in extendPageData().
     */
    getUpdated(git) {
      if (Array.isArray(git.commits)) {
        return git.commits[0].commitTime;
      } else {
        return git.updated;
      }
    },

    getDate(dateValue) {
      const date = this.getDateObject(dateValue);

      return sprintf(
        '%d/%02d/%02d %02d:%02d',
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      );
    },

    /**
     * @param {string} dateValue
     * @returns {Date}
     */
    getDateObject(dateValue) {
      if (/^\d+$/.test(dateValue)) {
        return new Date(dateValue * 1000);
      } else {
        return new Date(dateValue);
      }
    },

    getAuthors(git) {
      if (!Array.isArray(git.commits)) {
        return git.author;
      }

      const userCommitMap = git.commits
        .map((commit) => {
          return commit.authorName;
        })
        .reduce((prev, current) => {
          prev[current] = prev[current] || {
            name: current,
            count: 0,
          };
          prev[current].count += 1;

          return prev;
        }, {});

      return Object.values(userCommitMap)
        .sort((a, b) => {
          if (a.count === b.count) {
            return a.name > b.name ? 1 : -1;
          }
          return a.count < b.count ? 1 : -1;
        })
        .map((user) => {
          return sprintf('%s (%d)', user.name, user.count);
        })
        .join(', ');
    },

    getHash(git) {
      if (Array.isArray(git.commits)) {
        return git.commits[0].fullHash;
      } else {
        return null;
      }
    },
  },
};
</script>
