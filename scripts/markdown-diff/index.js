'use strict';
var renderer = require('./renderer');

hexo.extend.renderer.register('md-diff', 'html', renderer, true);