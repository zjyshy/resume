var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  response.statusCode = 200;

  let accept = request.headers.accept;
  response.setHeader(
    "Content-Type",
    `${accept.substring(0, accept.indexOf(","))};charset=utf-8`
  );

  let p = path === "/" ? "index.html" : path;
  let data;
  // let suffix = p.substring(p.lastIndexOf(".") + 1);
  // const hash = {
  //   html: "text/html",
  //   css: "text/css",
  //   js: "application/javascript",
  //   jpg: "image/jpeg",
  //   png: "image/png",
  //   gif: "image/git",
  // };
  // response.setHeader("Content-Type", `${hash[suffix]};charset=utf-8`);
  try {
    data = fs.readFileSync(`./public/${p}`);
  } catch (error) {
    data = "文件不存在";
    response.statusCode = 404;
  }

  response.write(data);
  response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
