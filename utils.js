const util = require('util');
const colors = require('colors');
module.exports = {
	log: function(data, who, colorwho, colordata){
		if(who !== undefined){
			who = who;
		} else {
			who = "Master";
		}
		if(colorwho !== undefined){
			colors.setTheme({
			  who: colorwho
			});
		} else {
			colors.setTheme({
			  who: 'cyan'
			});
		}
		if(colordata !== undefined){
			colors.setTheme({
			  data: colordata
			});
		} else {
			colors.setTheme({
			  data: 'white'
			});
		}
		if(util.isObject(data)){
			util.inspect(data);
		} else {
			process.stdout.write("[" + colors.who(who) + "] " + colors.data(data) + "\n");
		}
	}
} 