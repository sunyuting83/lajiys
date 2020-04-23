const level = require('level')
    , path = require('path')
    , db = level(path.join(__dirname, '../Hotkey'), {
        valueEncoding: "json"
      });

let put = (parms) => {
  let {
    k,
    v
  } = parms;
  return new Promise(function (resolve, reject) {
    db.put(k, v, function (err) {
      if (err) console.log(err);
      resolve(true)
    });
  });
};

let get = (parms) => {
  let k = parms.k;
  return new Promise(function (resolve, reject) {
    db.get(k, function (err, value) {
      // if (err) console.log(err);
      resolve(value)
    });
  });
};

//删除
let del = (parms) => {
  let k = parms.k;
  return new Promise(function (resolve, reject) {
    if (k) {
      db.del(k, (error) => {
        resolve(true)
      })
    } else {
      resolve('no key');
    }
  });
};

module.exports = {
  put,
  get,
  del
};