import { MinusIcon } from "../../assets/icons/mius";
import { PlusIcon } from "../../assets/icons/plus";

export default function Invert({
  onInvertToggle,
}: {
  onInvertToggle: () => void;
}) {
  return (
    <div className="relative flex items-center justify-between w-full h-12 px-4 rounded-xl border border-gray-700 text-sm text-white select-none">
      <span className="font-medium text-gray-300">Invert</span>
      <div className="flex gap-2 items-center">
        <button
          onClick={onInvertToggle}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-600 hover:border-white hover:bg-gray-800 transition-all duration-150"
        >
          <MinusIcon />
        </button>
        <button
          onClick={onInvertToggle}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-600 hover:border-white hover:bg-gray-800 transition-all duration-150"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
  