const getList = require('../utils/getList');
var fn_list = async (ctx, next) => {
    let page = ctx.request.query.page;
    if (!page) page = 1;
    let cid = ctx.request.query.cid;
    if (!cid) cid = 1;
    let data = await getList(cid, page);
    ctx.response.body = data;
    await next();
};

module.exports = {
    'GET /api/list': fn_list
};