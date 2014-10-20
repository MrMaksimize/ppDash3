/*global app, me, $*/
var _ = require('lodash');
var logger = require('andlog');
var config = require('clientconfig');

var Router = require('./router');
var tracking = require('./helpers/metrics');
var MainView = require('./views/main');
var Me = require('./models/me');
var People = require('./collections/persons');
var DashboardElements = require('./collections/dashboardElements');
var domReady = require('domready');


module.exports = {
    // this is the the whole app initter
  blastoff: function () {
    var self = window.app = this;

    // create our global 'me' object and an empty collection for our people models.
    window.me = new Me();
    window.hello = hello.init({
      facebook: "757007644390099",
      google: "922164580672-ejv6r4gd9ncqtvi75hconip77qh56bfv.apps.googleusercontent.com"
      //github: "5e06643d73e77e5b7155"
    });
    this.people = new People();

    // TODO - idk if this should be here really.
    this.dashboardElements = new DashboardElements([
      {
        title: 'One',
        placeholder: 'ONE PLACE'
      },
      {
        title: 'Two',
        placeholder: 'Two PLACE'
      },
      {
        title: 'Three',
        placeholder: 'ONE PLACE'
      },
      {
        title: 'Four',
        placeholder: 'ONE PLACE'
      },
      {
        title: 'Five',
        placeholder: 'ONE PLACE'
      },
      {
        title: 'Six',
        placeholder: 'ONE PLACE'
      },
      {
        title: 'Seven',
        placeholder: 'ONE PLACE'
      },
      {
        title: 'Eight',
        placeholder: 'ONE PLACE'
      },
      {
        title: 'Nine',
        placeholder: 'ONE PLACE'
      },
    ]);

    // init our URL handlers and the history tracker
    this.router = new Router();

    // wait for document ready to render our main view
    // this ensures the document has a body, etc.
    domReady(function () {
      // init our main view
      var mainView = self.view = new MainView({
          model: me,
          el: document.body
      });

      // ...and render it
      mainView.render();

      // we have what we need, we can now start our router and show the appropriate page
      self.router.history.start({pushState: true, root: '/'});
    });
  },

  // This is how you navigate around the app.
  // this gets called by a global click handler that handles
  // all the <a> tags in the app.
  // it expects a url without a leading slash.
  // for example: "costello/settings".
  navigate: function (page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page;
    this.router.history.navigate(url, {trigger: true});
  }
};

// run it
module.exports.blastoff();
