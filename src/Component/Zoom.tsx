import { Plus, Minus } from "lucide-react";
import { useState } from "react";

function Zoom() {
  const [scaleFactor, setScaleFactor] = useState(10);

  return (
    <div
      id="zoom"
      style={{
        left: "100px",
        top: "93%",
        transform: "translate(-50%, 0)",
      }}
      className=" flex mx-auto top-5 absolute  gap-2  min-w-[70px] min-h-5 rounded-md bg-white drop-shadow-md"
    >
      <div
        className=" w-full h-full p-2 hover:bg-blue-100 hover:cursor-pointer rounded-l-lg flex justify-center items-center"
        onClick={() => setScaleFactor((prev) => prev + 10)}
      >
        <Plus />
      </div>
      <div className="w-full h-full p-2 hover:cursor-pointer rounded-lg flex justify-center items-center select-none    ">
        {scaleFactor}%
      </div>
      <div
        onClick={() => setScaleFactor((prev) => (prev >= 20 ? prev - 10 : 10))}
        className="w-full h-full p-2 hover:bg-blue-100 hover:cursor-pointer rounded-r-lg flex justify-center items-center"
      >
        <Minus />
      </div>
    </div>
  );
}

export default Zoom;
