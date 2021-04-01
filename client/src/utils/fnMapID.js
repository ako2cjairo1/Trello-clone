const fnMapID = (list) => {
	const listMap =
		list &&
		list
			// arange items by index
			.sort((x, y) => (x.index > y.index ? 1 : -1))
			.map((item) => {
				// rename _id to id
				return {
					...item,
					id: item._id,
				};
			});

	return listMap || [];
};
export { fnMapID };
