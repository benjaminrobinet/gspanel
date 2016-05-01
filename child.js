var config = require('./config.json');
var child = require('socket.io-client')('http://127.0.0.1:7777/childs');
const mysql = require('mysql')

// var database = mysql.createConnection({
// 	host     : config.mysql[0]['host'],
// 	user     : config.mysql[0]['user'],
// 	password : config.mysql[0]['password'],
// 	database : config.mysql[0]['database']
// });
// database.connect()

child.on('whereareyou', function(data){
	var pid = process.pid;
	child.emit('iamhere', {pid: pid})
})

child.on('auth', function (data) {
	var token = config.token;
	child.emit('credentials', {token: token})
});

child.on('pid', function (data) {
	var pid = process.pid;
	if(data.accepted == true){
		child.emit('pid', { pid: pid });
	}
});
