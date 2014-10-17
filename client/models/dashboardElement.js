// dashboardElement Model - dashboardElement.js
var AmpModel = require("ampersand-model");


module.exports = AmpModel.extend({
  props: {
    id: ["string"],
    title: ["string"],
    placeholder: ["string"]
  }
});
