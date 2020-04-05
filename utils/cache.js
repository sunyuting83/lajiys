var levelup  = require('level')
  , ttl      = require('level-ttl')
  , path     = require('path');

var db = levelup(path.join(__dirname, '../Cache'),{
    valueEncoding: "json"
})
db = ttl(db)

const makeCache = (param, ttl = false, timout = 86400000) => {
  const {key, value} = param
  if(ttl) {
    db.put(key,value, {ttl:timout})
  }else{
    db.put(key,value)
  }
}

const getCache = (key) => {
  return new Promise(async (resolve, reject) => {
    db.get(key, function (err,value) {
      resolve(value)
    })
  })
}

const del = (key) => {
  db.del(key)
}

module.exports = {
  makeCache,
  getCache,
  del
}