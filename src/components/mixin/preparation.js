export default {
  methods: {
    prepareGit() {
      if (this.$page.frontmatter.home) {
        return null;
      }

      if (this.$page.plugin_git_info) {
        if (this.$page.plugin_git_info.disabled) {
          return null;
        }
      }

      if (this.$page.git) {
        return this.$page.git.author ? this.$page.git : null;
      }

      return null;
    },
  },
};
