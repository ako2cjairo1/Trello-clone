const Section = require('../models/Section');
const { getCounterController } = require('./getCounterController');

const createSectionController = async (req, res) => {
	try {
		const sectionData = req.body;
		const response = await Section.insertMany([
			{ ...sectionData, index: await getCounterController('sections') },
		]);

		if (response) {
			res.json(response);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { createSectionController };
