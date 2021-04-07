// arange items by index
const fnSortByIndex = (list) => {
	const listMap = list && list.sort((x, y) => (x.index > y.index ? 1 : -1));

	return listMap || [];
};
export { fnSortByIndex };
