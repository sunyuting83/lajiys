const Movie = require('../model/movie')
    , Classify = require('../model/classify')
    , {
      makeCache,
      getCache
    } = require('./cache')
    , {
      makeMovieArr
    } = require('./utils')
    , getMenu = require('./getMenu');

const getClass = async(id) => {
  let json = {
      'status': 0,
      'menu': [],
      'menumore': [],
      'movielist': []
    }
  me = await getMenu()
  json.menu = me.menu
  json.menumore = me.menumore
  const c = await getCache(`class:${id}`)
  if(c) {
    json.movielist = c
  }else{
    const data = await getClassify(id)
    json.movielist = data
    const p = {
      key: `class:${id}`,
      value: data
    }
    makeCache(p,true)
  }
  return json
};
let getClassify = async(id) => {
  let sm = await Classify.where({
    'top_id': id
  }).fetchAll({
    require: false,
    columns: ['id', 'c_name', 'top_id']
  })
  sm = sm.toJSON();
  // console.log(sm)
  list = [];
  for (const y in sm) {
    if (sm.hasOwnProperty(y)) {
      const s = sm[y];
      let j = {
        id: s.id,
        c_name: s.c_name,
        movie: []
      }
      const mo = await Movie.query((qb) => {
        qb.where(
          'cid', '=', s.id
        )
      })
      .orderBy('id', 'DESC')
      .fetchPage({
        limit: 9,
        columns: ['id', 'title', 'cid', 'other']
      })
      j.movie = makeMovieArr(mo)
      list = [...list, j]
    }
  }
  return list
};


module.exports = getClass;