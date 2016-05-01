var fs = require('fs');
var util = require('util');
var prompt = require('prompt');
var utils = require('./utils.js');


var schema = {
    properties: {
      name: {
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Name must be only letters, spaces, or dashes',
        required: true
      },
      password: {
        hidden: true
      }
    }
  };

for (var i = 0; i < process.stdout.getWindowSize()[0] - "[Installation ]".length -1; i++) {
	if(str == undefined){
		var str = '';
	}
	str = str + "-";
}

fs.stat('./config.json', function(err, stats){
	if(stats !== undefined){
		if(stats.isFile()){
			var config = require('./config.json');
		}
	} else {
		utils.log(str, "Installation", 'cyan', 'red')
		prompt.start();
		prompt.get(schema, function (err, result) {
			console.log('Command-line input received:');
			console.log('  one: ' + result.one);
			console.log('  two: ' + result.two);
			utils.log(str, "Installation", 'cyan', 'red')
		});
	}
})
