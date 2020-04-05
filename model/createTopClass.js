var Promise = require('bluebird');
const bookshelf = require('./base')();
const Classify = require('./classify');
var Classifyd = bookshelf.Collection.extend({
  model: Classify
});

var accounts = Classifyd.forge([{
  c_name: '电视剧',
  top_id: 0
}, {
  c_name: '电影',
  top_id: 0
}, {
  c_name: '动漫',
  top_id: 0
}, {
  c_name: '综艺',
  top_id: 0
}]);

async function makeTopClass () {
  await Promise.all(accounts.invokeMap('save')).then(function() {
    console.log('created');
  }).catch(function(e) {
    console.error(e);
    process.exit();
  });
}

module.exports = makeTopClass;
