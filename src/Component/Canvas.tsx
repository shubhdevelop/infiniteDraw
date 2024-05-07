import { useEffect, useRef, useState } from "react";
import { clearCanvas } from "../utils/canvas";
import { AllShape, Rect } from "../utils/shapeTypes";
import { useSelector } from "react-redux";
import { InitialState } from "../features/canvasSlice";
import { nanoid } from "nanoid";
import { drawRect } from "../utils/paint";

const square: Rect = {
  type: "rect",
  height: 100,
  width: 100,
  fillColor: "red",
  strokeColor: "",
  strokeWidth: 0,
  innerText: "",
  posX: 10,
  posY: 10,
  id: nanoid(),
  rotation: 0,
  selected: false,
};

const Canvas = () => {
  const { scale, pan } = useSelector(
    (state: InitialState) => state.canvasState
  );

  const [shapes] = useState<AllShape[]>([square]);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const canvas = canvasElement!.current;
  const ctx = canvas?.getContext("2d");

  // const handleClick = (event: MouseEvent) => {
  //   if (canvas && ctx) {
  //     var mouseX =
  //       (event.clientX - canvas.getBoundingClientRect().left - pan.x) / scale;
  //     var mouseY =
  //       (event.clientY - canvas.getBoundingClientRect().top - pan.y) / scale;

  //     // Check if mouse click is inside the square
  //     shapes.forEach((shape) => {
  //       if (shape.type == "rect") {
  //         if (shape.isMouseInsideSelectableArea(mouseX, mouseY)) {
  //           // updateCanvas();
  //           console.log("old", shape);

  //           const newShape = Object.create(shape);
  //           newShape.selected = !shape.selected;
  //           console.log("new", newShape);

  //           setShapes((prev) =>
  //             prev.map((obj) => (obj.id === shape.id ? newShape : obj))
  //           );
  //         }
  //       }
  //       if (shape.type == "ellipse") {
  //         if (shape.isMouseInsideSelectableArea(mouseX, mouseY)) {
  //           console.log("old", shape);

  //           const newShape = Object.create(shape);
  //           newShape.selected = !shape.selected;
  //           console.log("new", newShape);

  //           setShapes((prev) =>
  //             prev.map((obj) => (obj.id === shape.id ? newShape : obj))
  //           );
  //         }
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    // the Scale and pan
    if (ctx) {
      ctx.setTransform(scale / 100, 0, 0, scale / 100, pan.x, pan.y);
    }

    //Draws All the shapes
    if (ctx) {
      shapes.forEach((shape) => {
        switch (shape.type) {
          case "rect":
            drawRect(ctx, shape);
            break;
          default:
            break;
        }
      });
    }
    //handle what happens when mouse is clicked on canvas
    // if (canvas) {
    //   canvas.addEventListener("click", handleClick);
    // }

    return () => {
      if (ctx) {
        clearCanvas(ctx, window.innerWidth, window.innerHeight);
      }
      // canvas?.removeEventListener("click", handleClick);
    };
  }, [pan, scale, shapes]);

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasElement}
    />
  );
};

export default Canvas;
