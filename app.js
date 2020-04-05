const
  Koa = require('koa'),
  bodyParser = require('koa-bodyparser'),
  router = require('./router'),
  static = require('koa-static'), //koa 静态文件中间件
  views = require('koa-views'), // 配置模版引擎中间件
  Compress = require('koa-compress'),
  logger = require("./utils/logger"),
  cors = require('./utils/cors'),
  app = new Koa();


app.use(views('template', {
  map: {
    html: 'ejs'
  }
}));
app.use(Compress({
  threshold: 2048 // 要压缩的最小响应字节
})); // Gzip压缩

app.use(cors);
app.use(logger);
app.use(static(__dirname + '/static'));
app.use(bodyParser());
app.use(router());

app.listen(5002);
console.log('app started at port 5002...');