import './Root.css';
import DragDropContainer from '../components/dragdrop/DragDropContainer';
import ReduxStoreProvider from '../store';

export default function Root() {
	return (
		<ReduxStoreProvider>
			<DragDropContainer />
		</ReduxStoreProvider>
	);
}
