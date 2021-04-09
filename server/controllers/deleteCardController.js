const Card = require('../models/Card');

const deleteCardController = async (req, res) => {
	try {
		const deletingCard = req.body;
		const response = await Card.deleteMany({ _id: deletingCard.id });

		if (response) {
			res.json(response);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { deleteCardController };
