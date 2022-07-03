function setMainColor(): void {
  localStorage.setItem("mainColor", "#c2ff4f");
}

export function setNewMainColor(color: string): void {
  localStorage.setItem("mainColor", color);
}

export function getMainColor(): string {
  return localStorage.getItem("mainColor");
}

export function checkMainColor(): void {
  if (
    getMainColor() == undefined ||
    getMainColor() == null ||
    getMainColor() == ""
  ) {
    setMainColor();
  }
}
