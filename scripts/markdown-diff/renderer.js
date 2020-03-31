var def_pugs_lst = [
  'markdown-it-emoji',
  'markdown-it-sub',
  'markdown-it-sup',
  'markdown-it-deflist',
  'markdown-it-abbr',
  'markdown-it-footnote',
  'markdown-it-ins',
  'markdown-it-mark',
  '@neilsustc/markdown-it-katex',
  'markdown-it-toc-and-anchor'
];

function filterPluginDefault(pugs){
  let result = []
  for(var i = 0; i < pugs.length; i++){
    if(!(pugs[i] instanceof Object) || !(pugs[i].plugin instanceof Object)) continue;
    var pug_name = pugs[i].plugin.name;
    if(!pug_name) continue;
    if(pugs[i].plugin.enable == null || pugs[i].plugin.enable == undefined || pugs[i].plugin.enable != true)
      pugs[i].plugin.enable = false;
    if (!def_pugs_lst.includes(pug_name)) {
      result.push(pugs[i].plugin)
    }
  }
  return result
}

module.exports = function(data, options) {
  var config = this.config.markdown_it_plus;
  if(!(config instanceof Object)) {
    config = {};
  }

  var md = require('markdown-it')();
  var plugins = filterPluginDefault(config.plugins);
  md = plugins.reduce(function (md, pugs) {
      if(pugs.enable) {
        let plugin = require(pugs.name);
        if(typeof plugin !== 'function' && typeof plugin.default === 'function')
          plugin = plugin.default;
        if(pugs.options) return md.use(plugin, pugs.options);
        else return md.use(plugin);
      }
      else return md;
  }, md);
  return md.render(data.text)
}