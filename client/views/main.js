/*global app, me, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('lodash');
var domify = require('domify');
var dom = require('ampersand-dom');
var templates = require('../templates');
var tracking = require('../helpers/metrics');
var setFavicon = require('favicon-setter');

module.exports = View.extend({
  template: templates.body,
  initialize: function () {
    // this marks the correct nav item selected
    this.listenTo(app.router, 'page', this.handleNewPage);
  },
  bindings: {
    'model.fullName': "li.name a",
    'model.signedIn': {
      type: 'toggle',
      yes: "li.logout",
      no: "li.login"
    }
  },
  events: {
    'click [data-hook~=action-login]': 'handleLogin',
    'click a[href]': 'handleLinkClick'
  },
  render: function () {
    // some additional stuff we want to add to the document head
    document.head.appendChild(domify(templates.head()));

    // main renderer
    this.renderWithTemplate({ me: me });

    // init and configure our page switcher
    this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
      show: function (newView, oldView) {
        // it's inserted and rendered for me
        document.title = _.result(newView, 'pageTitle') || "PP Dash #";
        document.scrollTop = 0;

        // add a class specifying it's active
        dom.addClass(newView.el, 'active');

        // store an additional reference, just because
        app.currentPage = newView;
      }
    });

    // setting a favicon for fun (note, it's dynamic)
    setFavicon('/images/ampersand.png');
    return this;
  },

  handleLogin: function(e) {
    var model = this.model;
    // TODO -- consier the possibility that hello is not the way to go here.
    hello.login('google', {
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
      /*return gapi.client.analytics.management.profiles.list({
        'accountId': accountId,
        'webPropertyId': webpropertyId
      });*/
      profileId = "59122748";
      /*return gapi.client.analytics.data.ga.get({
        'ids': 'ga:' + profileId,
        'start-date': '2014-10-06',
        'end-date': '2014-10-20',
        'metrics': 'ga:sessions',
        'dimensions': 'ga:day'
      });*/

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
  },

  handleNewPage: function (view) {
      // tell the view switcher to render the new one
      this.pageSwitcher.set(view);

      // mark the correct nav item selected
      this.updateActiveNav();
  },

  handleLinkClick: function (e) {
      var aTag = e.target;
      var local = aTag.host === window.location.host;

      // if it's a plain click (no modifier keys)
      // and it's a local url, navigate internally
      if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
          e.preventDefault();
          app.navigate(aTag.pathname);
      }
  },

  updateActiveNav: function () {
      var path = window.location.pathname.slice(1);

      this.queryAll('.nav a[href]').forEach(function (aTag) {
          var aPath = aTag.pathname.slice(1);

          if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
              dom.addClass(aTag.parentNode, 'active');
          } else {
              dom.removeClass(aTag.parentNode, 'active');
          }
      });
  }
});
