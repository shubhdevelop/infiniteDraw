import { PayloadAction } from "@reduxjs/toolkit";
import { AllShape } from "../../utils/shapeTypes";
import {
  ToolState,
  MouseState,
  GlobalProperties,
  CanvasState,
  Pan,
} from "../canvasSlice";

export type InitialState = {
  canvasState: CanvasState;
  toolState: ToolState;
  mouseState: MouseState;
  activeElement: AllShape[];
  globalProperties: GlobalProperties;
  allElements: AllShape[];
};

export function increaseS({ canvasState }: InitialState) {
  if (canvasState.scale <= 595) {
    const scale = canvasState.scale + 5;
    canvasState.scale = scale;
  } else {
    canvasState.scale = 600;
  }
}

export function decreaseS({ canvasState }: InitialState) {
  if (canvasState.scale >= 15) {
    const scale = canvasState.scale - 5;
    canvasState.scale = scale;
  } else {
    canvasState.scale = 10;
  }
}

export function resetS({ canvasState }: InitialState) {
  canvasState.scale = 100;
}

export function toggleL({ canvasState }: InitialState) {
  canvasState.locked = !canvasState.locked;
}

export function resetP() {}

export function setP(
  { canvasState }: InitialState,
  action: PayloadAction<Pan>
) {
  canvasState.pan = {
    x: action.payload.x,
    y: action.payload.y,
  };
}
