import './DragDropContainer.css';
import { useEffect, useState, useRef } from 'react';
import DragAndDropSection from './DragDropSection';

let notStarted = [
	{
		id: 1,
		text: 'this is item 1',
	},
	{
		id: 2,
		text:
			"s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
	},
	{
		id: 3,
		text: 'this is item 3',
	},
	{
		id: 4,
		text:
			"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy",
	},
];
let inProgress = [];
let done = [];
let others = [];

export default function DragDropContainer() {
	const [itemID, setItemID] = useState(0);
	const [itemIDFrom, setItemIDFrom] = useState(0);
	const [itemIDTo, setItemIDTo] = useState(0);
	const [notStartedList, setNotStartedList] = useState(notStarted);
	const [inProgressList, setInProgressList] = useState(inProgress);
	const [doneList, setDoneList] = useState(done);
	const [othersList, setOthersList] = useState(others);
	let evaluateClass = useRef(null);

	const [notStartedSection, setNotStartedSection] = useState('list');
	const [inProgressSection, setInProgressSection] = useState('list');
	const [doneSection, setDoneSection] = useState('list');
	const [othersSection, setOthersSection] = useState('list');

	let sections = [
		{
			name: 'Not Started',
			items: notStartedList,
		},
		{
			name: 'In Progress',
			items: inProgressList,
		},
		{
			name: 'Done',
			items: doneList,
		},
		{
			name: 'Others',
			items: othersList,
		},
	];

	evaluateClass.current = () => {
		let fromItem;

		if (itemIDFrom && itemIDTo && itemIDFrom !== itemIDTo) {
			switch (itemIDFrom) {
				case 'Not Started':
					fromItem = notStartedList.filter((item) => item.id === itemID);
					setNotStartedList(
						notStartedList.filter((item) => item.id !== itemID)
					);
					break;
				case 'In Progress':
					fromItem = inProgressList.filter((item) => item.id === itemID);
					setInProgressList(
						inProgressList.filter((item) => item.id !== itemID)
					);
					break;
				case 'Done':
					fromItem = doneList.filter((item) => item.id === itemID);
					setDoneList(doneList.filter((item) => item.id !== itemID));
					break;
				case 'Others':
					fromItem = othersList.filter((item) => item.id === itemID);
					setOthersList(othersList.filter((item) => item.id !== itemID));
					break;
				default:
					break;
			}

			switch (itemIDTo) {
				case 'Not Started':
					setNotStartedList((prev) => [...prev, ...fromItem]);
					break;
				case 'In Progress':
					setInProgressList((prev) => [...prev, ...fromItem]);
					break;
				case 'Done':
					setDoneList((prev) => [...prev, ...fromItem]);
					break;
				case 'Others':
					setOthersList((prev) => [...prev, ...fromItem]);
					break;
				default:
					break;
			}

			setItemID(null);
			setItemIDFrom(null);
			setItemIDTo(null);
		}
	};

	const handleDragStart = (id, fr) => {
		setItemID(id);
		setItemIDFrom(fr);
	};

	const handleDragOver = (evt) => {
		evt.preventDefault();

		switch (evt.target.id) {
			case 'Not Started':
				if (!notStartedSection.includes('hovered'))
					setNotStartedSection((prev) => prev + ' hovered');
				break;
			case 'In Progress':
				if (!inProgressSection.includes('hovered'))
					setInProgressSection((prev) => prev + ' hovered');
				break;
			case 'Done':
				if (!doneSection.includes('hovered'))
					setDoneSection((prev) => prev + ' hovered');
				break;
			case 'Others':
				if (!othersSection.includes('hovered'))
					setOthersSection((prev) => prev + ' hovered');
				break;
			default:
				break;
		}
	};

	const handleDragLeave = (evt) => {
		switch (evt.target.id) {
			case 'Not Started':
				setNotStartedSection('list');
				break;
			case 'In Progress':
				setInProgressSection('list');
				break;
			case 'Done':
				setDoneSection('list');
				break;
			case 'Others':
				setOthersSection('list');
				break;
			default:
				break;
		}
	};

	const handleDrop = (evt) => {
		setNotStartedSection('list');
		setItemIDTo(evt.target.id);

		setNotStartedSection('list');
		setInProgressSection('list');
		setDoneSection('list');
		setOthersSection('list');
	};

	useEffect(() => {
		evaluateClass.current();
	}, [itemID, itemIDTo, itemIDFrom]);

	return (
		<div className='drag-drop-container'>
			<header>
				<h2>Task Status</h2>
			</header>
			<div className='lists'>
				{sections.map(({ name, items }) => {
					const sectionClassNameStates =
						name === 'Not Started'
							? notStartedSection
							: name === 'In Progress'
							? inProgressSection
							: name === 'Done'
							? doneSection
							: name === 'Others'
							? othersSection
							: 'list';
					const actionHandlers = {
						sectionClassNameStates,
						handleDragOver,
						handleDragStart,
						handleDragLeave,
						handleDrop,
					};
					return (
						<DragAndDropSection
							key={name}
							name={name}
							handlers={actionHandlers}
							items={items}
						/>
					);
				})}
			</div>
		</div>
	);
}
