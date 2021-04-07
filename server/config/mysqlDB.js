const mySql = require('mysql');

let connectMySqlDB;

try {
	connectMySqlDB = mySql.createConnection({
		user: 'root',
		password: 'root',
		host: 'localhost',
		database: 'trello_clone',
	});
	console.log('MySQL connection SUCCESS!');
} catch (error) {
	console.log('MySQL connection FAILED! ', error);
}

module.exports = connectMySqlDB;
