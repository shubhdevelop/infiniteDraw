function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);
}

function isPointInsideCircle() {}
function isPointInsideRect() {}
function updateCanvas() {}

export { updateCanvas, clearCanvas };
