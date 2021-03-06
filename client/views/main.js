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
var DashboardElements = require('../collections/dashboardElements');
var DashboardElement = require('../models/dashboardElement');
var GADashboardElement = require('../models/gaDashboardElement');

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
    this.loadBaseData();
    return this;
  },

  loadBaseData: function() {
    var testDashboardElement = new DashboardElement({
      title: 'One',
      placeholder: 'One Placeholder.'
    });

    var testDashboardElement2 = new DashboardElement({
      title: 'Two',
      placeholder: 'Two Placeholder.'
    });

    var testDashboardElement3 = new DashboardElement({
      title: 'three',
      placeholder: 'three Placeholder.'
    });

    var testDashboardElement4 = new DashboardElement({
      title: 'Four',
      placeholder: 'Four Placeholder.'
    });




    var testGADashboardElement = new GADashboardElement({
      title: 'Ga Dashboard Element',
      profileIds: ['59122748'],
      metrics: ['ga:sessions'],
      //sort: ['ga:day'],
      dimensions: ['ga:date']
    });

    // Fetch the me object.
    me.fetch().then(function(authResponse) {
      // Should this part be done as part of the model extension for gadashboardelement?
      // Set api key for all calls to Google.
      gapi.client.setApiKey(config.google.apiKey);
      gapi.auth.setToken(authResponse);
      //return gapi.client.load('analytics', 'v3');
      // This is a potential problem point because it's async.
      return gapi.client.load('analytics', 'v3');
    }).then(function() {
      console.log('add');
      app.dashboardElements.add(testDashboardElement);
      app.dashboardElements.add(testDashboardElement2);
      app.dashboardElements.add(testDashboardElement3);
      setTimeout(function(){
        console.log('add one more');
        app.dashboardElements.add(testDashboardElement4);
      }, 5000);
      //app.dashboardElements.add(testGADashboardElement);
    }).catch(function(err) {
      console.log(err);
    });
  },

  //TODO - review this.
  handleLogin: function(e) {
    // Fetch the me object.
    me.authenticate().then(function(authResponse) {
      // Set api key for all calls to Google.
      gapi.client.setApiKey(config.google.apiKey);
      gapi.auth.setToken(authResponse);
      //return gapi.client.load('analytics', 'v3');
      // This is a potential problem point because it's async.
      //gapi.client.load('analytics', 'v3');
    }).catch(function(err) {
      console.log(err);
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
