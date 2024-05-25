import { drawEllipse } from "../elements/ellipse";
import { drawLine } from "../elements/line";
import { drawRect } from "../elements/rect";
import { drawText } from "../elements/text";
import { AllShape } from "./shapeTypes";

const updateCanvas = (ctx: CanvasRenderingContext2D, elements: AllShape[]) => {
  elements.forEach((element) => {
    switch (element.type) {
      case "rect":
        drawRect(ctx, element);
        break;
      case "ellipse":
        drawEllipse(ctx, element);
        break;
      case "diamond":
        //drawDiamond(ctx,element)
        break;
      case "line":
        drawLine(ctx, element);
        break;
      case "arrow":
        //drawArrow(ctx,element)
        break;
      case "image":
        //drawImage(ctx, element)
        break;
      case "text":
        drawText(ctx, element);
        break;
      case "pen":
        //drawPen(etx, element)
        break;
      default:
        break;
    }
  });
};

//   if (circle.selected) {
//     const { posX, posY, width, height } = getHandleBar();
//     drawHandler(ctx, posX, posY, width, height, 4);
//   }
// }

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

export { updateCanvas };
