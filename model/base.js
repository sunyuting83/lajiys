var fn_bookshelf = function() {
  var db_config = require('./db_configs');
  var knex = require('knex')(db_config);

  var Bookshelf = require('bookshelf')(knex);

  return Bookshelf;
}
module.exports = fn_bookshelf;