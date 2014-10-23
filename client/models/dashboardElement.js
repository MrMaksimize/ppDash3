var AmpState = require("ampersand-state");

module.exports = AmpState.extend({
  modelType: 'dashboardElement',
  namespace: 'baseDashboardElement',
  props: {
    id: ["string"],
    title: ["string"],
    placeholder: ["string"],
    widths: {
      type: "object",
      default: function() { return { sm: "6", md:"4" } }
    }
  },
  derived: {
    widthSmall: {
      deps: ["widths"],
      fn: function () {
        return "col-md-" + this.widths.sm;
      }
    },
    widthMedium: {
      deps: ["widths"],
      fn: function () {
        return "col-md-" + this.widths.md;
      }
    },
    containerId: {
      deps: ["title"],
      fn: function () {
        return this.title.replace(/\s/g, "-").toLowerCase();
      }
    }
    // TODO -- do I need to implement large?
  }
});
