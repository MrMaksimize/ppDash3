var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
  template: templates.includes.dashboardElement,
  bindings: {
    // Can also use hooks here for binding.
    'model.title': '.chart-title',
    'model.placeholder': '.chart-stage',
    'model.widthSmall': { type: 'class', selector: '.chart-widget-wrapper' },
    'model.widthMedium': { type: 'class', selector: '.chart-widget-wrapper' },
    'model.widthLarge': { type: 'class', selector: '.chart-widget-wrapper' }
  },
  events: {
    'click [data-hook~=action-delete]': 'handleRemoveClick'
  },
  handleRemoveClick: function () {
      this.model.destroy();
      return false;
  }
});
