import { drawHandler } from "./drawHandler";
import { AllShape, Ellipse, Rect } from "./shapeTypes";

export const updateCanvas = (
  ctx: CanvasRenderingContext2D,
  elements: AllShape[]
) => {
  console.log("draw");

  function draw() {
    elements.forEach((element) => {
      switch (element.type) {
        case "rect":
          console.log("RECT!!");

          drawRect(ctx, element);
          break;
        case "ellipse":
          drawEllipse(ctx, element);
          break;
        case "diamond":
          //drawDiamond(ctx,element)
          break;
        case "line":
          //drawLine(ctx,element)
          break;
        case "arrow":
          //drawArrow(ctx,element)
          break;
        case "image":
          //drawImage(ctx, element)
          break;
        case "pen":
          //drawPen(etx, element)
          break;
        default:
          break;
      }
    });

    requestAnimationFrame(draw);
  }
  draw();

  // requestAnimationFrame(draw);
};

function drawEllipse(ctx: CanvasRenderingContext2D, circle: Ellipse) {
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

// function calculateDiamension(
//   startX: number,
//   startY: number,
//   endX: number,
//   endY: number
// ) {
//   // Calculate width and height
//   const width = Math.abs(endX - startX);
//   const height = Math.abs(endY - startY);

//   // Calculate angle from x-axis
//   const deltaX = endX - startX;
//   const deltaY = endY - startY;
//   let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
//   angle = (angle + 360) % 360; // Convert angle to positive value

//   return {
//     width: width,
//     height: height,
//     angle: angle,
//   };
// }

export { drawEllipse, drawRect };
