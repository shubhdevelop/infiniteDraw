import { Pan } from "../types/stateTypes";

function getRealMouseCordinate(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
  pan: Pan,
  scale: number
) {
  var mouseX = (clientX - canvas.getBoundingClientRect().left - pan.x) / scale;
  var mouseY = (clientY - canvas.getBoundingClientRect().top - pan.y) / scale;

  return [mouseX, mouseY];
}
