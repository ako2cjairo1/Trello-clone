const mongoose = require('mongoose');

// create data model of Section
const SectionSchema = new mongoose.Schema({
	board: { type: String, required: true },
	name: { type: String, required: true },
	index: { type: Number, default: 0 },
	created: { type: Date, default: Date.now },
});

// create model in mongoose using the created schema
const Section = mongoose.model('sections', SectionSchema);
// export the created model.
module.exports = Section;
