import {
  FillStyle,
  StrokeWidth,
  StrokeStyle,
  StrokeColor,
  Background,
  EdgeStyle,
  FontSize,
  FontFamily,
  TextAlign,
  Opacity,
} from "./propertiesTypes";
import { AllShape } from "./shapeTypes";

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
