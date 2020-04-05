var fn_index = async (ctx, next) => {
    await ctx.render('index');
    await next();
};

module.exports = {
    'GET /': fn_index,
    'GET /list': fn_index,
    'GET /list/:id': fn_index,
    'GET /tags': fn_index,
    'GET /tags/:type/:id/:name': fn_index,
    'GET /movie/:id': fn_index,
    'GET /index.html': fn_index
};