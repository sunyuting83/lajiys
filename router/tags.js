const getTags = require('../utils/getTags');
var fn_tags = async (ctx, next) => {
    let data = await getTags();
    ctx.response.body = data;
    await next();
};

module.exports = {
    'GET /api/tags': fn_tags
};