const makeMovieArr = (arr) => {
  arr = arr.toJSON()
  arr.map(x => {
    let other = JSON.parse(x.other)
    x.img = other.img
    x.st = other.remarks
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
  data.languarge = [other.languarge]
  data.profiles = other.profiles
  delete data.other
  return data
}

module.exports = {
  makeMovie,
  makeMovieArr
}