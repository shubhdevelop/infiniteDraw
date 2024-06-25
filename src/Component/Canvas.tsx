import { useEffect, useRef, useState } from "react";
import { clearCanvas } from "../utils/canvas";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  addNewElement,
  clearHoverElement,
  decreaseScale,
  dummyShapes,
  increaseScale,
  removeElement,
  setActiveTool,
  setElementPosition,
  setHoverElement,
  setHoverElementActive,
  setPan,
} from "../features/canvasSlice";
import { updateCanvas } from "../utils/renderer";
import { drawHandler } from "../elements/drawHandler";
import { isPointInsideRotatedEllipse } from "../elements/ellipse";
import { isMouseInsideRect } from "../elements/rect";
import { addTextToCanvas, isMouseInsideText } from "../elements/text";
import { isPointOnLine } from "../elements/line";
import { isMouseInsideImage } from "../elements/image";
import { InitialState } from "../types/stateTypes";
import { shapeBuilder } from "../elements/shapeBuilder";

type Cord = {
  x: number;
  y: number;
};

const Canvas = () => {
  const { scale, pan } = useSelector(
    (state: InitialState) => state.canvasState
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startCord, setStartCord] = useState<Cord | null>({ x: 0, y: 0 });
  const [endCord, setEndCord] = useState<Cord | null>({ x: 0, y: 0 });
  const activeElement = useSelector(
    (state: InitialState) => state.activeElement
  );
  const dispatch = useDispatch();
  const hoverElement = useSelector((state: InitialState) => state.hoverElement);
  const allElements = useSelector((state: InitialState) => state.allElements);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const canvas = canvasElement!.current;

  //given alpha option improves performance
  const ctx = canvas?.getContext("2d");
  const activeTool = useSelector(
    (state: InitialState) => state.toolState.active
  );
  const globalProperties = useSelector(
    (state: InitialState) => state.globalProperties
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
        if (shape.type == "image") {
          if (isMouseInsideImage(event, canvas, scale / 100, pan, shape)) {
            console.log(shape.id);

            dispatch(setHoverElement({ id: shape.id }));
          }
        }
      });
    }
  };

  const handleDoubleclick = (event: MouseEvent) => {
    if (canvas) {
      addTextToCanvas(canvas, event, pan, scale, dispatch);
    }
  };

  const handlePanAndZoom = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.ctrlKey) {
      if (event.deltaY < 0) {
        dispatch(decreaseScale());
      }
      if (event.deltaY > 0) {
        dispatch(increaseScale());
      }
    } else {
      dispatch(setPan({ x: pan.x - event.deltaX, y: pan.y - event.deltaY }));
    }
  };

  const handleShortcuts = (event: KeyboardEvent) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      dispatch(removeElement());
    }
  };
  //Loading initial data;
  useEffect(() => {
    dispatch(addElement(dummyShapes));
    dispatch(setActiveTool("pointer"));
  }, []);

  //Draw Handlers on Active Elements

  useEffect(() => {
    if (hoverElement.length > 0 && activeTool == "pointer" && canvas) {
      canvas.style.cursor = "move";
      console.log("this ran");
    }
    if (hoverElement.length == 0 && canvas && activeTool == "arrow") {
      canvas.style.cursor = "pointer";
    }
  }, [hoverElement]);
  useEffect(() => {});
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
    canvas?.addEventListener("dblclick", handleDoubleclick);
    canvas?.addEventListener("wheel", handlePanAndZoom);
    //Draws All the shapes
    if (ctx) {
      console.log("before rendering", allElements);

      updateCanvas(ctx, allElements);
    }

    return () => {
      if (ctx) {
        clearCanvas(ctx, ctx.canvas.width, ctx.canvas.height);
      }
      canvas?.removeEventListener("mousedown", handleClick);
      canvas?.removeEventListener("mousemove", handleMoveElement);
      canvas?.removeEventListener("mousemove", handleHoverOverElement);
      canvas?.removeEventListener("dblclick", handleDoubleclick);
      canvas?.removeEventListener("wheel", handlePanAndZoom);
      canvas?.removeEventListener("keydown", handleShortcuts);
    };
  }, [pan, scale, allElements, activeElement]);

  //drawing shapes with mouse
  useEffect(() => {
    let isDrawableTool = ["rect", "ellipse", "line"].includes(activeTool);
    function handleMouseDown(event: MouseEvent): void {
      setIsMouseDown(true);
      if (canvas && isDrawableTool) {
        var mouseX =
          (event.clientX - canvas.getBoundingClientRect().left - pan.x) /
          (scale / 100);
        var mouseY =
          (event.clientY - canvas.getBoundingClientRect().top - pan.y) /
          (scale / 100);
        setStartCord({ x: mouseX, y: mouseY });
      }
    }

    function handleMouseMove(event: MouseEvent): void {
      if (isMouseDown && canvas && isDrawableTool) {
        var mouseX =
          (event.clientX - canvas.getBoundingClientRect().left - pan.x) /
          (scale / 100);
        var mouseY =
          (event.clientY - canvas.getBoundingClientRect().top - pan.y) /
          (scale / 100);

        setEndCord({ x: mouseX, y: mouseY });
      }
    }

    function handleMouseUp(event: MouseEvent): void {
      if (startCord != null && endCord != null) {
        let xComponent = endCord.x - startCord.x;
        let yComponent = endCord.y - startCord.y;

        if (isMouseDown && isDrawableTool) {
          if (event.shiftKey) {
            let min = Math.min(xComponent, yComponent);
            const element = shapeBuilder(
              startCord.x,
              startCord.y,
              endCord.x,
              endCord.y,
              min,
              min,
              activeTool,
              globalProperties
            );
            dispatch(addNewElement(element));
            setIsMouseDown(false);
          } else {
            const element = shapeBuilder(
              startCord.x,
              startCord.y,
              endCord.x,
              endCord.y,
              xComponent,
              yComponent,
              activeTool,
              globalProperties
            );
            dispatch(addNewElement(element));
            setIsMouseDown(false);
            setStartCord(null);
            setEndCord(null);
          }
        }
      }
    }

    canvas?.addEventListener("mousedown", handleMouseDown);
    canvas?.addEventListener("mousemove", handleMouseMove);
    canvas?.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas?.removeEventListener("mousedown", handleMouseDown);
      canvas?.removeEventListener("mousemove", handleMouseMove);
      canvas?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeTool, isMouseDown, startCord, endCord]);

  useEffect(() => {
    if (activeElement.length > 0 && ctx) {
      const element = activeElement[0];
      drawHandler(ctx, element);
    }
  }, [activeElement, allElements]);
  return (
    <>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasElement}
      />
    </>
  );
};

export default Canvas;
