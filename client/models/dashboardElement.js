var AmpModel = require("ampersand-state");


module.exports = AmpModel.extend({
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
    }
    // TODO -- do I need to implement large?
  }
});
