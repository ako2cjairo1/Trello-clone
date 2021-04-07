const fnMapID = (list) => {
	const listMap =
		list &&
		list.map((item) => {
			// rename _id to id
			return {
				...item,
				id: item._id,
			};
		});

	return listMap || [];
};
export { fnMapID };
