import Brightness from "./tools_com/brightness";

export default function Sidebar(){
    return (
      <>
        <div className="w-64 flex flex-col justify-between rounded-2xl border-2 border-white  text-gray-500">
          <div className="flex-1 flex justify-center m-2">
            <Brightness/>
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