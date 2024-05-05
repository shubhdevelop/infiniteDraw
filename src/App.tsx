import Canvas from "./Component/Canvas";
import "./App.css";
import "./Icon.css";
import Toolbar from "./Component/Toolbar";
import Zoom from "./Component/Zoom";
import UndoRedo from "./Component/UndoRedo";
import OptionMenu from "./Component/OptionMenu";

function App() {
  return (
    <div className="w-full h-full overflow-hidden ">
      <OptionMenu />
      <Toolbar />
      <Canvas></Canvas>
      <Zoom />
      <UndoRedo />
    </div>
  );
}

export default App;
