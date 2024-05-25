import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import {
  AllShape,
  AnyIndividualProperty,
  Background,
  EdgeStyle,
  FillStyle,
  FontFamily,
  FontSize,
  Opacity,
  StrokeColor,
  StrokeStyle,
  StrokeWidth,
  TextAlign,
} from "../utils/shapeTypes";
import {
  increaseS,
  decreaseS,
  resetS,
  toggleL,
  resetP,
  setP,
} from "./reducers/canvasState.r";

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
  | "pen"
  | "";

export type ToolState = {
  active: Active;
};

export type MouseState = {
  mouseX: number;
  mouseY: number;
};

export type Pan = { x: number; y: number };
export type CanvasState = {
  pan: Pan;
  scale: number; //Percent
  locked: boolean;
};

export type GlobalProperties = {
  fillStyle: FillStyle;
  strokeWidth: StrokeWidth;
  strokeStyle: StrokeStyle;
  strokeColor: StrokeColor;
  backgroundColor: Background;
  edgeStyle: EdgeStyle;
  fontSize: FontSize;
  fontFamily: FontFamily;
  textAlign: TextAlign;
  opacity: Opacity;
  arrowHeadLeft: "arrow";
  arrowHeadRight: "arrow";
};

export type InitialState = {
  canvasState: CanvasState;
  toolState: ToolState;
  mouseState: MouseState;
  activeElement: AllShape[];
  globalProperties: GlobalProperties;
  allElements: AllShape[];
  hoverElement: AllShape[];
};

const initialState: InitialState = {
  hoverElement: [],
  activeElement: [],
  canvasState: {
    pan: {
      x: 100,
      y: 90,
    },
    scale: 100, //percent
    locked: false,
  },
  allElements: [],
  toolState: {
    active: "",
  },
  mouseState: {
    mouseX: 0,
    mouseY: 0,
  },
  globalProperties: {
    fillStyle: "solid",
    strokeWidth: 1,
    strokeStyle: "solid",
    strokeColor: "black",
    backgroundColor: "transparent",
    edgeStyle: "sharp",
    fontSize: 24,
    fontFamily: "code",
    textAlign: "center",
    opacity: 10,
    arrowHeadLeft: "arrow",
    arrowHeadRight: "arrow",
  },
};

export const canvasSlice = createSlice({
  name: "canvasState",
  initialState,
  reducers: {
    increaseScale: increaseS,
    decreaseScale: decreaseS,
    resetScale: resetS,
    toggleLock: toggleL,
    resetPan: resetP,
    setPan: setP,
    setActiveTool: ({ toolState }, action) => {
      toolState.active = action.payload;
    },
    resetCanvas: (state) => {
      state.allElements = [];
    },
    setActiveElement: (state, action) => {
      state.activeElement = state.allElements.filter((element) => {
        return element.id == action.payload.id;
      });
    },
    setHoverElement: (state, action) => {
      state.hoverElement = state.allElements.filter((element) => {
        return element.id == action.payload.id;
      });
    },
    clearHoverElement: (state) => {
      state.hoverElement = [];
    },
    clearActiveElement: (state) => {
      state.activeElement = [];
    },
    changeActiveElementProperties(
      state,
      { payload }: PayloadAction<AnyIndividualProperty>
    ) {
      const newAllElement = state.allElements.map((element) => {
        return element.id == state.activeElement[0].id
          ? { ...element, ...payload }
          : element;
      });

      state.allElements = newAllElement;
    },
    addElement(state, action) {
      state.allElements = action.payload;
    },
    setElementPosition(
      state,
      { payload }: PayloadAction<{ posX: number; posY: number }>
    ) {
      let newCords: {
        posX: number;
        posY: number;
        endX?: number;
        endY?: number;
      } = {
        posX: 0,
        posY: 0,
      };
      if (state.activeElement[0].type == "rect") {
        newCords.posX = payload.posX - state.activeElement[0].width / 2;
        newCords.posY = payload.posY - state.activeElement[0].height / 2;
      }
      if (
        state.activeElement[0].type == "ellipse" ||
        state.activeElement[0].type == "text"
      ) {
        newCords = { ...payload };
      }
      if (state.activeElement[0].type == "line") {
        newCords = {
          ...payload,
        };
      }
      // if (state.activeElement[0].type == "text") {
      //   newCords.posX = payload.posX;
      //   newCords.posY = payload.posY - state.activeElement[0].fontSize;
      // }

      const newAllElement = state.allElements.map((element) => {
        return element.id == state.activeElement[0].id
          ? {
              ...element,
              ...newCords,
            }
          : element;
      });

      state.activeElement[0] = { ...state.activeElement[0], ...newCords };
      state.allElements = newAllElement;
    },
    setHoverElementActive(state) {
      if (state.hoverElement.length > 0) {
        state.activeElement = state.hoverElement;
      } else {
        state.activeElement = [];
      }
    },
  },
});

export const {
  setActiveTool,
  setActiveElement,
  clearActiveElement,
  increaseScale,
  decreaseScale,
  resetScale,
  toggleLock,
  resetPan,
  setPan,
  changeActiveElementProperties,
  addElement,
  setElementPosition,
  setHoverElement,
  clearHoverElement,
  setHoverElementActive,
} = canvasSlice.actions;
export default canvasSlice.reducer;

export const dummyShapes: AllShape[] = [
  {
    type: "rect",
    height: 100,
    width: 100,
    fillColor: "#bbf7d0",
    strokeColor: "blue",
    strokeWidth: 3,
    innerText: "kaise ho!!",
    posX: 100,
    posY: 100,
    id: nanoid(),
    rotation: 0,
    selected: true,
    edgeStyle: "rounded",
    fontFamily: "code",
    fontSize: 16,
    textAlign: "center",
    fillStyle: "solid",
    opacity: 100,
    strokeStyle: "dashed",
  },
  {
    type: "rect",
    height: 300,
    width: 100,
    fillColor: "#fecaca",
    strokeColor: "blue",
    strokeWidth: 3,
    innerText: "",
    posX: 300,
    posY: 100,
    id: nanoid(),
    rotation: 0,
    selected: true,
    edgeStyle: "sharp",
    fontFamily: "code",
    fontSize: 12,
    textAlign: "center",
    fillStyle: "solid",
    opacity: 100,
    strokeStyle: "dotted",
  },
  {
    type: "ellipse",
    radiusX: 50,
    radiusY: 50,
    fillColor: "#bfdbfe",
    strokeColor: "blue",
    strokeWidth: 3,
    innerText: "This is an ellipse",
    posX: 300,
    posY: 500,
    id: nanoid(),
    rotation: 0,
    selected: true,
    edgeStyle: "sharp",
    fontFamily: "code",
    fontSize: 12,
    textAlign: "center",
    fillStyle: "solid",
    opacity: 100,
    strokeStyle: "solid",
  },
  {
    type: "text",
    strokeColor: "blue",
    strokeWidth: 3,
    innerText: "This is an text Sample",
    posX: 500,
    posY: 400,
    id: nanoid(),
    rotation: 100,
    selected: true,
    fontFamily: "code",
    fontSize: 12,
    textAlign: "center",
    opacity: 100,
  },
  {
    type: "line",
    strokeColor: "blue",
    strokeWidth: 3,
    strokeStyle: "dashed",
    posX: 350,
    posY: 350,
    length: 100,
    id: nanoid(),
    rotation: 100,
    selected: true,
    opacity: 100,
    middlePoint: 50,
  },
];
