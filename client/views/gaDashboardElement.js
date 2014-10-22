var DashboardElementView = require('./dashboardElement');
var templates = require('../templates');


module.exports = DashboardElementView.extend({
  render: function() {
    this.renderWithTemplate(this);
    this.loadData();
    return this;
  },
  loadData: function() {
    this.model.fetchData().then(function(data) {
      console.log(data);
    });
  }
});
