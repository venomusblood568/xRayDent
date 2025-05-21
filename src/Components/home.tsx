import Footer from "./footer";
import Header from "./header";
import ImageView from "./imageview";
import Sidebar from "./sidebar";
import { useState } from "react";

export default function Home() {
  const [brightness, setBrightness] = useState(0); // -1 to 1 range

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <div className="bg-black flex flex-1 p-4 gap-4">
        <ImageView brightness={brightness} />
        <Sidebar onBrightnessChange={setBrightness} />
      </div>
      <Footer />
    </div>
  );
}
