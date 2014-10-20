var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
    modelType: 'user',
    initialize: function(attrs, options) {
      var resp = hello('google').getAuthResponse();
      console.log(resp);
      if (resp) {
        this.accessToken = resp.access_token;
      }
      return this;
    },
    login: function() {
    },
    props: {
      id: ['string'],
      firstName: ['string', true, ''],
      lastName: ['string', true, ''],
      username: ['string'],
    },
    session: {
      signedIn: ["boolean", false, false],
      accessToken: ["string", false, '']
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
    }
});
