const getTagLs = require('../utils/getTagLs');
var fn_tag = async (ctx, next) => {
    const type = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length)
    let page = ctx.request.query.page;
    if (!page) page = 1;
    let id = ctx.request.query.id;
    if (!id) id = 1;
    let data = await getTagLs(type, id, page);
    ctx.response.body = data;
    await next();
};

module.exports = {
    'GET /api/area': fn_tag,
    'GET /api/director': fn_tag,
    'GET /api/performer': fn_tag
};