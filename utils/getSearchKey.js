const Movie = require('../model/movie')
    , {
        makeMovieArr
      } = require('./utils');

let getSearchKey = (key) => {
  return Movie.query((qb) => {
        qb.where('title', 'LIKE', '%' + key + '%', 'or', 'entitle', 'LIKE', '%' +key+ '%');
        qb.groupBy('id');
      })
      .orderBy('created_at', 'DESC')
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
        return({
          'status': 5,
          'message': '数据库发生错误'
        });
      });
};

let getSearch = (word, p) => {
  return Movie.query((qb) => {
        qb.where('title', 'LIKE', '%' + word + '%', 'or', 'entitle', 'LIKE', '%' +word+ '%');
        qb.groupBy('id');
      })
      .orderBy('created_at', 'DESC')
      .fetchPage({
        pageSize: 30,
        page: p,
        columns: ['id', 'title', 'cid', 'other', 'created_at']
      })
      .then((data) => {
        if (data) {
          return ({
            'movies': makeMovieArr(data)
          });
        }
      })
      .catch((err) => {
        return({
          'status': 5,
          'message': '数据库发生错误'
        });
      });
}

module.exports = {
  getSearchKey,
  getSearch
};