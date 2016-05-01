var config = require('./config.json');
var utils = require('./utils.js');

const spawn = require('child_process').spawn;

var request = require('request');
var colors = require('colors');
var running = require('is-running')


var io = require('socket.io')(7777);
var master = io.of('/childs');

const mysql = require('mysql')
request(config.url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Show the HTML for the Google homepage. 
  } else {
  	console.log(error);
  }
})

var database = mysql.createConnection({
	host     : config.mysql[0]['host'],
	user     : config.mysql[0]['user'],
	password : config.mysql[0]['password'],
	database : config.mysql[0]['database']
});

database.connect();

var token;

database.query('SELECT * FROM config WHERE name=\'token\'', function(err, rows, fields){ // GET TOKEN FROM DATABASE
	if (err) throw err;
	token = rows[0].value;
});


utils.log("Master is ready"); // MASTER IS UP

var childs = [];

for (var i = 0; i < 5; i++) { // SPAWN SOME CHILDS (DEBUGGING)
	spawn(
		'node',
		[
			'child.js'
		],{
			detached: false
		}
	);
}


master.on('connection', function (child) {
	utils.log('New connection'); // NEW CONNECTION HANDLED

	child.emit('whereareyou'); // WHERE IS THE CHILD

	child.on('iamhere', function(data){
		if(running(data.pid) == false){
			child.disconnect();
			utils.log("You shall not pass. (Error: Not on the same host")
		} else {
			utils.log("Connected from the same host")
		}
	});

	child.emit('auth'); // ASK FOR AUTH

	child.on('credentials', function(data){
		database.query('SELECT * FROM config WHERE name=\'token\'', function(err, rows, fields){
			if (err) throw err;
			token = rows[0].value;
		});
		if(data.token == token){
			utils.log("Token is valid")
			utils.log("New child with pid " + colors.cyan(data.pid));
		}
	});

	child.on('debug', function(data){
		console.log(data);
	});
});


// process.stdin.on('readable', function(){
// 	var chunk = process.stdin.read();
// 	if (chunk !== null) {
// 		var cmd = `${chunk}`.trim();
// 		if(cmd == "disconnect"){
// 			utils.log("Send order to disconnect to" + pid.cyan);
// 			socket.emit('data', {cmd: 'disconnect'});
// 		} else if(cmd == 'start'){
// 			utils.log("Send order to start the game server to " + pid.cyan);
// 		}
// 	}
// });