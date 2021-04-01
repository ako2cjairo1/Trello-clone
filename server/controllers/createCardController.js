const Card = require('../models/Card');
const { getCounterController } = require('./getCounterController');

const createCardController = async (req, res) => {
	try {
		const cardData = req.body;

		const response = await Card.insertMany([
			{ ...cardData, index: await getCounterController('cards') },
		]);

		if (response) {
			res.json(response);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { createCardController };
