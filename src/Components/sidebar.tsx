import Brightness from "./tools_com/brightness";
import Zoom from "./tools_com/zoom";

export default function Sidebar({
  onBrightnessChange,
}: {
  onBrightnessChange: (value: number) => void;
}) {
  return (
    <>
      <div className=" flex flex-col rounded-2xl border-2 border-white  text-gray-500">
        <div className="flex-1 flex flex-col justify-start m-2 gap-3">
          <Brightness onChange={onBrightnessChange} />
          <Zoom />
        </div>

        <div className="p-2">
          <button className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-xl text-white">
            Download
          </button>
        </div>
      </div>
    </>
  );
}