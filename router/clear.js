const {
  getCache,
  del
} = require('../utils/cache');
var fn_clear = async (ctx, next) => {
    let id = ctx.request.query.id;
    console.log(id)
    if (!id) {
      ctx.response.body = 404;
    }else {
      const c = await getCache(id)
      if(c) del(id)
      ctx.response.body = true
    }
    await next();
};

module.exports = {
    'GET /api/180nm3ysib84': fn_clear
};