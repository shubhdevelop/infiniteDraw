import { useEffect, useRef } from "react";
import { clearCanvas } from "../utils/canvas";
import { useSelector } from "react-redux";
import { InitialState } from "../features/canvasSlice";
import { updateCanvas } from "../utils/paint";

const Canvas = () => {
  const { scale, pan } = useSelector(
    (state: InitialState) => state.canvasState
  );

  const { elements } = useSelector((state: InitialState) => state.canvasState);
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
    if (canvas && ctx) {
      // the Scale and pan
      if (ctx) {
        function scaleAndPan() {
          ctx?.setTransform(scale / 100, 0, 0, scale / 100, pan.x, pan.y);
          ctx?.save();
        }
        scaleAndPan();
        requestAnimationFrame(scaleAndPan);
      }

      //Draws All the shapes
      if (ctx) {
        updateCanvas(ctx, elements);
      }
    }
    return () => {
      if (ctx) {
        clearCanvas(ctx, window.innerWidth, window.innerHeight);
      }
      // canvas?.removeEventListener("click", handleClick);
    };
  }, [pan, scale, elements]);

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasElement}
    />
  );
};

export default Canvas;
