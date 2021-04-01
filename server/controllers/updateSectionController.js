const Section = require('../models/Section');
const { createUpdateObject } = require('../utils/createUpdateObject');

const updateSectionController = async (req, res) => {
	try {
		const sectionData = req.body;
		// build mapping of updates, except for _id
		const updates = createUpdateObject(sectionData);

		const updateSectionResponse = await Section.findOneAndUpdate(
			{ _id: sectionData.id },
			updates,
			// new is set to true to make sure it will reture the updated document
			{ new: true }
		);

		if (updateSectionResponse) {
			res.json(updateSectionResponse);
		}
	} catch (error) {
		res.json({ message: `Server Error: ${error}` });
	}
};

module.exports = { updateSectionController };
