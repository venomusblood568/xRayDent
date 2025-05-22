import { Pen } from "../../assets/icons/pen";

export default function Measurement() {
  return (
    <>
      <div className="relative flex items-center justify-between w-full h-12 px-4 rounded-xl border border-gray-700 text-sm text-white select-none ">
        <span className="font-medium text-gray-300">Measurement</span>
        <div>
          <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-600 hover:border-white hover:bg-gray-800 transition-all duration-150">
            <Pen />
          </button>
        </div>
      </div>
    </>
  );
}
