var Promise = require('bluebird');
const bookshelf = require('./base')();
const Classify = require('./classify');
var Classifyd = bookshelf.Collection.extend({
  model: Classify
});

var accounts = Classifyd.forge([{
  c_name: '国产剧',
  top_id: 1
}, {
  c_name: '香港剧',
  top_id: 1
}, {
  c_name: '台湾剧',
  top_id: 1
}, {
  c_name: '欧美剧',
  top_id: 1
}, {
  c_name: '韩国剧',
  top_id: 1
}, {
  c_name: '日本剧',
  top_id: 1
}, {
  c_name: '海外剧',
  top_id: 1
}, {
  c_name: '动作',
  top_id: 2
}, {
  c_name: '喜剧',
  top_id: 2
}, {
  c_name: '爱情',
  top_id: 2
}, {
  c_name: '科幻',
  top_id: 2
}, {
  c_name: '恐怖',
  top_id: 2
}, {
  c_name: '战争',
  top_id: 2
}, {
  c_name: '剧情',
  top_id: 2
}, {
  c_name: '伦理',
  top_id: 2
}, {
  c_name: '微电影',
  top_id: 2
}, {
  c_name: '纪录片',
  top_id: 2
}, {
  c_name: '福利',
  top_id: 2
}, {
  c_name: '内地综艺',
  top_id: 4
}, {
  c_name: '港台综艺',
  top_id: 4
}, {
  c_name: '日韩综艺',
  top_id: 4
}, {
  c_name: '欧美综艺',
  top_id: 4
}, {
  c_name: '国产动漫',
  top_id: 3
}, {
  c_name: '日韩动漫',
  top_id: 3
}, {
  c_name: '欧美动漫',
  top_id: 3
}, {
  c_name: '港台动漫',
  top_id: 3
}, {
  c_name: '海外动漫',
  top_id: 3
}]);

async function makeClass () {
  await Promise.all(accounts.invokeMap('save')).then(function() {
    console.log('created');
  }).catch(function(e) {
    console.error(e);
  });
}

module.exports = makeClass;