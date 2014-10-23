var DashboardElementView = require('./dashboardElement');
var templates = require('../templates');
var _ = require('lodash');


module.exports = DashboardElementView.extend({
  render: function() {
    var that = this;
    this.renderWithTemplate(this);
    this.model.fetchData().then(function(data) {
      var xCol = new Array("x");
      var sessionsCol = new Array("sessions");
      _.each(data.result.rows, function(element) {
        xCol.push(element[0]);
        sessionsCol.push(element[1]);
      });
      console.log(xCol);
      var chart = c3.generate({
        bindto: '.' + that.model.containerId + ' .chart-stage',
        data: {
          x: 'x',
          xFormat: '%Y%m%d',
          columns: [
            xCol,
            sessionsCol
          ]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: { format: '%Y-%m-%d' }
          }
        }
      });
    });
    return this;
  }
});
