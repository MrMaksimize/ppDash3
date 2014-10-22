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
      },
      authResponse: {
        cache: false,
        fn: function() {
          return hello('google').getAuthResponse();
        }
      }
    },

    fetch: function() {
      var model = this;
      var authResponse = model.authResponse;
      if (authResponse) {
        // Wrapper to make Hello work with promises.
        return Promise.resolve(hello('google').api('me')).then(function(profile) {
          model.set({
            'signedIn': true,
            'firstName': profile.first_name,
            'lastName': profile.last_name,
            'username': profile.email
          });
          return Promise.resolve(authResponse);
        });
      }
      else {
        // Otherwise reject the promise.
        return Promise.reject(401);
      }
    },

    authenticate: function() {
      var model = this;
      var authResponse = model.authResponse;
      return hello.login('google', {
        'redirect_uri': config.google.redirect_uri,
        'scope': config.google.scope
      }).then(function() {
        return model.fetch();
      });
    },

});
