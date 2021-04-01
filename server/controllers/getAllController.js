const Board = require('../models/Board');
const Section = require('../models/Section');
const Card = require('../models/Card');

const getAllController = async (_, res) => {
	try {
		const boards = await Board.find({});
		const sections = await Section.find({});
		const cards = await Card.find({});

		if (boards && sections && cards) {
			res.json({ boards, sections, cards });
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { getAllController };
