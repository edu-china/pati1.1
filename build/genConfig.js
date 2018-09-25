var fs = require('fs');

module.exports = function(conf){
  var myconfig = JSON.parse(fs.readFileSync('./myconfig.json'));
  var confstr = 'module.exports = '+JSON.stringify(myconfig[conf]);
  fs.writeFileSync('./config/myconfig.js',confstr);
}