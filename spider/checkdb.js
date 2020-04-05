const Movie = require('../model/movie');

let saveNew = async(jsons, json) => {
  const {performer, area, director} = json;
  const m = await Movie.forge(jsons).save();
  await movieP(m, performer)
  await movieA(m, area)
  await movieD(m, director)
  return m.id
};

let movieP = async(movie, pp) => {
  if(pp.length > 0) {
    for (const p of pp) {
      await movie.aPerformer(p);
    };
    return
  }
};

let movieA = async(movie, aa) => {
  if(aa.length > 0) {
    for (const a of aa) {
      await movie.aArea(a);
    };
    return
  }
};

let movieD = async(movie, dd) => {
  if(dd.length > 0) {
    for (const d of dd) {
      await movie.aDirector(d);
    };
    return
  }
};


let saveUpdata = (jsons) => {
  return  Movie.forge(jsons).save()
    .then((movie) => {
      return movie.id
    })
    .catch((error) => {
      console.log(error.code)
    });
}

module.exports = {
  saveNew,
  saveUpdata
};