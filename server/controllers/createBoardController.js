const Board = require('../models/Board');
// const { getCounterController } = require('./getCounterController');

const createBoardController = async (req, res) => {
	try {
		const boardData = req.body;
		// const counter = await getCounterController('boards');
		const response = await Board.insertMany([{ ...boardData, index: 1 }]);

		if (response) {
			res.json(response);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { createBoardController };
