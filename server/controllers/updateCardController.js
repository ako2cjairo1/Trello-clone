const Card = require('../models/Card');
const { getCounterController } = require('./getCounterController');
const { createUpdateObject } = require('../utils/createUpdateObject');

const updateCardController = async (req, res) => {
	try {
		const { card, isUpdateIndex } = req.body;
		// build mapping of updates, except for 'index'
		const cardData = createUpdateObject(card, ['index']);
		// modify updates if we need to change the 'index'
		const updates = isUpdateIndex
			? { ...cardData, index: await getCounterController('cards') }
			: cardData;

		const updateCardResponse = await Card.findByIdAndUpdate(
			{ _id: cardData.id },
			// update the index whenever updated
			{ $set: updates },
			// new is set to true to make sure it will reture the updated document
			{ new: true }
		);

		if (updateCardResponse) {
			res.json(updateCardResponse);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { updateCardController };
