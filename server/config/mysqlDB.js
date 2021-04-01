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

// GET: /create/board

// const body = {
//   title: 'PSE APP Status',
// };

// db.query(`INSERT INTO board (title) VALUES ('${body.title}')`, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     res.send('Success');
//   }
// });

// GET: /boards

// let boards = [],
// sections = [],
// cards = [];

// db.query('SELECT id, title FROM trello_clone.board', (err, resBoards) => {
// if (err) {
//   console.log(err);
// } else {
//   boards = resBoards;
//   // console.log(resBoards);
// }
// });

// db.query('SELECT id, board, sequence_no, name, sequence_no FROM trello_clone.section', (err, resSections) => {
// if (err) {
//   console.log(err);
// } else {
//   sections = resSections;
//   // console.log(resSections);
// }
// });

// db.query('SELECT id, section, sequence_no, name, sequence_no FROM trello_clone.card', (err, resCards) => {
// if (err) {
//   console.log(err);
// } else {
//   cards = resCards;

//   res.send({
//     boards,
//     sections,
//     cards,
//   });
// }
// });
