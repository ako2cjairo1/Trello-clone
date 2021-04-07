const Board = require('../models/Board');

const updateCurrentBoardController = async (req, res) => {
	try {
		const boardData = req.body;
		// unset the rest of boards
		await Board.updateMany({}, { $set: { index: 0 } });
		// set the board
		const updateBoardResponse = await Board.findOneAndUpdate(
			{ _id: boardData.id },
			{ $set: { index: 1 } },
			// new is set to true to make sure it will return the updated document
			{ new: true }
		);

		if (updateBoardResponse) {
			res.json(updateBoardResponse);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { updateCurrentBoardController };
