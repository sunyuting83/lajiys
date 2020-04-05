const Movie = require('../model/movie')
    , Classify = require('../model/classify')
    , {
      makeCache,
      getCache
    } = require('./cache')
    , {
      makeMovieArr
    } = require('./utils');

let getIndex = async() => {
  let json = {
      'bigclass': [],
      'notice': '这是一条最新的公告'
    }
  const c = await getCache('index')
  if(c) {
    json.bigclass = c
  }else{
    const data = await getClassify()
    json.bigclass = data
    const p = {
      key: 'index',
      value: data
    }
    makeCache(p,true)
  }
  return json
};
let getClassify = async() => {
  const bc = await Classify.where({
        'top_id': 0
      })
      .fetchAll({
        columns: ['id', 'c_name']
      })
  const data = await makeSmall(bc)
  return data
};

let makeSmall = async(data) => {
  let d = data.toJSON()
  for (const i in d) {
    if (d.hasOwnProperty(i)) {
      const cls = d[i];
      // console.log(cls.id);
      let ids = [];
      cls['smallclass'] = [];
      let sm = await Classify.where({
        'top_id': cls.id
      }).fetchPage({
        limit: 4,
        columns: ['id', 'c_name']
      })
      sm = sm.toJSON()
      for (const y in sm) {
        if (sm.hasOwnProperty(y)) {
          const s = sm[y];
          ids = [...ids,s.id]
        }
      }
      const mo = await Movie.query((qb) => {
        if (ids.length == 0) {
          qb.where(
            'cid', '=', cls.id
          )
        } else {
          qb.where(
            'cid', 'in', ids
          );
        }
      })
      .orderBy('created_at', 'DESC')
      .fetchPage({
        limit: 9,
        columns: ['id', 'title', 'other']
      })
      const mov = makeMovieArr(mo);
      cls['movie'] = mov;
    }
  }
  return d
}

module.exports = getIndex;