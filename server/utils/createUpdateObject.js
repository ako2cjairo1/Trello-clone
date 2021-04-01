const createUpdateObject = (jsonObject, excludeKeys = ['_id']) => {
	let resultObject = {};

	// build mapping of updates, except for excluding keys (if provided)
	Object.keys(jsonObject).forEach((key) => {
		if (!excludeKeys.includes(key)) {
			resultObject = { ...resultObject, [key]: jsonObject[key] };
		}
	});
	return resultObject;
};

module.exports = { createUpdateObject };
