var Collection = require('ampersand-rest-collection');
var Person = require('../models/person');


module.exports = Collection.extend({
    model: Person,
    url: '/api/people'
});
