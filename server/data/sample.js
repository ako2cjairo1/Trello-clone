const boards = [
	{
		id: 1,
		title: 'Task Status',
		index: 1,
	},
	{
		id: 2,
		title: 'Weather App',
		index: 2,
	},
	{
		id: 3,
		title: 'PSE App Status',
		index: 3,
	},
];

const sections = [
	{
		id: 1,
		board: 1,
		index: 1,
		name: 'Not Started',
	},
	{
		id: 2,
		board: 1,
		index: 2,
		name: 'In Progress',
	},
	{
		id: 3,
		board: 1,
		index: 3,
		name: 'Done',
	},
	{
		id: 4,
		board: 1,
		index: 4,
		name: 'Others',
	},
];

const cards = [
	{
		id: 1,
		text: 'this is item 1',
		section: 1,
	},
	{
		id: 2,
		text:
			"simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
		section: 1,
	},
	{
		id: 3,
		text: 'this is item 3',
		section: 1,
	},
	{
		id: 4,
		text:
			"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy",
		section: 1,
	},
	{
		id: 5,
		text: 'this is item 5',
		section: 1,
	},
	{
		id: 6,
		text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
		section: 1,
	},
	{
		id: 7,
		text:
			"Their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Many desktop publishing packages and web page editors now use Lorem Ipsum as..",
		section: 1,
	},
	{
		id: 8,
		text: 'this is item 8',
		section: 1,
	},
	{
		id: 9,
		text: 'this is item 9',
		section: 1,
	},
	{
		id: 10,
		text: 'this is item 10',
		section: 1,
	},
	{
		id: 11,
		text: 'this is item 11',
		section: 1,
	},
];

module.exports = { boards, sections, cards };
