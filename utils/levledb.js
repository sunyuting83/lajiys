var level = require('level');
var path = require('path');
var db = level(path.join(__dirname, '../IgnoreDB'), {
  valueEncoding: "json"
});

let put = (k, v) => {
  return new Promise(function(resolve, reject) {
    db.put(k, v, function(err) {
      // if (err) resolve (false)
      resolve(true)
    });
  });
};

let get = (k) => {
  return new Promise(function(resolve, reject) {
    db.get(k, function(err, value) {
      // if (err) console.log(err);
      resolve(value)
    });
  });
};
let del = (k) => {
  return new Promise(function(resolve, reject) {
    db.del(k, function(err, value) {
      // if (err) console.log(err);
      resolve(true)
    });
  });
};

module.exports = {
  put,
  get,
  del
};