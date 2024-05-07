import { nanoid } from "nanoid";
import { drawHandler } from "./drawHandler";

export interface Shape {
  id: string; //nanoid
  type: "rect" | "line" | "ellipse" | "diamond" | "arrow" | "line";
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

interface Polygon extends Shape {
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
  radius: number; // radius of the circle
}

interface Line extends Shape {
  type: "line" | "arrow";
  endX: number;
  endY: number;
  middlePoint: number;
  strokeWidth: number;
}

interface Arrow extends Line {
  type: "arrow";
  middleText: String;
}

export type AllShape = Arrow | Line | Rect | Ellipse;

export class Circle implements Ellipse {
  type: "ellipse";
  posX: number;
  posY: number;
  strokeColor: string;
  strokeWidth: number;
  selected: boolean;
  rotation: number;
  radius: number;
  innerText: string;
  fillColor: string;
  id: string;
  constructor(
    posX: number,
    posY: number,
    radius: number,
    strokeColor: string,
    strokeWidth: number,
    selected: boolean,
    rotation: number,
    innerText: string,
    fillColor: string
  ) {
    this.type = "ellipse";
    this.posX = posX;
    this.posY = posY;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.selected = selected;
    this.rotation = rotation;
    this.radius = radius;
    this.innerText = innerText;
    this.fillColor = fillColor;
    this.id = nanoid();
  }

  isMouseInsideSelectableArea(mouseX: number, mouseY: number): boolean {
    var distance = Math.sqrt(
      Math.pow(mouseX - this.posX, 2) + Math.pow(mouseY - this.posY, 2)
    );
    return distance <= this.radius;
  }
}

export class Rectangle implements Rect {
  type: "rect";
  posX: number;
  posY: number;
  strokeColor: string;
  strokeWidth: number;
  selected: boolean;
  rotation: number;
  innerText: string;
  fillColor: string;
  height: number;
  width: number;
  id: string;
  constructor(
    posX: number,
    posY: number,
    height: number,
    width: number,
    strokeColor: string,
    strokeWidth: number,
    selected: boolean,
    rotation: number,
    innerText: string,
    fillColor: string
  ) {
    this.type = "rect";
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.selected = selected;
    this.rotation = rotation;
    this.innerText = innerText;
    this.fillColor = fillColor;
    this.id = nanoid();
  }

  isMouseInsideSelectableArea(mouseX: number, mouseY: number): boolean {
    return (
      mouseX >= this.posX &&
      mouseX <= this.posX + this.width &&
      mouseY >= this.posY &&
      mouseY <= this.posY + this.height
    );
  }
}
