const Movie = require('../model/movie'),
  {
    makeMovieArr
  } = require('./utils'),
  {
    makeCache,
    getCache
  } = require('./cache'),
  {
    saveKey
  } = require('./hotkey');

let getSearchKey = (key) => {
  return Movie.query((qb) => {
      qb.where('title', 'LIKE', '%' + key + '%');
      qb.orWhere('entitle', 'LIKE', '%' + key + '%');
      qb.groupBy('id');
    })
    .orderBy('id', 'DESC')
    .fetchPage({
      limit: 7,
      columns: ['id', 'title']
    })
    .then((data) => {
      if (data) {
        return data
      }
    })
    .catch((err) => {
      return ({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
};

let getSearch = (word, p) => {
  return Movie.query((qb) => {
      qb.where('title', 'LIKE', '%' + word + '%');
      qb.orWhere('entitle', 'LIKE', '%' + word + '%');
      qb.groupBy('id');
    })
    .orderBy('id', 'DESC')
    .fetchPage({
      pageSize: 30,
      page: p,
      columns: ['id', 'title', 'cid', 'other', 'created_at']
    })
    .then((data) => {
      if (data) {
        if(data.length > 0) saveKey(word);
        return makeMovieArr(data);
      }
    })
    .catch((err) => {
      return ({
        'status': 5,
        'message': '数据库发生错误'
      });
    });
}

const getHot = async () => {
  const hot = await getCache('hot')
  if (hot) {
    return hot
  } else {
    return Movie.query((qb) => {
        qb.select('id', 'title')
        qb.orderByRaw('random()')
        qb.limit(10)
      })
      .fetchAll()
      .then((data) => {
        if (data) {
          const p = {
            key: 'hot',
            value: data.toJSON()
          }
          makeCache(p, true)
          return (data)
        }
      })
      .catch((err) => {
        return ({
          'status': 5,
          'message': '数据库发生错误'
        });
      });
  }
}

module.exports = {
  getSearchKey,
  getSearch,
  getHot
};