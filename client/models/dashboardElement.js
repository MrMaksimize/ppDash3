var AmpState = require("ampersand-state");

module.exports = AmpState.extend({
  modelType: 'dashboardElement',
  namespace: 'baseDashboardElement',
  props: {
    id: ["string"],
    title: ["string"],
    placeholder: ["string"],
    width: ["number", false, 1],
    height: ["number", false, 1],
    xPos: ["number", false],
    yPos: ["number", false],
  },
  derived: {
    containerId: {
      deps: ["title"],
      fn: function () {
        return this.title.replace(/\s/g, "-").toLowerCase();
      }
    }
  }
});
