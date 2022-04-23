function setMainColor() {
	localStorage.setItem("mainColor", "#c2ff4f");
	localStorage.setItem("borderColor", "#cbff6a");
}

/**
 * @param {string} color
 */
export function setNewMainColor(color) {
	localStorage.setItem("mainColor", color);
	localStorage.setItem("borderColor", color);
}

/**
 * @param {string} color
 */
export function changeMainColor(color) {
	localStorage.setItem("mainColor", color);
}

export function getMainColor() {
	return (
		localStorage.getItem("mainColor")
	);
}

export function getBorderColor() {
	return localStorage.getItem("borderColor");
}

function getAllColors() {
	return localStorage.getItem("mainColor") && localStorage.getItem("borderColor");
}

export function checkMainColor() {
	if (
		getAllColors() == undefined ||
		getAllColors() == null ||
		getAllColors() == ""
	) {
		setMainColor();
	}
}
