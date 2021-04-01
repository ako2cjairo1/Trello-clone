require('dotenv').config();
const connectMongoDB = require('./config/mongoDB');
const Counter = require('./models/Counter');
const Board = require('./models/Board');
const Section = require('./models/Section');
const Card = require('./models/Card');

const { boards, sections, cards } = require('./data/sample');
const counters = [
	{ id: 'boards', seq: 0 },
	{ id: 'sections', seq: 0 },
	{ id: 'cards', seq: 0 },
];

const getNextSequenceValue = async (sequenceName) => {
	const result = await Counter.findOneAndUpdate(
		{ id: sequenceName },
		{ $inc: { seq: 1 } },
		{ new: true }
	);

	return result.seq;
};
const deleteSchema = async () => {
	try {
		await Counter.deleteMany({});
		await Board.deleteMany({});
		await Section.deleteMany({});
		await Card.deleteMany({});

		console.log('Deleting schemas...OK!');
		return;
	} catch (error) {
		console.log('Deleting schemas...FAILED!', error);
	}
};
const importCounter = async (counters) => {
	try {
		// import data for Counter collection
		await Counter.insertMany(counters);
		console.log('Counter data importing...OK!');
	} catch (error) {
		console.log('Counter data importing...FAILED!');
	}
};
const importBoard = async (title) => {
	try {
		const board = [
			{
				title: title,
				index: await getNextSequenceValue('boards'),
			},
		];
		// import data for Board collection and return the objectID
		const boardData = await Board.insertMany(board);
		// get the object id of inserted Board
		const boardId = boardData[0]._id;

		console.log(`Board '${title}' data importing...OK!`);
		return boardId;
	} catch (err) {
		console.log(`Board '${title}' data importing...FAILED!`, err);
		process.exit(1);
	}
};
const importSection = async (title, boardUUID, index) => {
	try {
		await getNextSequenceValue('sections'); // don't use, but just to increment the counter
		const sectionData = await Section.insertMany([
			// { board: await boardUUID, name: title, index: await getNextSequenceValue('sections') },
			{ board: await boardUUID, name: title, index },
		]);
		const sectionId = sectionData[0]._id;

		return sectionId;
	} catch (error) {
		console.log(error);
	}
};
const importCard = async (text, sectionUUID) => {
	try {
		await Card.insertMany([
			{ section: await sectionUUID, text: text, index: await getNextSequenceValue('cards') },
		]);
	} catch (error) {
		console.log('Card data importing...FAILED!', error);
		process.exit();
	}
};
const importData = async () => {
	try {
		await connectMongoDB();
		await deleteSchema();

		// create sequence counter
		await importCounter(counters);

		// parse through the list and map data
		// to board, section and cards
		boards.forEach(({ id: _boardID, title }) => {
			// create Board
			const boardUUID = importBoard(title);

			// create Sections
			sections
				.filter((item) => item.board === _boardID)
				.forEach(({ id: _sectionID, name, index }) => {
					const sectionUUID = importSection(name, boardUUID, index);

					// create cards
					cards
						.filter((item) => item.section === _sectionID)
						.forEach(({ text }) => {
							importCard(text, sectionUUID);
						});
				});
		});
	} catch (error) {
		console.log('Error importing data: ', error);
		process.exit(1);
	}
};

importData();
