import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function useFetchData(url, options) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	let fetch = useRef();

	fetch.current = async () => {
		try {
			setIsLoading(true);

			const response = await axios.get(url, options);
			if (response) {
				setIsLoading(false);
				setData(response.data);
			}
		} catch (error) {
			setIsLoading(false);
			setError(error);
		}
	};

	useEffect(() => {
		fetch.current();
	}, [url, options]);

	return [data, isLoading, error];
}

export { useFetchData };
