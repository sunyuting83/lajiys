const Classify = require('../model/classify')
    , {
      makeCache,
      getCache
    } = require('./cache');
const getMenu = async() => {
  let json = {
    menu:[],
    menumore:[]
  }
  const m = await getCache('menu')
  if(m) {
    json = m
  }else{
    let menu = await Classify.forge()
    .fetchAll({
      columns: ['id', 'c_name', 'top_id']
    })
    menu = menu.toJSON()
    json.menu = menu.filter(x => Number(x.top_id) == 0)
    json.menumore = menu.filter(x => Number(x.top_id) > 0)
    const p = {
      key: 'menu',
      value: json
    }
    makeCache(p)
  }
  return json
}
module.exports = getMenu;