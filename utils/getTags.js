const Area = require('../model/area')
    , Director = require('../model/director')
    , Performer = require('../model/performer')
    , {
      makeCache,
      getCache
    } = require('./cache');

let getTags = async () => {
  let json = {
    'area': [],
    'director': [],
    'performer': []
  };
  const c = await getCache('tag')
  if(c) {
    json = c
  }else{
    json.area = await getT('area', 'a_name');
    json.director = await getT('director', 'd_name');
    json.performer = await getT('performer', 'p_name');
    const p = {
      key: 'tag',
      value: json
    }
    makeCache(p,true)
  }
  return json;
};
let getT = (t, tp) => {
  switch (t) {
    case 'area':
      t = Area;
      break;
    case 'director':
      t = Director;
      break;
    case 'performer':
      t = Performer;
      break;
    default:
      t = Area;
      break;
  };
  return t.query(function(qb) {
      qb.groupBy('id');
    })
    .orderBy('count', 'DESC')
    .fetchPage({
      limit: 12,
      columns: ['id', 'count', tp]
    }).then((mov) => {
      return mov;
    }).catch((err) => {
      console.error(err)
    });
};

module.exports = getTags;