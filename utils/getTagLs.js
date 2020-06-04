const Area = require('../model/area')
    , Director = require('../model/director')
    , Performer = require('../model/performer')
    , { makeMovieArr } = require('./utils')
    , getMenu = require('./getMenu');

let getTagLs = async(type, tag, page) => {
    let json = {
      'status': 0,
      'movies': []
    };
    me = await getMenu()
    json.menu = me.menu
    json.menumore = me.menumore
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
    const gm = await getMovie(t, tag, page, type);
    json.movies = gm[0]
    json.ctitle = gm[1]
    return json
};
let getMovie = (types, tag, page, tt) => {
  let offset = 0;
  if (page === 1 || !page) {
    offset = 0
  } else if (page === 2) {
    offset = 30
  } else {
    offset = (page - 1) * 30
  };
  const ctitle = getTitle(tt)
  return types.where({
        'id': tag
      })
      .fetch({
        require: false,
        withRelated: ['movie.area', {
          'movie': (qb) => {
            qb.offset(offset);
            qb.columns(['title', 'cid', 'other', 'created_at']);
            qb.limit(30).orderBy('id', 'DESC');
          },
        }],
        columns: ['id', 'count', ctitle]
      }).then((mov) => {
        const d = mov.toJSON()
            , rt = d.movie
            , count = d.count;
        let t;
        switch (tt) {
          case 'area':
            t = d.a_name
            break;
          case 'director':
            t = d.d_name
            break;
          case 'performer':
            t = d.p_name
            break;
          default:
            break;
        }
        mov.save({
          count: parseInt(count + 1)
        });
        if (rt !== undefined) return ([makeId(rt), t]);
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

let getTitle = (types) => {
  // console.log(types)
  let ctitle
  switch (types) {
    case 'area':
      ctitle = 'a_name'
      break;
    case 'director':
      ctitle = 'd_name'
      break;
    case 'performer':
      ctitle = 'p_name'
      break;
    default:
      break;
  }
  return ctitle
}


module.exports = getTagLs;