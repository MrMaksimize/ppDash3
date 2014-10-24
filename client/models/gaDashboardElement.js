var _ = require('lodash');
var DashboardElement = require("./dashboardElement");


module.exports = DashboardElement.extend({
  namespace: 'gaDashboardElement',
  props: {
    //return gapi.client.analytics.management.accounts.list();
    //accountId = '31205267';
    accountId: ['string', false, ''],
    //return gapi.client.analytics.management.webproperties.list({'accountId': accountId})
    //webpropertyId = 'UA-31205267-1';
    webpropertyId: ['string', false, ''],
    //return gapi.client.analytics.management.profiles.list({
    //  'accountId': accountId,
    //  'webPropertyId': webpropertyId
    //});
    //profileId = "59122748";
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
    // load deps like analytics client here.
  },
  fetchData: function() {
    console.log('gadash fetch data');
    console.log(gapi);
    if (gapi.client.analytics)
      return gapi.client.analytics.data.ga.get(this.query);

    return gapi.client.load('analytics', 'v3').then(function() {
      return gapi.client.analytics.data.ga.get(this.query);
    });
  }
});


