const Movie = require('../model/movie')
    , {
      makeCache,
      getCache
    } = require('./cache')
    , {
      makeMovie,
      makeMovieArr
    } = require('./utils')
    , getMenu = require('./getMenu');

let getMovie = async(id) => {
  const key = `movie:${id}`
  const c = await getCache(key);
  let data = {};
  if(c) {
    data = c
  }else{
    const d = await Movie.forge({
        'id': id
      })
      .fetch({
        require: false,
        withRelated: [
          'area',
          'director',
          'performer'
        ],
        columns: ['id', 'cid', 'title', 'other']
      });
    data = makeMovie(d)
    const p = {
      key: key,
      value: data
    }
    me = await getMenu()
    data.menu = me.menu
    data.menumore = me.menumore
    data.status = 0
    data.hotlist = await getNew(d.toJSON().cid)
    makeCache(p)
  }
  return data
};

let getNew = async(cid) => {
  const d = await Movie.query(function (qb) {
            qb.where({'cid': cid})
            qb.select('id', 'title', 'other')
            qb.orderByRaw('random()')
            qb.limit(3)
        }).fetchAll()
  return makeMovieArr(d)
}

module.exports = getMovie;