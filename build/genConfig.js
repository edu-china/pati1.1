var fs = require('fs');
var chalk = require('chalk');
module.exports = function(conf){
  console.log(chalk.gray('生成配置...'));
  var myconfig = JSON.parse(fs.readFileSync('./myconfig.json'));
  var confstr = 'module.exports = '+JSON.stringify(myconfig[conf]);
  console.table([myconfig[conf]]);
  fs.writeFileSync('./config/myconfig.js',confstr);
}