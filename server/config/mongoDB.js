require('dotenv').config();
const mongoose = require('mongoose');

const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log('MongoDB connection SUCCESS.');
	} catch (error) {
		console.error('MongoDB connection FAILED!');
		process.exit(1);
	}
};

module.exports = connectMongoDB;
