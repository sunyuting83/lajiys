const Area = require('../model/area'),
  Director = require('../model/director'),
  Performer = require('../model/performer')
  , { makeMovieArr } = require('./utils');

let getTagLs = async(type, tag, page) => {
  
    let json = {
      'movies': []
    };
    let t;
    switch (type) {
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
    json.movies = await getMovie(t, tag, page);
    return json
};
let getMovie = (types, tag, page) => {
  let offset = 0;
  if (page === 1 || !page) {
    offset = 0
  } else if (page === 2) {
    offset = 30
  } else {
    offset = (page - 1) * 30
  };
  return types.where({
        'id': tag
      })
      .fetch({
        require: false,
        withRelated: ['movie.area', {
          'movie': (qb) => {
            qb.offset(offset);
            qb.columns(['title', 'cid', 'other', 'created_at']);
            qb.limit(30).orderBy('created_at', 'DESC');
          },
        }],
        columns: ['id', 'count']
      }).then((mov) => {
        let rt = mov.toJSON().movie;
        let count = mov.toJSON().count;
        mov.save({
          count: parseInt(count + 1)
        });
        if (rt !== undefined) return (makeId(rt));
        return ([]);
      }).catch((err) => {
        console.error(err)
      });
};

let makeId = (arr) => {
  arr.map(x => {
    x.id = x._pivot_mv_movie_id;
    let other = JSON.parse(x.other)
    x.img = other.img
    x.st = other.remarks
    delete x.other
    delete x._pivot_mv_area_id;
    delete x._pivot_mv_movie_id;
    return x
  })
  return arr;
};


module.exports = getTagLs;