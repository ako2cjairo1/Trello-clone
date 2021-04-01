const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
	section: { type: String, required: true },
	text: { type: String, required: true },
	index: { type: Number, default: 0 },
	created: { type: Date, default: Date.now },
});

const Card = mongoose.model('cards', CardSchema);

module.exports = Card;
