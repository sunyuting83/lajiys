const Movie = require('../model/movie')
    , Classify = require('../model/classify')
    , {
      makeCache,
      getCache
    } = require('./cache')
    , {
      makeMovieArr
    } = require('./utils');

let getList = async (cid, page) => {
  const key = `list:${cid}.${page}`
  let json = {
    'classify': {
      'bigclass': [],
      'ctitle': '',
      'smallclass': []
    },
    'movies': []
  };
  const c = await getCache(key);
  if(c) {
    json = c
  }else{
    json['classify']['bigclass'] = await getClassify();
    let thisc = await getCname(cid);
    if (thisc.top_id == 0) thisc.top_id = cid;
    json['classify']['smallclass'] = await getClassify(thisc.top_id);
    json['classify']['ctitle'] = thisc.c_name;
    json['movies'] = await getMovie(cid, page);
    const p = {
      key: key,
      value: json
    }
    makeCache(p,true)
  }
  return (json)
};
let getClassify = (cid) => {
  if (!cid) cid = 0;
  return Classify.where({
      'top_id': cid
    })
    .fetchAll({
      columns: ['id', 'c_name']
    })
    .then((data) => {
      return (data);
    })
};
let getCname = (cid) => {
  return Classify.where({
      'id': cid
    })
    .fetch({
      columns: ['c_name', 'top_id']
    })
    .then((data) => {
      // console.log(data.c_name)
      return data.toJSON();
    })
};
let getMovie = (cid, p) => {
return Movie.where({
    'cid': cid
  })
  .orderBy('created_at', 'DESC')
  .fetchPage({
    pageSize: 30,
    page: p,
    columns: ['id', 'title', 'cid', 'other', 'created_at']
  }).then((mov) => {
    return makeMovieArr(mov);
  }).catch((err) => {
    console.error(err)
  });
};

module.exports = getList;