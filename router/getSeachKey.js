const {
  getSearchKey,
  getSearch,
  getHot
} = require('../utils/getSearchKey'), {
  getHotKey
} = require('../utils/hotkey');
const fn_key = async (ctx, next) => {
  let key = ctx.request.query.key;
  let data = await getSearchKey(key);
  ctx.response.body = data;
  await next();
};
const fn_search = async (ctx, next) => {
  let page = ctx.request.query.page;
  if (!page) page = 1;
  let word = ctx.request.query.word;
  let data = await getSearch(word, page);
  ctx.response.body = data;
  await next();
};

const fn_searchot = async (ctx, next) => {
  let json = {
    status: 0,
    hotkey: [],
    hotlist: []
  }
  json.hotkey = await getHotKey()
  json.hotlist = await getHot()
  ctx.response.body = json
  await next();
};

module.exports = {
  'GET /api/getkey': fn_key,
  'GET /api/search': fn_search,
  'GET /api/gethot': fn_searchot
};