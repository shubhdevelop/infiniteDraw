import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  InitialState,
  decreaseScale,
  increaseScale,
  resetScale,
} from "../features/canvasSlice";

function Zoom() {
  const dispatch = useDispatch();
  const scale = useSelector((state: InitialState) => state.canvasState.scale);

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
        onClick={() => dispatch(increaseScale())}
      >
        <Plus />
      </div>
      <div
        className="w-full h-full p-2 hover:cursor-pointer rounded-lg flex justify-center items-center select-none 
      "
        onClick={() => {
          dispatch(resetScale());
        }}
      >
        {scale}%
      </div>
      <div
        onClick={() => dispatch(decreaseScale())}
        className="w-full h-full p-2 hover:bg-blue-100 hover:cursor-pointer rounded-r-lg flex justify-center items-center"
      >
        <Minus />
      </div>
    </div>
  );
}

export default Zoom;
