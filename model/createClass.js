var Promise = require('bluebird');
const bookshelf = require('./base')();
const Classify = require('./classify');
var Classifyd = bookshelf.Collection.extend({
  model: Classify
});

var accounts = Classifyd.forge([{
  c_name: '国产剧',
  top_id: 1,
  other: 'cicon-i5'
}, {
  c_name: '香港剧',
  top_id: 1,
  other: 'cicon-i6'
}, {
  c_name: '台湾剧',
  top_id: 1,
  other: 'cicon-i7'
}, {
  c_name: '欧美剧',
  top_id: 1,
  other: 'cicon-i8'
}, {
  c_name: '韩国剧',
  top_id: 1,
  other: 'cicon-i9'
}, {
  c_name: '日本剧',
  top_id: 1,
  other: 'cicon-i10'
}, {
  c_name: '海外剧',
  top_id: 1,
  other: 'cicon-i11'
}, {
  c_name: '动作',
  top_id: 2,
  other: 'cicon-i12'
}, {
  c_name: '喜剧',
  top_id: 2,
  other: 'cicon-i13'
}, {
  c_name: '爱情',
  top_id: 2,
  other: 'cicon-i14'
}, {
  c_name: '科幻',
  top_id: 2,
  other: 'cicon-i15'
}, {
  c_name: '恐怖',
  top_id: 2,
  other: 'cicon-i16'
}, {
  c_name: '战争',
  top_id: 2,
  other: 'cicon-i17'
}, {
  c_name: '动漫',
  top_id: 2,
  other: 'cicon-i30'
}, {
  c_name: '剧情',
  top_id: 2,
  other: 'cicon-i18'
}, {
  c_name: '纪录片',
  top_id: 2,
  other: 'cicon-i21'
}, {
  c_name: '电影解说',
  top_id: 2,
  other: 'cicon-i20'
}, {
  c_name: '内地综艺',
  top_id: 4,
  other: 'cicon-i23'
}, {
  c_name: '港台综艺',
  top_id: 4,
  other: 'cicon-i24'
}, {
  c_name: '日韩综艺',
  top_id: 4,
  other: 'cicon-i25'
}, {
  c_name: '欧美综艺',
  top_id: 4,
  other: 'cicon-i26'
}, {
  c_name: '国产动漫',
  top_id: 3,
  other: 'cicon-i27'
}, {
  c_name: '日韩动漫',
  top_id: 3,
  other: 'cicon-i28'
}, {
  c_name: '欧美动漫',
  top_id: 3,
  other: 'cicon-i29'
}, {
  c_name: '海外动漫',
  top_id: 3,
  other: 'cicon-i31'
}]);

async function makeClass () {
  await Promise.all(accounts.invokeMap('save')).then(function() {
    console.log('created');
  }).catch(function(e) {
    console.error(e);
  });
}

module.exports = makeClass;