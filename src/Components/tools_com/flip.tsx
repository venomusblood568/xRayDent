import { Flipright } from "../../assets/icons/flipright";
import { FlipUp } from "../../assets/icons/flipup";

export default function Flip({
  onFlipHorizontal,
  onFlipVertical,
}: {
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
}) {
  return (
    <>
      <div className="relative flex items-center justify-between w-full h-12 px-4 rounded-xl border border-gray-700 text-sm text-white select-none">
        <span className="font-medium text-gray-300">Flip</span>
        <div className="flex gap-2 items-center">
          <button
            onClick={onFlipVertical}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-600 hover:border-white hover:bg-gray-800 transition-all duration-150"
          >
            <FlipUp />
          </button>

          <button
            onClick={onFlipHorizontal}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-600 hover:border-white hover:bg-gray-800 transition-all duration-150"
          >
            <Flipright />
          </button>
        </div>
      </div>
    </>
  );
}
