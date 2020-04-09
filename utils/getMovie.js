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
    data.hotlist = await getNew(d.cid)
    makeCache(p)
  }
  return data
};

let getNew = async(cid) => {
  const d = await Movie.forge({
    cid: cid
  })
  .orderBy('-created_at')
  .fetchPage({
    limit: 3,
    columns: ['id', 'title', 'other']
  });
  return makeMovieArr(d);
}

module.exports = getMovie;