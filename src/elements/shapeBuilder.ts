import { nanoid } from "nanoid";
import { Active } from "../types/stateTypes";
import { calculateAngle, calculateDistance, toPositive } from "../utils/utils";
import { GlobalProperties } from "../types/propertiesTypes";

export const shapeBuilder = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  xComponent: number,
  yComponent: number,
  activeTool: Active,
  globalProperties: GlobalProperties
) => {
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

    return shape;
  }

  let width, height;
  console.log("xComponent :", xComponent, "yComponent:", yComponent);

  //Decide quadrant in which endPos exist starting being the origin
  if (xComponent >= 0 && yComponent >= 0) {
    width = xComponent;
    height = yComponent;
    startX = startX;
    startY = startY;
    endX = endX;
    endY = endY;
  } else if (xComponent <= 0 && yComponent <= 0) {
    let tempStartX = startX;
    let tempStartY = startY;
    width = -xComponent;
    height = -yComponent;
    startX = endX;
    startY = endY;
    endX = tempStartX;
    endY = tempStartY;
  } else if (xComponent >= 0 && yComponent <= 0) {
    width = xComponent;
    height = -yComponent;
    startX = startX;
    startY = startY + yComponent;
    endX = endX;
    endY = endY + yComponent;
  } else if (xComponent <= 0 && yComponent >= 0) {
    width = -xComponent;
    height = yComponent;
    startX = startX + xComponent;
    startY = startY;
    endX = endX - xComponent;
    endY = endY;
  }

  if (width && height) {
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
        radiusX: toPositive(width / 2),
        radiusY: toPositive(height / 2),
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
  }
};
