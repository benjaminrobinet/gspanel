const spawn = require('child_process').spawn;

const server = spawn('java', ['-jar', 'serveur.jar']);

server.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

server.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});