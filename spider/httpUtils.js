var superagent = require('superagent');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // 解决https无法访问的问题

let safeParse = (str) => {
  if (typeof str == 'object') return str;
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
};
let HttpGet = (url) => {
  return new Promise((resolve, reject) => {
    // console.log(url);
    if (url !== NaN || url !== undefined) {
      superagent.get(url)
        .set({
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3100.0 Safari/537.36",
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Host': 'cj.wlzy.tv'
        })
        .then((res) => {
          resolve(safeParse(res.text))
        })
        .catch((e) => {
          console.log(e.statusCode);
        });
    }
  });
};

module.exports = HttpGet;