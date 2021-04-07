const Counter = require('../models/Counter');

const getCounterController = async (sequenceName) => {
	let result;
	const isExists = await Counter.exists({ id: sequenceName });

	if (isExists) {
		// return incremented sequence value.
		result = await Counter.findOneAndUpdate(
			// find counter value by sequenceName
			{ id: sequenceName },
			// then, increment by 1 and update
			{ $inc: { seq: 1 } },
			// new is set to true to make sure it will reture the updated document
			{ new: true }
		);
		return result.seq;
	} else {
		result = await Counter.insertMany([{ id: sequenceName, seq: 1 }]);
		// return sequence value.
		return result.seq;
	}
};

module.exports = { getCounterController };
