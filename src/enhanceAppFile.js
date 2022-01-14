import BlockGlobalUi from './components/BlockGlobalUi';
import BlockPageEmbed from './components/BlockPageEmbed';

export default ({ Vue }) => {
  Vue.component('PluginGitInfoGlobalUi', BlockGlobalUi);
  Vue.component('PluginGitInfoPageEmbed', BlockPageEmbed);
};
