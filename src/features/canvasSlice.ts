import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { AllShape } from "../utils/shapeTypes";

export type Active =
  | "ellipse"
  | "line"
  | "hand"
  | "rect"
  | "arrow"
  | "text"
  | "image"
  | "eraser"
  | "pointer"
  | "diamond"
  | "pen";

export type ToolState = {
  active: Active;
};

export type MouseState = {
  mouseX: number;
  mouseY: number;
};

type CanvasState = {
  pan: { x: number; y: number };
  scale: number; //Percent
  locked: boolean;
  elements: AllShape[];
};

export type InitialState = {
  canvasState: CanvasState;
  toolState: ToolState;
  mouseState: MouseState;
  activeElement: AllShape;
};

const initialState: InitialState = {
  activeElement: {
    type: "rect",
    height: 500,
    width: 100,
    fillColor: "red",
    strokeColor: "",
    strokeWidth: 0,
    innerText: "",
    posX: 100,
    posY: 100,
    id: nanoid(),
    rotation: 0,
    selected: true,
  },
  canvasState: {
    pan: {
      x: 10,
      y: 10,
    },
    scale: 100, //percent
    locked: false,
    elements: [
      {
        type: "rect",
        height: 500,
        width: 100,
        fillColor: "red",
        strokeColor: "",
        strokeWidth: 0,
        innerText: "",
        posX: 100,
        posY: 100,
        id: nanoid(),
        rotation: 0,
        selected: true,
      },
    ],
  },
  toolState: {
    active: "hand",
  },
  mouseState: {
    mouseX: 0,
    mouseY: 0,
  },
};

export const canvasSlice = createSlice({
  name: "canvasState",
  initialState,
  reducers: {
    increaseScale: ({ canvasState }) => {
      if (canvasState.scale <= 595) {
        const scale = canvasState.scale + 5;
        canvasState.scale = scale;
      } else {
        canvasState.scale = 600;
      }
    },
    decreaseScale: ({ canvasState }) => {
      if (canvasState.scale >= 15) {
        const scale = canvasState.scale - 5;
        canvasState.scale = scale;
      } else {
        canvasState.scale = 10;
      }
    },
    resetScale: ({ canvasState }) => {
      canvasState.scale = 100;
    },
    toggleLock: ({ canvasState }) => {
      canvasState.locked = !canvasState.locked;
    },
    setActiveTool: ({ toolState }, action) => {
      toolState.active = action.payload;
    },
    resetCanvas: ({ canvasState }) => {
      canvasState.elements = [];
    },
    setPan: ({ canvasState }, { payload }) => {
      canvasState.pan = {
        x: payload.x,
        y: payload.y,
      };
    },
  },
});

export const {
  increaseScale,
  setActiveTool,
  decreaseScale,
  resetScale,
  toggleLock,
  setPan,
} = canvasSlice.actions;
export default canvasSlice.reducer;
