const Movie = require('../model/movie')
    , {
      makeCache,
      getCache
    } = require('./cache')
    , {
      makeMovie
    } = require('./utils');

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
        columns: ['id', 'title', 'other']
      });
    data = makeMovie(d)
    const p = {
      key: key,
      value: data
    }
    makeCache(p)
  }
  return data
};

module.exports = getMovie;