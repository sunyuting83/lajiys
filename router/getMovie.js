const getMovie = require('../utils/getMovie');
var fn_movie = async (ctx, next) => {
    let id = ctx.request.query.id;
    if (!id) id = 1;
    let data = await getMovie(id);
    ctx.response.body = data;
    await next();
};

module.exports = {
    'GET /api/getmovie': fn_movie
};