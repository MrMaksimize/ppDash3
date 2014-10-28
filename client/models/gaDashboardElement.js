var _ = require('lodash');
var DashboardElement = require("./dashboardElement");


module.exports = DashboardElement.extend({
  namespace: 'gaDashboardElement',
  props: {
    accountId: ['string', false, ''],
    webpropertyId: ['string', false, ''],
    // In core reporting query, this is ID
    profileIds: ['array', true],
    metrics: ['array', true],
    sort: ['array', true],
    dimensions: ['array', true],
  },
  derived: {
    query: {
      deps: ['profileIds', 'metrics', 'dimensions'],
      fn: function() {
        var ids = _.map(this.profileIds, function(element) {
          return 'ga:' + element;
        }).join();
        return {
          "ids": ids,
          "start-date": "2014-09-07",
          "end-date": "2014-10-20",
          "metrics": this.metrics.join(),
          //"sort": this.sort.join(),
          "dimensions": this.dimensions.join()
        }
      }
    }
  },
  loadDependencies: function() {
    return gapi.client.load('analytics', 'v3')
  },
  fetchData: function() {
    return gapi.client.analytics.data.ga.get(this.query);
  }
});


