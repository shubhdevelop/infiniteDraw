type Square = {
  type: "square";
  x: number; // initial x-coordinate
  y: number; // initial y-coordinate
  size: number; // size of the square
  color: string; // color of the square
  handleSize: number; // size of the handles
  selected: boolean; // whether the square is selected
};

type Line = {
  startX: number;
  startY: number;
  innerText?: string;
  endX: number;
  endY: number;
  middlePoint: number;
  strokeColor: string;
  strokeWidth: SVGAnimatedNumberList;
};

type Circle = {
  type: "circle";
  x: number; // initial x-coordinate
  y: number; // initial y-coordinate
  radius: number; // radius of the circle
  color: string; // color of the circle
  handleSize: number; // size of the handles
  selected: boolean; // whether the circle is selected
};

type Pan = { panX: number; panY: number };
