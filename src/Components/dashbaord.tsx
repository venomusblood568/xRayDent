import Header from "./header";
import ImageView from "./imageview";
import Sidebar from "./sidebar";

export default function Dashboard() {
  return (
    <>
      <div className="bg-black min-h-screen flex flex-col">
        <Header />

        <div className="bg-black flex flex-1 p-4 gap-4">
          <ImageView/>
          <Sidebar/>
        </div>
      </div>
    </>
  );
}
