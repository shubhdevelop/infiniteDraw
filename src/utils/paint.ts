import { drawHandler } from "./drawHandler";
import { Circle, Rect } from "./shapeTypes";

function drawCircle(ctx: CanvasRenderingContext2D, circle: Circle) {
  ctx.beginPath();
  ctx.arc(circle.posX, circle.posY, circle.radius, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  // Draw resize handles if selected

  function getHandleBar() {
    return {
      posX: circle.posX - circle.radius,
      posY: circle.posY - circle.radius,
      width: circle.radius * 2,
      height: circle.radius * 2,
    };
  }

  if (circle.selected) {
    const { posX, posY, width, height } = getHandleBar();
    drawHandler(ctx, posX, posY, width, height, 4);
  }
}

function drawRect(ctx: CanvasRenderingContext2D, rect: Rect) {
  ctx.fillStyle = rect.fillColor;
  ctx.fillRect(rect.posX, rect.posY, rect.width, rect.height);

  function getHandleBar() {
    return {
      posX: rect.posX,
      posY: rect.posY,
      width: rect.width,
      height: rect.height,
    };
  }
  // Draw resize handles if selected
  if (rect.selected) {
    const { posX, posY, width, height } = getHandleBar();
    drawHandler(ctx, posX, posY, width, height, 4);
  }
}

export { drawCircle, drawRect };
