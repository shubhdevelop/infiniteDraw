import { createSlice } from "@reduxjs/toolkit";

type ToolState = {
  active:
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
};

type CanvasState = {
  pan: { x: number; y: number };
  scale: number; //Percent
  locked: boolean;
  elements: {}[];
};

export type InitialState = {
  canvasState: CanvasState;
  toolState: ToolState;
};

const initialState: InitialState = {
  canvasState: {
    pan: {
      x: 10,
      y: 10,
    },
    scale: 100, //percent
    locked: false,
    elements: [{}],
  },
  toolState: {
    active: "hand",
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
  },
});

export const {
  increaseScale,
  setActiveTool,
  decreaseScale,
  resetScale,
  toggleLock,
} = canvasSlice.actions;
export default canvasSlice.reducer;
