import { useEffect, useRef } from "react";
import { clearCanvas } from "../utils/canvas";
import { useDispatch, useSelector } from "react-redux";
import {
  InitialState,
  addElement,
  // clearActiveElement,
  clearHoverElement,
  dummyShapes,
  // setActiveElement,
  setActiveTool,
  setElementPosition,
  setHoverElement,
  setHoverElementActive,
} from "../features/canvasSlice";
import { updateCanvas } from "../utils/renderer";
import { drawHandler } from "../elements/drawHandler";
import { isPointInsideRotatedEllipse } from "../elements/ellipse";
import { isMouseInsideRect } from "../elements/rect";
import { isMouseInsideText } from "../elements/text";
import { isPointOnLine } from "../elements/line";

const Canvas = () => {
  const { scale, pan } = useSelector(
    (state: InitialState) => state.canvasState
  );

  const activeElement = useSelector(
    (state: InitialState) => state.activeElement
  );
  const dispatch = useDispatch();
  const hoverElement = useSelector((state: InitialState) => state.hoverElement);
  const allElements = useSelector((state: InitialState) => state.allElements);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const canvas = canvasElement!.current;
  const ctx = canvas?.getContext("2d");
  const activeTool = useSelector(
    (state: InitialState) => state.toolState.active
  );

  const handleClick = () => {
    dispatch(setHoverElementActive());
  };

  const handleMoveElement = (event: MouseEvent) => {
    console.log("moving");

    if (
      event.buttons === 1 &&
      activeElement.length > 0 &&
      canvas &&
      activeTool === "pointer"
    ) {
      var mouseX =
        (event.clientX - canvas.getBoundingClientRect().left - pan.x) /
        (scale / 100);
      var mouseY =
        (event.clientY - canvas.getBoundingClientRect().top - pan.y) /
        (scale / 100);

      dispatch(
        setElementPosition({
          posX: mouseX,
          posY: mouseY,
        })
      );
    }
  };

  const handleHoverOverElement = (event: MouseEvent) => {
    if (canvas && ctx) {
      // Check if mouse click is inside the square
      dispatch(clearHoverElement());
      allElements.forEach((shape) => {
        if (shape.type == "rect") {
          if (isMouseInsideRect(event, canvas, shape, scale / 100, pan)) {
            console.log(shape.id);
            dispatch(setHoverElement({ id: shape.id }));
          }
        }
        if (shape.type == "ellipse") {
          if (
            isPointInsideRotatedEllipse(event, canvas, scale / 100, pan, shape)
          ) {
            dispatch(setHoverElement({ id: shape.id }));
          }
        }
        if (shape.type == "text") {
          if (isMouseInsideText(event, canvas, ctx, shape, scale / 100, pan)) {
            dispatch(setHoverElement({ id: shape.id }));
          }
        }
        if (shape.type == "line") {
          if (isPointOnLine(event, canvas, scale / 100, pan, shape)) {
            dispatch(setHoverElement({ id: shape.id }));
          }
        }
      });
    }
  };

  //Loading initial data;
  useEffect(() => {
    dispatch(addElement(dummyShapes));
    dispatch(setActiveTool("pointer"));
  }, []);

  useEffect(() => {
    if (hoverElement.length > 0 && activeTool == "pointer" && canvas) {
      canvas.style.cursor = "move";
      console.log("this ran");
    }
    if (hoverElement.length == 0 && canvas && activeTool == "arrow") {
      canvas.style.cursor = "pointer";
    }
  }, [hoverElement]);

  //Draw Handlers on Active Elements
  useEffect(() => {
    if (activeElement.length > 0 && ctx) {
      const element = activeElement[0];
      drawHandler(ctx, element);
    }
  }, [activeElement, allElements]);

  //Scaling Panning Drawing and moving elements on the Canvas
  useEffect(() => {
    if (canvas && ctx) {
      // the Scale and pan
      if (ctx) {
        ctx.setTransform(scale / 100, 0, 0, scale / 100, pan.x, pan.y);
        ctx.save();
      }
    }
    canvas?.addEventListener("mousemove", handleHoverOverElement);
    canvas?.addEventListener("mousedown", handleClick);
    canvas?.addEventListener("mousemove", handleMoveElement);

    //Draws All the shapes
    if (ctx) {
      updateCanvas(ctx, allElements);
    }

    return () => {
      if (ctx) {
        clearCanvas(ctx, ctx.canvas.width, ctx.canvas.height);
      }
      canvas?.removeEventListener("mousedown", handleClick);
      canvas?.removeEventListener("mousemove", handleMoveElement);
      canvas?.removeEventListener("mousemove", handleHoverOverElement);
    };
  }, [pan, scale, allElements, activeElement]);

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasElement}
    />
  );
};

export default Canvas;
