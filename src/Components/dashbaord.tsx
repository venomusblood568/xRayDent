import Header from "./header";
import Sidebar from "./sidebar";

export default function Dashboard() {
  return (
    <>
      <div className="bg-black min-h-screen flex flex-col">
        <Header />

        <div className="bg-black flex flex-1 p-4 gap-4">
          <div className="flex-1 flex items-center justify-center rounded-xl border-2 border-white  text-gray-300 text-lg">
            <p>Image will load here</p>
          </div>
          <Sidebar/>
        </div>
      </div>
    </>
  );
}
