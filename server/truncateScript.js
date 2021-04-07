const connectMongoDB = require('./config/mongoDB');
const Counter = require('./models/Counter');
const Board = require('./models/Board');
const Section = require('./models/Section');
const Card = require('./models/Card');

async function truncateCollections() {
	try {
		await connectMongoDB();

		await Counter.deleteMany({});
		await Board.deleteMany({});
		await Section.deleteMany({});
		await Card.deleteMany({});

		console.log('Deleting schemas...OK!');
		process.exit(1);
	} catch (error) {
		console.log('Deleting schemas...FAILED!', error);
	}
}

truncateCollections();
