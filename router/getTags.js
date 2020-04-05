const getTagLs = require('../utils/getTagLs');
var fn_tag = async (ctx, next) => {
    let page = ctx.request.query.page;
    if (!page) page = 1;
    let type = ctx.request.query.type;
    if (!type) type = 'area';
    let tag = ctx.request.query.tag;
    if (!tag) tag = 1;
    let data = await getTagLs(type, tag, page);
    ctx.response.body = data;
    await next();
};

module.exports = {
    'GET /api/getags': fn_tag
};