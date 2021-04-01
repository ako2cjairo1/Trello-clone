const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
	id: { type: String, required: true },
	seq: { type: Number, default: 1 },
});

const Counter = mongoose.model('counter', CounterSchema);

module.exports = Counter;
