import { DefaultIcon } from "../../assets/icons/default";
import { MinusIcon } from "../../assets/icons/mius";
import { PlusIcon } from "../../assets/icons/plus";

export default function Zoom() {
  return (
    <div className="relative flex items-center justify-between w-64 h-10 px-4 rounded-xl border border-gray-700 text-sm text-white select-none">
      {/* Use flex gap instead of borders between icons */}
      <div className="flex gap-9 w-full justify-center">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-600 hover:border-gray-400 cursor-pointer transition"
          aria-label="Zoom out"
          type="button"
        >
          <MinusIcon />
        </button>

        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-600 hover:border-gray-400 cursor-pointer transition"
          aria-label="Reset zoom"
          type="button"
        >
          <DefaultIcon />
        </button>

        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-600 hover:border-gray-400 cursor-pointer transition"
          aria-label="Zoom in"
          type="button"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
