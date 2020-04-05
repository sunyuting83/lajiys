const {
  get,
  put
} = require('../utils/levledb');

let checkIgnore = async(k) => {
  let check = await get(k);
  return(check)
};

let saveIgnore = async(k, v) => {
  let save = await put(k, v);
  return(save)
}

module.exports = {
  checkIgnore,
  saveIgnore
};