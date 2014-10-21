var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    modelType: 'user',
    props: {
        id: ['string'],
        firstName: ['string', true, ''],
        lastName: ['string', true, ''],
        username: ['string'],
    },
    session: {
      signedIn: ["boolean", false, false],
      authInfo: ["object", false]
    },
    derived: {
        fullName: {
            deps: ['firstName', 'lastName'],
            cache: true,
            fn: function () {
                return this.firstName + ' ' + this.lastName;
            }
        },
        initials: {
            deps: ['firstName', 'lastName'],
            cache: true,
            fn: function () {
                return (this.firstName.charAt(0) + this.lastName.charAt(0)).toUpperCase();
            }
        }
    },
    fetch: function() {
      var model = this;
      // Until there is a real persistence layer, fetch acts as fetch and also as checkAuth.
      var authResponse = hello('google').getAuthResponse();
      console.log(authResponse);
      // Check if auth already happened.
      if (authResponse) {
        return hello('google').api('me').then(function(profile) {
          model.set({
            'signedIn': true,
            'firstName': profile.first_name,
            'lastName': profile.last_name,
            'username': profile.email
          });
          return Promise.resolve(authResponse);
        });
      }
      // Otherwise...
      return hello.login('google', {
        'redirect_uri': config.google.redirect_uri,
        'scope': config.google.scope
      }).then(function() {
        return this.fetch();
      });
    },

});
