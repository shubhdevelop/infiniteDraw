import { useSelector } from "react-redux";
import { InitialState } from "../features/canvasSlice";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpToLine,
  Code,
  Copy,
  Link,
  Minus,
  Pen,
  Square,
  Trash2,
} from "lucide-react";

import RoundedCorner from "../assets/images/round-corner.png";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export default function Properties() {
  const activeElement = useSelector(
    (state: InitialState) => state.activeElement
  );

  return (
    <div
      style={{ scrollbarWidth: "thin" }}
      className=" flex flex-col mx-auto top-24 left-8 absolute text-sm max-h-[700px] min-h-5 rounded-md bg-white drop-shadow-md overflow-y-scroll 100 text-[12px] text-gray-700 "
    >
      {!activeElement ? null : (
        <>
          <StrokeColor />
          <BackgroundColor />
          <FillStyle />
          <StrokeWidth />
          <StrokeStyle />
          <EdgeStyle />
          <ArrowHead />
          <FontSize />
          <FontFamily />
          <TextAlign />
          <Opacity />
          <Layers />
          <Actions />
        </>
      )}
    </div>
  );
}

function StrokeColor() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Stroke</p>
      <div className="w-full flex gap-2 ">
        <div className="w-7 h-7 hover:cursor-pointer bg-red-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"></div>
        <div className="w-7 h-7 hover:cursor-pointer bg-red-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"></div>
        <div className="w-7 h-7 hover:cursor-pointer bg-red-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"></div>
        <div className="w-7 h-7 hover:cursor-pointer bg-red-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"></div>
        <div className="w-[1px] bg-gray-200"></div>
        <input
          type="color"
          className="w-7 h-7 border-none p-0 border-transparent hover:cursor-pointer hover:border-solid hover:border-2 hover:border-black rounded-md"
        />
      </div>
    </div>
  );
}
function BackgroundColor() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Background</p>
      <Options>
        <div className="w-7 h-7 hover:cursor-pointer bg-red-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"></div>
        <div className="w-7 h-7 hover:cursor-pointer bg-red-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"></div>
        <div className="w-7 h-7 hover:cursor-pointer bg-red-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"></div>
        <div className="w-7 h-7 hover:cursor-pointer bg-red-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"></div>
        <div className="w-[1px] bg-gray-200"></div>
        <input
          type="color"
          className="w-7 h-7 border-none p-0 border-transparent hover:cursor-pointer hover:border-solid hover:border-2 hover:border-black rounded-md"
        />
      </Options>
    </div>
  );
}
function FillStyle() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Fill Style</p>
      <Options>
        <Option>
          <Square width={20} height={20} color="black" fill="black" />
        </Option>
        <Option>
          <Square width={20} height={20} color="black" fill="hachure" />
        </Option>
        <Option> </Option>
      </Options>
    </div>
  );
}

function StrokeWidth() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Stroke Width</p>
      <Options>
        <Option>
          <Minus width={20} height={200} color="black" />
        </Option>
        <Option>
          <Minus width={20} height={20} color={"black"} />
        </Option>
        <Option>
          <Minus width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function StrokeStyle() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Stroke Style</p>
      <Options>
        <Option>
          <Minus width={20} height={20} color="black" />
        </Option>
        <Option>
          <Minus strokeDasharray={3} width={20} height={20} color="black" />
        </Option>
        <Option>
          <Minus strokeDasharray={1} width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function EdgeStyle() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Edge Style</p>
      <Options>
        <Option>
          <img src={RoundedCorner} width={20} height={20} alt="" />
        </Option>
        <Option>
          <Square width={20} height={20} strokeWidth={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function FontSize() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Font Size</p>
      <Options>
        <Option>S</Option>
        <Option>M</Option>
        <Option>L</Option>
        <Option>XL</Option>
      </Options>
    </div>
  );
}
function FontFamily() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Font Family</p>
      <Options>
        <Option>
          <Code width={20} height={20} color="black" />
        </Option>
        <Option>
          <Pen width={20} height={20} color="black" />
        </Option>
        <Option>
          <p className="text-xl">A</p>
        </Option>
      </Options>
    </div>
  );
}
function TextAlign() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Text Align</p>
      <Options>
        <Option>
          <AlignLeft width={20} height={20} color="black" />
        </Option>
        <Option>
          <AlignCenter width={20} height={20} color="black" />
        </Option>
        <Option>
          <AlignRight width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function Opacity() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Opacity</p>
      <input className="w-full" type="range" min={0} max={100} />
    </div>
  );
}
function ArrowHead() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Arrow Head</p>
      <Options>
        <Option>
          <ArrowLeft width={20} height={20} color="black" />
        </Option>
        <Option>
          <ArrowRight width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function Layers() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Layers</p>
      <Options>
        <Option>
          <ArrowDownToLine width={20} height={20} color="black" />
        </Option>
        <Option>
          <ArrowDown width={20} height={20} color="black" />
        </Option>
        <Option>
          <ArrowUp width={20} height={20} color="black" />
        </Option>
        <Option>
          <ArrowUpToLine width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function Actions() {
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Action</p>
      <Options>
        <Option>
          <Trash2 width={20} height={20} color="black" />
        </Option>
        <Option>
          <Link width={20} height={20} color="black"></Link>
        </Option>
        <Option>
          <Copy width={20} height={20} color="black"></Copy>
        </Option>
      </Options>
    </div>
  );
}

function Options({ children }: Props) {
  return <div className="w-full flex gap-2 ">{children}</div>;
}

function Option({ children }: Props) {
  return (
    <div className="w-8 h-8 hover:cursor-pointer flex bg-gray-100 hover:bg-blue-100 hover:border-solid hover:border-[1px] hover:border-black rounded-md justify-center items-center">
      {children}
    </div>
  );
}
