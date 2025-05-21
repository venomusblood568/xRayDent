import Footer from "./footer";
import Header from "./header";
import ImageView from "./imageview";
import Sidebar from "./sidebar";
import { useState } from "react";

export default function Home() {
  const [brightness, setBrightness] = useState(0); // -1 to 1 range
  const [zoom, setZoom] = useState(1); // default zoom scale = 1
  const [rotation, setRotation] = useState(0);
  // Handlers for zoom buttons
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 4)); // max zoom 4x
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.1)); // min zoom 0.1x
  };

  const handleResetZoom = () => {
    setZoom(1); // reset to 100%
  };
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <div className="bg-black flex flex-1 p-3 gap-4">
        <ImageView brightness={brightness} zoom={zoom} rotation={rotation} />
        <Sidebar
          onBrightnessChange={setBrightness}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          onRotate={setRotation} zoom={0}        
          />
      </div>
      <Footer />
    </div>
  );
}
