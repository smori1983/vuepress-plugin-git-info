<template>
  <div
    class="plugin-git-info"
    v-if="git"
  >
    <div class="title">Git info of this page</div>
    <git-info v-bind:git="git"></git-info>
  </div>
</template>

<script>
import preparationMixin from './mixin/preparation';
import GitInfo from './GitInfo';

export default {
  mixins: [
    preparationMixin,
  ],

  components: {
    GitInfo,
  },

  data() {
    return {
      git: null,
    };
  },

  mounted() {
    this.git = this.prepareGit();
  },

  watch: {
    $page() {
      this.git = this.prepareGit();
    },
  },
};
</script>

<style lang="stylus" scoped>
.plugin-git-info {
  max-width: $contentWidth
  padding-left: $sidebarWidth
  margin: 0 auto

  .title {
    font-weight: bold
  }
}
</style>
