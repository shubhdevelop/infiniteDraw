import {
  Minus,
  Square,
  Diamond,
  Circle,
  Pen,
  Image,
  ArrowRight,
  Eraser,
  Hand,
  LockKeyhole,
  MousePointer,
  LockKeyholeOpen,
} from "lucide-react";
import { useState } from "react";

export default function Toolbar() {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <>
      <div
        id="toolbar"
        style={{
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
        className=" flex mx-auto top-5 absolute  gap-2 p-1 min-w-[500px] min-h-10 rounded-md bg-white drop-shadow-md"
      >
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <Minus width={20} height={20} />
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <Square width={20} height={20} />
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <Diamond width={20} height={20} />
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <Circle width={20} height={20} />
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <Pen width={20} height={20} />
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <Image width={20} height={20} />
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <ArrowRight width={20} height={20} />
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <Eraser width={20} height={20} />
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <Hand width={20} height={20} />
        </div>
        <div
          className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center"
          onClick={() => setIsLocked((prev) => !prev)}
        >
          {isLocked ? (
            <LockKeyhole width={20} height={20} />
          ) : (
            <LockKeyholeOpen width={20} height={20} />
          )}
        </div>
        <div className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center">
          <MousePointer width={20} height={20} />
        </div>
      </div>
    </>
  );
}
