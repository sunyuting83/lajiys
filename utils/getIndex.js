const Movie = require('../model/movie')
    , Classify = require('../model/classify')
    , {
      makeCache,
      getCache
    } = require('./cache')
    , {
      makeMovieArr
    } = require('./utils')
    , getMenu = require('./getMenu');

const getIndex = async() => {
  let json = {
      'status': 0,
      'swiper': swiper,
      'menu': [],
      'menumore': [],
      'movielist': [],
      'notice': ['这是一条最新的公告','这是二条最新的公告']
    }
  me = await getMenu()
  json.menu = me.menu
  json.menumore = me.menumore
  const c = await getCache('index')
  if(c) {
    json.movielist = c
  }else{
    const data = await getClassify()
    json.movielist = data
    const p = {
      key: 'index',
      value: data
    }
    makeCache(p,true)
  }
  return json
};
let getClassify = async() => {
  const bc = await Classify.where({
        'top_id': 0
      })
      .fetchAll({
        columns: ['id', 'c_name']
      })
  const data = await makeSmall(bc)
  return data
};

const swiper = [
  {
    img: 'https://ae01.alicdn.com/kf/U9849b6d178b843bbada26bdec412f073g.jpg',
    id: '33571',
    title: '2019科幻动作《终结者：黑暗命运》BD720P&BD1080P.英语中英双字'
  },{
    img: 'https://ae01.alicdn.com/kf/Uc9d893747c024afa960296414ef7476ev.jpg',
    id: '33340',
    title: '2019高分韩剧《流浪者/浪客行》16集全.HD1080P.国韩双语中字'
  },{
    img: 'https://ae01.alicdn.com/kf/Uef16413b321244e4a99519450c8138d6A.jpg',
    id: '40845',
    title: '2019科幻冒险《星球大战9：天行者崛起》BD720P&BD1080P.国英双语中英双字'
  },{
    img: 'https://ae01.alicdn.com/kf/U50a32afe33fe4ef8a727314dddc40f89Q.jpg',
    id: '41959',
    title: '2020韩剧《王国第二季》6集全.HD1080P.韩语中字'
  },{
    img: 'https://ae01.alicdn.com/kf/U49e5e2811edb4d08a07b63b6ec6081fdG.jpg',
    id: '30720',
    title: '2019爱情犯罪《少年的你》HD1080P.国语中字'
  }
];

const makeSmall = async(data) => {
  let d = data.toJSON()
  for (const i in d) {
    if (d.hasOwnProperty(i)) {
      const cls = d[i];
      // console.log(cls.id);
      let ids = [];
      let sm = await Classify.where({
        'top_id': cls.id
      }).fetchPage({
        limit: 4,
        columns: ['id', 'c_name']
      })
      cls.smallclass = sm;
      sm = sm.toJSON();
      for (const y in sm) {
        if (sm.hasOwnProperty(y)) {
          const s = sm[y];
          ids = [...ids,s.id]
        }
      }
      const mo = await Movie.query((qb) => {
        if (ids.length == 0) {
          qb.where(
            'cid', '=', cls.id
          )
        } else {
          qb.where(
            'cid', 'in', ids
          );
        }
      })
      .orderBy('created_at', 'DESC')
      .fetchPage({
        limit: 9,
        columns: ['id', 'title', 'other']
      })
      const mov = makeMovieArr(mo);
      cls.movie = mov;
    }
  }
  return d
}

module.exports = getIndex;