module.exports = (md) => {
  md.core.ruler.push('vuepress_plugin_git_info', ((state) => {
    const token = new state.Token('html_block', '', 0);
    token.content = '<PluginGitInfoPageEmbed/>';
    token.block = true;

    state.tokens.push(token);
  }));
};
