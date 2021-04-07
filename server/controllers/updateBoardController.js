const Board = require('../models/Board');
const { createUpdateObject } = require('../utils/createUpdateObject');

const updateBoardController = async (req, res) => {
	try {
		const boardData = req.body;
		// build mapping of updates, except for _id
		const updates = createUpdateObject(boardData);

		const updateBoardResponse = await Board.findOneAndUpdate(
			{ _id: boardData.id },
			updates,
			// new is set to true to make sure it will reture the updated document
			{ new: true }
		);

		if (updateBoardResponse) {
			res.json(updateBoardResponse);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { updateBoardController };
