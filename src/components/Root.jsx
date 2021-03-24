import './Root.css';
import DragAndDrop from '../components/dragdrop/DragDropContainer';

export default function Root() {
	const data = [
		{
			id: 1,
			text: 'this is item 1',
			section: 'Not Started',
		},
		{
			id: 2,
			text:
				"s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
			section: 'Not Started',
		},
		{
			id: 3,
			text: 'this is item 3',
			section: 'Not Started',
		},
		{
			id: 4,
			text:
				"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy",
			section: 'Not Started',
		},
	];

	const sections = [
		{
			index: 1,
			name: 'Not Started',
		},
		{
			index: 2,
			name: 'In Progress',
		},
		{
			index: 3,
			name: 'Done',
		},
		{
			index: 4,
			name: 'Others',
		},
	];

	return (
		<div className='container'>
			<DragAndDrop title={'Task Status'} sections={sections} data={data} />
		</div>
	);
}
