export default function setBodyColor(color) {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--bodyColor", color);
  }
}
