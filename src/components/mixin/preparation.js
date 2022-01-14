export default {
  methods: {
    prepareGit() {
      if (this.$page.frontmatter.home) {
        return null;
      }

      if (this.$page.git) {
        return this.$page.git.author ? this.$page.git : null;
      }

      return null;
    },
  },
};
