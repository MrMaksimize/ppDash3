var _ = require('lodash');
var DashboardElement = require("./dashboardElement");


module.exports = DashboardElement.extend({
  props: {
    //accountId = '31205267';
    accountId: ['string', false, ''],
    //webpropertyId = 'UA-31205267-1';
    webpropertyId: ['string', false, ''],
    //profileId = "59122748";
    // In core reporting query, this is ID
    profileIds: ['array', true],
    metrics: ['array', true],
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
          "start-date": "2014-10-06",
          "end-date": "2014-10-20",
          "metrics": this.metrics.join(),
          "dimensions": this.dimensions.join()
        }
      }
    }
  },
  fetchData: function() {
    return gapi.client.analytics.data.ga.get(this.query);
  }
});


/*
 * Scratch Space
 */
/*hello.login('google', {
      'redirect_uri': 'http://localhost:3000/redirect',
      'scope': 'https://www.googleapis.com/auth/analytics.readonly,basic,email'
    }).then(function(response) {
      console.log(response);
      // TODO -- move the following two lines to the extension of the dashboardElement model.
      gapi.client.setApiKey("AIzaSyBO9Lz6GstdDB_9eH8yIUQ5Z-_D0XuO83g");
      var token = response.authResponse;
      gapi.auth.setToken(token);
      return gapi.client.load('analytics', 'v3');
    }).then(function() {
      //return gapi.client.analytics.management.accounts.list();
      accountId = '31205267';
      //return gapi.client.analytics.management.webproperties.list({'accountId': accountId})
      webpropertyId = 'UA-31205267-1';
      return gapi.client.analytics.management.profiles.list({
        'accountId': accountId,
        'webPropertyId': webpropertyId
      });
      profileId = "59122748";
      return gapi.client.analytics.data.ga.get({
        'ids': 'ga:' + profileId,
        'start-date': '2014-10-06',
        'end-date': '2014-10-20',
        'metrics': 'ga:sessions',
        'dimensions': 'ga:day'
      });
    }).then(function(results) {
      console.log(results);
    }).then(function() {
      return hello('google').api('me');
    }).then(function(profile) {
      console.log(profile);
      model.set({
        'signedIn': true,
        'firstName': profile.first_name,
        'lastName': profile.last_name,
        'username': profile.email
      });
    });
*/
