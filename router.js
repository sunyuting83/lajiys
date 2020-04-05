const fs = require('fs');

// add url-route in /controllers:

let addMapping = (router, mapping) => {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
};

let addControllers = (router, dir) => {
  fs.readdir(`${__dirname}/${dir}`, function(err, menu) {
    if (!menu)
      return;
    menu.forEach(function(ele) {
      fs.stat(`${__dirname}/${dir}` + "/" + ele, function(err, info) {
        if (info.isDirectory()) {
          addControllers(router, `${dir}` + "/" + ele);
        } else {
          console.log(`process controller: ${ele}...`);
          let mapping = require(`${__dirname}/${dir}/${ele}`);
          addMapping(router, mapping);
        }
      })
    })
  })
};
module.exports = () => {
  const controllers_dir = './router',
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};