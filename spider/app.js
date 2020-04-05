const HttpGet = require('./httpUtils')
    , {
      checkIgnore,
      saveIgnore
    } = require('./checkIgnore')
    ,{
      saveNew,
      saveUpdata
    } = require('./checkdb')
    ,{
      getCache,
      del
    } = require('../utils/cache');

let start = async() => {
  const list = makelist()
  for (var i = 0; i < list.length; i++) {
    const url = list[i]
    console.log(url)
    const data = await HttpGet(url)
    const l = await makeCen(data)
  }
  return
}

let makelist = () => {
  // 先做所有列表页的url数组
  var rturl = 'https://cj.wlzy.tv/api/macs/vod/?ac=detail&pg=';
  var listurls = [];
  for (let i = 2; i >= 1; i--) {
    urllist = rturl + i;
    listurls = [...listurls, urllist]
  };
  // console.log(listurls);
  return listurls;
};

let makeCen = async(data) => {
  const list = data.list;
  for (var i = list.length - 1; i >= 0; i--) {
    let m = list[i]
    // console.log(m)
    //不存在
    let json = {
      cid: getTypeId(parseInt(m.type_id)),
      title: m.vod_name,
      entitle: m.vod_en,
      other: JSON.stringify({
        img: m.vod_pic,
        profiles: m.vod_content,
        play_path: makePlayer(m.vod_play_url),
        score: m.vod_score,
        remarks: m.vod_remarks,
        year: m.vod_year,
        languarge:m.vod_lang
      })
    }
    let other = {
      performer:[],
      area: [],
      director: []
    }
    if(m.vod_area) {
      other.performer = makeArray(m.vod_actor)
      other.area = makeArray(m.vod_area),
      other.director= makeArray(m.vod_director)
    }
    const c = await checkIgnore(m.vod_id)
    if(c) {
      json.id = c
      const id = await saveUpdata(json)
      const key = `movie:${id}`
      const ck = await getCache(key)
      if(ck) del(key)
      console.log(id + ' is done')
    }else{
      const id = await saveNew(json,other)
      await saveIgnore(m.vod_id, id)
      console.log(id + ' is done')
    }
  }
  return
}

const makeArray = (str) => {
  let arr = []
  if(str) {
    const c = str.includes(',')
    const d = str.includes('/')
    const e = str.includes('，')
    const f = str.includes('、')
    if(c) {
      arr = str.split(',')
    }else if(d) {
      arr = str.split('/')
    }else if(e) {
      arr = str.split('，')
    }else if(f) {
      arr = str.split('、')
    }else{
      arr = [str]
    }
  }
  arr = arr.filter(x => {
    if(x) {
      x = x.replace(/(^\s+)|(\s+$)/g, "");
      return x
    }
  })
  return arr
}

const makePlayer = (str) => {
  let p = str.split('$$$')
  let json = {
    "hls": [],
    "player": []
  }
  let d = p.map((x,i) => {
    const chc = x.includes('hl#s')
    if(chc) x = x.replace(/hl#s/g,'hls')
    if(x.includes('$')){
      let o = x.split('#')
      o = o.map(pl => {
        if(pl) {
          const plnam = pl.split('$')
          const types = plnam[1].substring(plnam[1].lastIndexOf('.') + 1,plnam[1].length)
          if(types == 'm3u8') {
            json.hls = [...json.hls,{
                          name: plnam[0],
                          path: plnam[1]
                        }]
          }else {
            json.player = [...json.player,{
                          name: plnam[0],
                          path: plnam[1]
                        }]
          }
        }
        return pl
      })
    }
    return x
  })

  return json
}

let getTypeId = (id) => {
  let gid = 0
  switch (id) {
    case 5:
      gid = 12
      break;
    case 6:
      gid = 13
      break;
    case 7:
      gid = 14
      break;
    case 8:
      gid = 15
      break;
    case 9:
      gid = 16
      break;
    case 10:
      gid = 18
      break;
    case 11:
      gid = 17
      break;
    case 12:
      gid = 5
      break;
    case 13:
      gid = 6
      break;
    case 14:
      gid = 9
      break;
    case 15:
      gid = 8
      break;
    case 16:
      gid = 7
      break;
    case 17:
      gid = 10
      break;
    case 18:
      gid = 11
      break;
    case 19:
      gid = 21
      break;
    case 20:
      gid = 20
      break;
    case 21:
      gid = 19
      break;
    case 22:
      gid = 22
      break;
    case 23:
      gid = 23
      break;
    case 24:
      gid = 24
      break;
    case 25:
      gid = 25
      break;
    case 26:
      gid = 26
      break;
    case 27:
      gid = 27
      break;
    case 28:
      gid = 28
      break;
    case 29:
      gid = 29
      break;
    case 30:
      gid = 30
      break;
    case 31:
      gid = 31
      break;
    default:
      gid = 22
      break;
  }
  return gid
}

start().then(async function() {
  let c = await getCache('index')
  if(c) del('index')
  console.log('done')
  process.exit();
})