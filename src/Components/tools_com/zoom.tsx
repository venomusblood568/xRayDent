import { DefaultIcon } from "../../assets/icons/default";
import { MinusIcon } from "../../assets/icons/mius";
import { PlusIcon } from "../../assets/icons/plus";

export default function Zoom({
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}) {
  return (
    <div className="relative flex items-center justify-between w-full h-12 px-4 rounded-xl border border-gray-700 text-sm text-white select-none ">
      <span className="font-medium text-gray-300">Zoom</span>

      <div className="flex gap-2 items-center">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-600 hover:border-white hover:bg-gray-800 transition-all duration-150"
          aria-label="Zoom out"
          type="button"
          onClick={onZoomOut}
        >
          <MinusIcon  />
        </button>

        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-600 hover:border-white hover:bg-gray-800 transition-all duration-150"
          aria-label="Reset zoom"
          type="button"
          onClick={onResetZoom}
        >
          <DefaultIcon />
        </button>

        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-600 hover:border-white hover:bg-gray-800 transition-all duration-150"
          aria-label="Zoom in"
          type="button"
          onClick={onZoomIn}
        >
          <PlusIcon/>
        </button>
      </div>
    </div>
  );
}
