const {get, put} = require('./hkdb')
const sortNumber = (a,b) => {
  return b.id - a.id
};

const getHotKey = async() => {
  const i_params = {
    k: 'index'
  };
  const index = await get(i_params);
  let top10 = [];
  if(index) {
    if(index.length > 0) {
      top10 = index.filter((x,i) => i <= 9);
    }
  }else {
    const param = {
      k: 'index',
      v: []
    };
    put(param)
  }
  return top10;
};

const saveKey = async(key) => {
  const iparam = {
    k: 'index'
  };
  let index = await get(iparam);
  if(index) {
    const check = index.filter(x => x.key == key);
    if(check.length >0) {
      index.filter(x => {
        if(x.key === key) { 
          x.click = x.click + 1
        }
      });
    }else {
      index = [...index, {
        key: key,
        click: 1
      }]
    };
    index = index.sort(sortNumber);
    const param = {
      k: 'index',
      v: index
    };
    put(param);
    return {
      'status': 0,
      'message': 'saved'
    }
  }else {
    const param = {
      k: 'index',
      v: [{
        key: key,
        click: 1
      }]
    };
    put(param)
    return {
      'status': 0,
      'message': 'saved'
    }
  }
};

module.exports = {
  getHotKey,
  saveKey
}