var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
  pageTitle: 'Redirect...',
  template: templates.pages.redirect
});
