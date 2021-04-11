export const isUndefinedOrEmpty = (obj) => {
	// return true if:
	// 1. obj is null or undefined
	// 2. obj key count === 0 and an object type
	return (
		obj === undefined ||
		obj === null ||
		(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
	);
};
