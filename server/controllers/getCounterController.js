const Counter = require('../models/Counter');

const getCounterController = async (sequenceName) => {
	const result = await Counter.findOneAndUpdate(
		// find counter value by sequenceName
		{ id: sequenceName },
		// then, increment by 1 and update
		{ $inc: { seq: 1 } },
		// new is set to true to make sure it will reture the updated document
		{ new: true }
	);
	// then return incremented sequence value.
	return result.seq;
};

module.exports = { getCounterController };
