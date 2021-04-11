import { memo } from 'react';
import './Spinner.css';

export const Spinner = memo(() => {
	return (
		<div className='backdrop'>
			<div className='loading'>
				<h1>Loading...</h1>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
});
