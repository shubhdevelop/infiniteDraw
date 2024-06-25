import { nanoid } from "nanoid";
import { Active } from "../types/stateTypes";
import { calculateAngle, calculateDistance } from "../utils/utils";
import { GlobalProperties } from "../types/propertiesTypes";

export const shapeBuilder = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  width: number,
  height: number,
  activeTool: Active,
  globalProperties: GlobalProperties
) => {
  if (activeTool == "rect") {
    let shape = {
      type: activeTool,
      height: height,
      width: width,
      fillColor: globalProperties.fillColor,
      strokeColor: globalProperties.strokeColor,
      strokeWidth: globalProperties.strokeWidth,
      innerText: "",
      posX: startX,
      posY: startY,
      id: nanoid(),
      rotation: 0,
      edgeStyle: globalProperties.edgeStyle,
      fontFamily: globalProperties.fontFamily,
      fontSize: globalProperties.fontSize,
      textAlign: globalProperties.textAlign,
      fillStyle: globalProperties.fillStyle,
      opacity: globalProperties.opacity,
      strokeStyle: globalProperties.strokeStyle,
    };
    return shape;
  }
  if (activeTool == "ellipse") {
    let shape = {
      type: activeTool,
      radiusX: width / 2,
      radiusY: height / 2,
      fillColor: globalProperties.fillColor,
      strokeColor: globalProperties.strokeColor,
      strokeWidth: globalProperties.strokeWidth,
      innerText: "",
      posX: startX + width / 2,
      posY: startY + height / 2,
      id: nanoid(),
      rotation: 0,
      edgeStyle: globalProperties.edgeStyle,
      fontFamily: globalProperties.fontFamily,
      fontSize: globalProperties.fontSize,
      textAlign: globalProperties.textAlign,
      fillStyle: globalProperties.fillStyle,
      opacity: globalProperties.opacity,
      strokeStyle: globalProperties.strokeStyle,
    };
    return shape;
  }
  if (activeTool == "line") {
    let shape = {
      type: "line",
      strokeColor: globalProperties.strokeColor,
      strokeWidth: globalProperties.strokeWidth,
      strokeStyle: globalProperties.strokeStyle,
      posX: startX,
      posY: startY,
      length: calculateDistance(startX, startY, endX, endY),
      id: nanoid(),
      rotation: calculateAngle(startX, startY, endX, endY),
      opacity: 100,
      middlePoint: 50,
    };
    alert(shape.rotation);

    return shape;
  }
};
