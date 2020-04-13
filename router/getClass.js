const getClass = require('../utils/getClass');
var fn_getclass = async (ctx, next) => {
    let id = ctx.request.query.id;
    if (!id) id = 1;
    ctx.response.body = await getClass(id)
    await next();
};

module.exports = {
    'GET /api/getclass': fn_getclass
};