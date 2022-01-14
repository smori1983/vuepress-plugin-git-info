<template>
  <div
    class="plugin-git-info"
    v-if="git"
  >
    <div class="plugin-git-info-content">
      <div class="label">Git info of this page</div>
      <git-info v-bind:git="git"></git-info>
    </div>
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
/**
 * See: @vuepress/theme-default/styles/index.styl
 */
@require '../styles/wrapper.styl'

/**
 * See: @vuepress/theme-default/styles/mobile.styl
 */
$mobileSidebarWidth = $sidebarWidth * 0.82

.plugin-git-info
  padding-left $sidebarWidth

  .plugin-git-info-content
    @extend $wrapper

    .label
      font-weight bold

@media (max-width: $MQNarrow)
  .plugin-git-info
    padding-left $mobileSidebarWidth

@media (max-width: $MQMobile)
  .plugin-git-info
    padding-left 0
</style>
