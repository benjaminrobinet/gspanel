// Load the bcrypt module
var bcrypt = require('bcrypt');
// Hash the password with the salt
var hash = bcrypt.hashSync("cosmos20xqtcid!7", 11);
console.log(hash)