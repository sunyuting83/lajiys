const {
    getSearchKey,
    getSearch
} = require('../utils/getSearchKey');
var fn_key = async (ctx, next) => {
    let key = ctx.request.query.key;
    let data = await getSearchKey(key);
    ctx.response.body = data;
    await next();
};
var fn_search = async (ctx, next) => {
    let page = ctx.request.query.page;
    if (!page) page = 1;
    let word = ctx.request.query.word;
    let data = await getSearch(word, page);
    ctx.response.body = data;
    await next();
};


module.exports = {
    'GET /api/getsearchkey': fn_key,
    'GET /api/search': fn_search
};