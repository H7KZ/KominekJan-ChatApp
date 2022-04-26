function setMainColor() {
	localStorage.setItem("mainColor", "#c2ff4f");
	localStorage.setItem("borderColor", "#cbff6a");
}

export function setNewMainColor(color: string) {
	localStorage.setItem("mainColor", color);
	localStorage.setItem("borderColor", color);
}

export function changeMainColor(color: string) {
	localStorage.setItem("mainColor", color);
}

export function getMainColor() {
	return localStorage.getItem("mainColor");
}

export function getBorderColor() {
	return localStorage.getItem("borderColor");
}

function getAllColors() {
	return (
		localStorage.getItem("mainColor") && localStorage.getItem("borderColor")
	);
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
