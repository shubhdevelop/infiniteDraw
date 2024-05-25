export interface Shape {
  id: string; //nanoid
  type:
    | "rect"
    | "line"
    | "ellipse"
    | "diamond"
    | "arrow"
    | "image"
    | "pen"
    | "text";
  posX: number;
  posY: number;
  strokeColor: string;
  strokeWidth: StrokeWidth;

  selected: boolean;
  rotation: number;
  opacity: Opacity;
  getHandleBar?(): {
    posX: number;
    posY: number;
    width: number;
    height: number;
  };
  draw?(ctx: CanvasRenderingContext2D): void;
  isMouseInsideSelectableArea?(mouseX: number, mouseY: number): boolean;
}

export interface Polygon extends Shape {
  fillColor: Background;
  innerText: string;
  edgeStyle: EdgeStyle;
  fontSize: FontSize;
  fontFamily: FontFamily;
  textAlign: TextAlign;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
}

export interface Rect extends Polygon {
  type: "rect";
  height: number;
  width: number;
}

export interface Ellipse extends Polygon {
  type: "ellipse";
  radiusX: number;
  radiusY: number;
}

export interface Diamond extends Polygon {
  type: "diamond";
  radius: number; // radius of the circle
  edgeStyle: EdgeStyle;
}

export interface Line extends Shape {
  type: "line";
  length: number;
  middlePoint: number;
  strokeStyle: StrokeStyle;
}

export interface Arrow extends Shape {
  type: "arrow";
  endX: number;
  endY: number;
  middlePoint: number;
  innerText: string;
  arrowHeadRight: ArrowHeadRight;
  arrowHeadLeft: ArrowHeadLeft;
  fontSize: FontSize;
  fontFamily: FontFamily;
}

export interface Image extends Shape {
  type: "image";
  src: string;
}

export interface Pen extends Shape {
  type: "pen";
  points: { x: number; y: number }[];
}

export interface Text extends Shape {
  textAlign: TextAlign;
  fontSize: FontSize;
  fontFamily: FontFamily;
  type: "text";
  innerText: string;
}

export type AllShape =
  | Arrow
  | Line
  | Rect
  | Ellipse
  | Diamond
  | Image
  | Pen
  | Text;

export type AnyIndividualProperty =
  | { fillColor: Background }
  | { fillStyle: FillStyle }
  | { strokeColor: StrokeColor }
  | { strokeWidth: StrokeWidth }
  | { strokeStyle: StrokeStyle }
  | { edgeStyle: EdgeStyle }
  | { fontSize: FontSize }
  | { fontFamily: FontFamily }
  | { textAlign: TextAlign }
  | { opacity: Opacity }
  | { arrowHeadRight: ArrowHeadRight }
  | { arrowHeadLeft: ArrowHeadLeft };

export type StrokeColor = "black" | "red" | "purple" | "blue" | "orange";
export type Background =
  | "transparent"
  | "#bbf7d0" //green
  | "#fef08a" //yellow
  | "#bfdbfe" //blue
  | "#fecaca"; //pink
export type FillStyle = "solid" | "hachure";
export type StrokeWidth = 1 | 3 | 6;
export type StrokeStyle = "solid" | "dashed" | "dotted";
export type EdgeStyle = "sharp" | "rounded";
export type FontSize = 12 | 16 | 20 | 24;
export type FontFamily = "normal" | "paint" | "code";
export type TextAlign = "left" | "center" | "right";
export type Opacity = number;
export type ArrowHeadRight = "";
export type ArrowHeadLeft = "";
