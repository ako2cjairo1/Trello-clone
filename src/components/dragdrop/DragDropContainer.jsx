import './dragdropStyles.css';
import { useEffect, useState, useRef } from 'react';
import DragAndDropSection from './DragDropSection';

export default function DragDropContainer({ title, sections, data }) {
	const notStarted = data.filter((item) => item.section === 'Not Started');
	const inProgress = data.filter((item) => item.section === 'In Progress');
	const done = data.filter((item) => item.section === 'Done');
	const others = data.filter((item) => item.section === 'Others');
	// dragged item states
	const [itemID, setItemID] = useState(null);
	const [itemIDFrom, setItemIDFrom] = useState(null);
	const [itemIDTo, setItemIDTo] = useState(null);
	// list item states
	const [notStartedList, setNotStartedList] = useState(notStarted);
	const [inProgressList, setInProgressList] = useState(inProgress);
	const [doneList, setDoneList] = useState(done);
	const [othersList, setOthersList] = useState(others);
	// list item styles states
	const [notStartedSection, setNotStartedSection] = useState('section');
	const [inProgressSection, setInProgressSection] = useState('section');
	const [doneSection, setDoneSection] = useState('section');
	const [othersSection, setOthersSection] = useState('section');

	let evaluateClass = useRef(null);

	// Action Handlers
	const handleDragStart = (id, fr) => {
		// clear the previous dragged item states before starting a new one
		clearDraggedItem();
		// capture new dragged item id
		setItemID(id);
		setItemIDFrom(fr);
	};

	const handleDragOver = (evt, sectionID) => {
		evt.preventDefault();

		if (sectionID !== itemIDFrom) {
			switch (sectionID) {
				case 'Not Started':
					if (!notStartedSection.includes('hovered')) setNotStartedSection((prev) => prev + ' hovered');
					break;
				case 'In Progress':
					if (!inProgressSection.includes('hovered')) setInProgressSection((prev) => prev + ' hovered');
					break;
				case 'Done':
					if (!doneSection.includes('hovered')) setDoneSection((prev) => prev + ' hovered');
					break;
				case 'Others':
					if (!othersSection.includes('hovered')) setOthersSection((prev) => prev + ' hovered');
					break;
				default:
					break;
			}
		}
	};

	const handleDragLeave = (sectionName) => {
		switch (sectionName) {
			case 'Not Started':
				setNotStartedSection('section');
				break;
			case 'In Progress':
				setInProgressSection('section');
				break;
			case 'Done':
				setDoneSection('section');
				break;
			case 'Others':
				setOthersSection('section');
				break;
			default:
				break;
		}
	};

	const handleDrop = (sectionId) => {
		setNotStartedSection('section');
		setItemIDTo(sectionId);

		setNotStartedSection('section');
		setInProgressSection('section');
		setDoneSection('section');
		setOthersSection('section');
	};

	// Controller/Util functions
	evaluateClass.current = () => {
		let fromItem;

		if (itemIDFrom && itemIDTo && itemIDFrom !== itemIDTo) {
			// Remove the item from list
			switch (itemIDFrom) {
				case 'Not Started':
					fromItem = notStartedList.filter((item) => item.id === itemID);
					setNotStartedList(notStartedList.filter((item) => item.id !== itemID));
					break;
				case 'In Progress':
					fromItem = inProgressList.filter((item) => item.id === itemID);
					setInProgressList(inProgressList.filter((item) => item.id !== itemID));
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

			// add the item to new list
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

			clearDraggedItem();
		}
	};

	const clearDraggedItem = () => {
		setItemID(null);
		setItemIDFrom(null);
		setItemIDTo(null);
	};

	const itemsMapper = (sectionName) => {
		let itemList = [];
		let sectionClassNameStates = 'section';

		switch (sectionName) {
			case 'Not Started':
				itemList = notStartedList;
				sectionClassNameStates = notStartedSection;
				break;
			case 'In Progress':
				itemList = inProgressList;
				sectionClassNameStates = inProgressSection;
				break;
			case 'Done':
				itemList = doneList;
				sectionClassNameStates = doneSection;
				break;
			case 'Others':
				itemList = othersList;
				sectionClassNameStates = othersSection;
				break;
			default:
				break;
		}

		return [itemList, sectionClassNameStates];
	};

	// Hooks
	useEffect(() => {
		evaluateClass.current();
	}, [itemIDTo]);

	return (
		<div className='dragdrop-container'>
			<header>
				<h2>{title}</h2>
			</header>
			<div className='sections'>
				{sections.map(({ name }) => {
					const [itemList, sectionClassNameStates] = itemsMapper(name);
					const actionHandlers = {
						sectionClassNameStates,
						handleDragOver,
						handleDragStart,
						handleDragLeave,
						handleDrop,
					};

					return <DragAndDropSection key={name} name={name} handlers={actionHandlers} items={itemList} />;
				})}
			</div>
		</div>
	);
}
