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

const makeMovie = (data) => {
  data = data.toJSON();
  let other = JSON.parse(data.other)
  data.img = other.img
  data.remarks = other.remarks
  data.play_path = other.play_path
  data.languarge = other.languarge
  data.profiles = other.profiles
  data.year = other.year
  data.score = other.score
  delete data.other
  return data
}

module.exports = {
  makeMovie,
  makeMovieArr
}