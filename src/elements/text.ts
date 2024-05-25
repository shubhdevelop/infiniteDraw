import { Text } from "../utils/shapeTypes";

function drawText(ctx: CanvasRenderingContext2D, text: Text) {
  const { posX, posY, innerText } = text;

  ctx.save();
  //opacity
  ctx.globalAlpha = text.opacity / 100;

  //fillOptions
  ctx.fillStyle = "black";

  ctx.font = getFontDisplayProperties(text);
  ctx.textAlign = "center";
  // Add text in the middle
  if (innerText) {
    ctx.fillStyle = "black"; // You can change the color here
    ctx.fillText(innerText, posX, posY);
  }
  ctx.restore();
}

function isMouseInsideText(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  text: Text,
  scale: number,
  pan: { x: number; y: number }
): boolean {
  const { posX, posY, fontSize } = text;

  let mouseX =
    (event.clientX - canvas.getBoundingClientRect().left - pan.x) / scale;
  let mouseY =
    (event.clientY - canvas.getBoundingClientRect().top - pan.y) / scale;

  // Check if mouse coordinates are inside text
  const font = getFontDisplayProperties(text);

  ctx.save();
  ctx.font = font;
  const width = ctx.measureText(text.innerText).width;
  const height = fontSize;
  ctx.restore();
  const isInside =
    mouseX >= posX - width / 2 &&
    mouseX <= posX - width / 2 + width &&
    mouseY >= posY - height / 2 &&
    mouseY <= posY - height / 2 + height;

  return isInside;
}

function getFontDisplayProperties({ fontSize, fontFamily }: Text): string {
  let font;

  switch (fontFamily) {
    case "code":
      font = `${fontSize}px Courier New`;
      break;
    case "paint":
      font = `${fontSize}px Brush Script MT`;
      break;
    default:
      font = `${fontSize}px Arial`;
      break;
  }

  return font;
}

export { drawText, isMouseInsideText, getFontDisplayProperties };
