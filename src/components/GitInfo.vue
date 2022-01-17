<template>
  <ul class="git-info">
    <li
      class="git-info-created"
    >created: {{ created }}</li>
    <li
      class="git-info-updated"
      v-if="isUpdated"
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
    created() {
      return this.getDate(this.getCreated(this.git));
    },
    updated() {
      return this.getDate(this.getUpdated(this.git));
    },
    isUpdated() {
      return this.created !== this.updated;
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
    getCreated(git) {
      if (Array.isArray(git.commits)) {
        return git.commits[git.commits.length - 1].authorTime;
      } else {
        return git.created;
      }
    },

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
      if (!Array.isArray(git.contributors)) {
        return git.author;
      }

      return git.contributors.sort().join(', ');
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
