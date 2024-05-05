import { useEffect, useRef, useState } from "react";
import { clearCanvas, updateCanvas } from "../utils/canvas";
import Toolbar from "./Toolbar";

function drawSquare(ctx: CanvasRenderingContext2D, square: Square) {
  // Draw the square
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.size, square.size);

  // Draw resize handles if selected
  if (square.selected) {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      square.x - square.handleSize / 2 - 4,
      square.y - square.handleSize / 2 - 4,
      square.handleSize + 3,
      square.handleSize + 3
    );
    ctx.fillRect(
      square.x + square.size - square.handleSize / 2 + 1,
      square.y - square.handleSize / 2 - 4,
      square.handleSize + 3,
      square.handleSize + 3
    );
    ctx.fillRect(
      square.x + square.size - square.handleSize / 2 + 1,
      square.y + square.size - square.handleSize / 2 + 1,
      square.handleSize + 3,
      square.handleSize + 3
    );
    ctx.fillRect(
      square.x - square.handleSize / 2 - 4,
      square.y + square.size - square.handleSize / 2 + 1,
      square.handleSize + 3,
      square.handleSize + 3
    );
    ctx.strokeStyle = "blue";

    ctx.strokeRect(
      square.x - 1.5,
      square.y - 1.5,
      square.size + 3,
      square.size + 3
    );
  }
}

function drawCircle(ctx: CanvasRenderingContext2D, circle: Circle) {
  // Draw the circle
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();

  // Draw resize handles if selected
  if (circle.selected) {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      // circle.x - circle.radius - circle.handleSize / 2 - 2.4,
      // circle.y - circle.handleSize / 2,
      circle.x - circle.radius,
      circle.y - circle.radius,
      circle.handleSize,
      circle.handleSize
    );
    ctx.fillRect(
      circle.x + circle.radius - circle.handleSize / 2 + 3,
      circle.y - circle.handleSize / 2,
      circle.handleSize,
      circle.handleSize
    );
    ctx.fillRect(
      circle.x - circle.handleSize / 2,
      circle.y - circle.radius - circle.handleSize / 2 - 2.5,
      circle.handleSize,
      circle.handleSize
    );
    ctx.fillRect(
      circle.x - circle.handleSize / 2,
      circle.y + circle.radius - circle.handleSize / 2 + 2.5,
      circle.handleSize,
      circle.handleSize
    );

    ctx.strokeStyle = "blue";

    ctx.strokeRect(
      circle.x - circle.radius - 1.5,
      circle.y - circle.radius - 1.5,
      circle.radius * 2 + 4,
      circle.radius * 2 + 4
    );
  }
}

function Canvas() {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState<Pan>({ panX: 10, panY: 10 });

  const [diamension, setDiamension] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [square, setSquare] = useState<Square>({
    type: "square",
    x: 500,
    y: 500,
    size: 100,
    color: "red",
    handleSize: 2,
    selected: false,
  });
  const [circle, setCircle] = useState<Circle>({
    type: "circle",
    x: 700,
    y: 700,
    radius: 50,
    color: "blue",
    handleSize: 4,
    selected: false,
  });

  const canvasElement = useRef<HTMLCanvasElement>(null);
  const canvas = canvasElement!.current;
  const ctx = canvas?.getContext("2d");
  useEffect(() => {
    //Handle Windows resize
    const handleResize = () => {
      setDiamension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    // the Scale and pan
    if (ctx) {
      ctx.setTransform(scale, 0, 0, scale, pan.panX, pan.panY);
    }

    const handleClick = (event: MouseEvent) => {
      if (canvas && ctx) {
        var mouseX =
          (event.clientX - canvas.getBoundingClientRect().left - pan.panX) /
          scale;
        var mouseY =
          (event.clientY - canvas.getBoundingClientRect().top - pan.panY) /
          scale;

        // Check if mouse click is inside the square
        [square, circle].forEach((shape) => {
          if (shape.type == "square") {
            if (
              mouseX >= square.x &&
              mouseX <= square.x + square.size &&
              mouseY >= square.y &&
              mouseY <= square.y + square.size
            ) {
              // Toggle the selected state
              setSquare((prev) => {
                return { ...prev, selected: !prev.selected };
              });
              updateCanvas();
            }
          }
          if (shape.type == "circle") {
            var distance = Math.sqrt(
              Math.pow(mouseX - shape.x, 2) + Math.pow(mouseY - shape.y, 2)
            );
            if (distance <= shape.radius) {
              // Toggle the selected state
              setCircle((prev) => {
                console.log(prev);

                return { ...prev, selected: !prev.selected };
              });
              updateCanvas();
            }
          }
        });
      }
    };

    window.addEventListener("resize", () => {
      handleResize();
    });

    if (canvas) {
      canvas.addEventListener("click", handleClick);
    }

    if (ctx) {
      drawSquare(ctx, square);
      drawCircle(ctx, circle);
    }

    return () => {
      if (ctx) {
        clearCanvas(ctx, diamension.width, diamension.height);
      }
      window.removeEventListener("resize", handleResize);
      canvas?.removeEventListener("click", handleClick);
    };
  }, [pan, scale, circle, square, diamension]);

  return (
    <canvas
      width={diamension.width}
      height={diamension.height}
      ref={canvasElement}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default Canvas;
