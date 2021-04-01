import './Root.css';
import { DragDropContainer } from '../components/dragdrop';
import ReduxStoreProvider from '../store';

export default function Root() {
	return (
		<ReduxStoreProvider>
			<DragDropContainer />
		</ReduxStoreProvider>
	);
}
