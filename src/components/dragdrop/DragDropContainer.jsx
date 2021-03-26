import './dragdropStyles.css';
import { useSelector } from 'react-redux';
import { DragAndDropSection } from './DragDropSection';
import { NewItemCard } from './NewItemCard';
// custom hook
import { useDragDrop } from '../../hooks/useDragDrop';

export default function DragDropContainer() {
	const { title, sections, cards } = useSelector((state) => state.board);

	const mappedSections = useDragDrop(sections, cards);

	return (
		<div
			className='dragdrop-container'
			// TODO: ability to change background image by the user
			style={{
				backgroundImage:
					'url(https://images.unsplash.com/photo-1614199238405-741b10b6e5af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)',
			}}>
			<header>
				<h3 className='board-titles'>{title}</h3>
				<span className='board-titles'>Personal</span>
				<span className='board-titles'>Private</span>
			</header>
			<div className='sections'>
				{mappedSections &&
					mappedSections.map(({ section, handlers, lists }) => (
						<DragAndDropSection key={section} name={section} handlers={handlers} items={lists} />
					))}
				<NewItemCard
					variant='input'
					placeHolder='Enter section title...'
					composerButtonLabel={`Add ${sections.length > 0 ? 'another' : 'new'} section`}
					buttonLabel='Add section'
				/>
			</div>
		</div>
	);
}
