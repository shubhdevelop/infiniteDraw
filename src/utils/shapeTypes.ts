export interface Shape {
  id: string; //nanoid
  type: "rect" | "line" | "ellipse" | "diamond" | "arrow" | "image" | "pen";
  posX: number;
  posY: number;
  strokeColor: string;
  strokeWidth: number;
  selected: boolean;
  rotation: number;
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
  fillColor: string;
  innerText: string;
}

export interface Rect extends Polygon {
  type: "rect";
  height: number;
  width: number;
}

export interface Ellipse extends Polygon {
  type: "ellipse";
  radius: number; // radius of the circle'
}

export interface Diamond extends Polygon {
  type: "diamond";
  radius: number; // radius of the circle
}

export interface Line extends Shape {
  type: "line" | "arrow";
  endX: number;
  endY: number;
  middlePoint: number;
  strokeWidth: number;
}

export interface Arrow extends Line {
  type: "arrow";
  middleText: String;
}

export interface Image extends Shape {
  type: "image";
  src: string;
}

export interface Pen extends Shape {
  type: "pen";
  points: { x: number; y: number }[];
}

export type AllShape = Arrow | Line | Rect | Ellipse | Diamond | Image | Pen;

// export class Circle {
//   isMouseInsideSelectableArea(mouseX: number, mouseY: number): boolean {
//     var distance = Math.sqrt(
//       Math.pow(mouseX - this.posX, 2) + Math.pow(mouseY - this.posY, 2)
//     );
//     return distance <= this.radius;
//   }
// }

// export class Rectangle {
//   isMouseInsideSelectableArea(mouseX: number, mouseY: number): boolean {
//     return (
//       mouseX >= this.posX &&
//       mouseX <= this.posX + this.width &&
//       mouseY >= this.posY &&
//       mouseY <= this.posY + this.height
//     );
//   }
// }

export type AllProperties = [
  StrokeColor,
  Background,
  FillStyle,
  StrokeWidth,
  StrokeStyle,
  EdgeStyle,
  FontSize,
  FontFamily,
  TextAlign,
  Opacity
];

export type StrokeColor =
  | string
  | "black"
  | "red"
  | "green"
  | "blue"
  | "orange";
export type Background =
  | string
  | "transparent"
  | "red"
  | "green"
  | "blue"
  | "orange";
export type FillStyle = "solid" | "hachure" | "cross-hatch";
export type StrokeWidth = "thin" | "bold" | "extraBold";
export type StrokeStyle = "solid" | "dashed" | "dotted";
export type EdgeStyle = "sharp" | "rounded";
export type FontSize = "small" | "medium" | "large" | "extraLarge";
export type FontFamily = "normal" | "paint" | "code";
export type TextAlign = "left" | "middle" | "rijght";
export type Opacity = number;
