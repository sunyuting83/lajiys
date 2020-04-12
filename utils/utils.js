const makeMovieArr = (arr) => {
  arr = arr.toJSON()
  arr.map(x => {
    let other = JSON.parse(x.other)
    x.img = other.img
    x.remarks = other.remarks
    x.score = other.score
    delete x.other
  })
  return arr
}

const arrTrans =(arr, num) => {
  const newArr = [];
  while(arr.length > 0) {
    newArr.push(arr.splice(0, num));
  }
  return newArr;
}

const makePlay = (data) => {
  data.more = false
  data.paly_count = data.hls.length
  if(data.hls.length >= 50) {
    data.hls = arrTrans(data.hls, 20)
    data.more = true
  }
  if(data.player.length >= 50) {
    data.player = arrTrans(data.player, 20)
    data.more = true
  }
  return data
}

const makeMovie = (data) => {
  data = data.toJSON();
  let other = JSON.parse(data.other)
  data.img = other.img
  data.remarks = other.remarks
  data.play_path = makePlay(other.play_path)
  data.languarge = other.languarge
  data.profiles = other.profiles
  data.year = other.year
  data.score = other.score
  data.director.filter(d => {
      delete d._pivot_mv_movie_id
      delete d._pivot_mv_director_id
    })
  data.area.filter(a => {
      delete a._pivot_mv_movie_id
      delete a._pivot_mv_area_id
    })
  data.performer.filter(p => {
      delete p._pivot_mv_movie_id
      delete p._pivot_mv_performer_id
    })
  delete data.other
  return data
}

module.exports = {
  makeMovie,
  makeMovieArr
}