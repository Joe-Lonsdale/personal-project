export function generateNumberSet(nums) {
	return nums.map((x) => {
		return { number: x, id: getUUID() };
	});
}

export function getUUID() {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
