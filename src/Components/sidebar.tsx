import Brightness from "./tools_com/brightness";
import Zoom from "./tools_com/zoom";

export default function Sidebar({
  onBrightnessChange,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: {
  onBrightnessChange: (value: number) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}) {
  return (
    <div className="flex flex-col rounded-2xl border-2 border-white text-gray-500 p-4 w-72">
      <div className="flex-1 flex flex-col justify-start gap-6">
        <Brightness onChange={onBrightnessChange} />
        <Zoom
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onResetZoom={onResetZoom}
        />
      </div>

      <button className="mt-6 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-xl text-white">
        Download
      </button>
    </div>
  );
}
