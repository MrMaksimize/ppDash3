var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
  template: templates.includes.dashboardElement,
  bindings: {
    // Can also use hooks here for binding.
    'model.title': '.chart-title',
    'model.placeholder': '.chart-stage',
    'model.width': { type: 'attribute', selector: 'li.chart-widget-wrapper', name: "data-w" },
    'model.height': { type: 'attribute', selector: 'li.chart-widget-wrapper', name: "data-h" },
    'model.xPos': { type: 'attribute', selector: 'li.chart-widget-wrapper', name: "data-x" },
    'model.yPos': { type: 'attribute', selector: 'li.chart-widget-wrapper', name: "data-y" },
  },
  events: {
    'click [data-hook~=action-delete]': 'handleRemoveClick'
  },
  handleRemoveClick: function () {
    this.model.destroy();
    return false;
  }
});
