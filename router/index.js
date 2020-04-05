const getIndex = require('../utils/getIndex');
var fn_index = async (ctx, next) => {
  ctx.response.body = await getIndex();
  await next();
};

module.exports = {
  'GET /api/index': fn_index
};