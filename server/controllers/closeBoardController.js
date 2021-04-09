const Board = require('../models/Board');
const Section = require('../models/Section');
const Card = require('../models/Card');

const cascadeDelete = async (closingBoard) => {
	const deletingSections = await Section.find({ board: closingBoard.id });
	if (deletingSections.length > 0) {
		let deleteCardFilter = [];
		deletingSections.forEach((section) => {
			deleteCardFilter.push({ section: section._id });
		});

		if (deleteCardFilter.length > 0) {
			// Deleting Cards that belongs to closing board
			await Card.deleteMany({ $or: deleteCardFilter });
		}
	}

	// Deleting Sections that belongs to closing board
	await Section.deleteMany({ board: closingBoard.id });
	// finally, Deleting/Closing boards
	await Board.deleteMany({ _id: closingBoard.id });
};

const closeBoardController = async (req, res) => {
	try {
		const closingBoard = req.body;
		cascadeDelete(closingBoard);

		const selectedResponse = await Board.updateOne(
			{},
			// select a default board
			{ $set: { index: 1 } },
			// new is set to true to make sure it will reture the updated document
			{ new: true }
		);

		if (selectedResponse) {
			res.json(selectedResponse);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { closeBoardController };
