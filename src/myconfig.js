const prod = {
  //生产环境
  index:'index.html',
  baseuri:'/weixin/',
  assetPath:'/m'
},
dev = {
  //开发环境
  index:'',
  baseuri:'/api/weixin/',
  proxyurl:'http://pati.shenzhoujiajiao.net/',
  assetPath:''
}

module.exports = dev