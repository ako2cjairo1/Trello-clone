const mongoose = require('mongoose');

// create data model of Board
const BoardSchema = new mongoose.Schema({
	title: { type: String, required: true },
	index: { type: Number, default: 0 },
	created: { type: Date, default: Date.now },
});

// create model in mongoose using the created schema
const Boards = mongoose.model('boards', BoardSchema);
// export the created model.
module.exports = Boards;
